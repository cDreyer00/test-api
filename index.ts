
import express, { Request, Response } from 'express'
import uploads from './multer_config';
import { mainReq, submitImageFile } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', uploads.single('image'), async (req, res) => {
   try {
      let { image, pageSize, pageNumber } = req.body;
      console.log('submit:',
         { image, pageSize, pageNumber });

      if (image) {
         let resData = await isUrl({ url: image, pageSize, pageNumber });
         return res.status(200).json(resData);
      }

      let file = req.file;

      if (file) {
         let resData = await isFile({ file, pageSize, pageNumber });
         return res.status(200).json(resData);
      }

      return res.status(400).json({ error: 'Invalid Request' });

   } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal Server Error' });
   }
})

app.get('/pet', async (req: Request, res: Response) => {
   let filter = queryString(req.query);
   console.log("get pets:", {query: req.query, filter});
   let url = `https://encontreja-ai.vercel.app/api/pet?${filter}`;
   console.log("url: ", url);
   let r = await fetch(url);
   let data = await r.json();
   return res.status(200).json(data);
   // let resData = await getPets(filter, pageSize, page);
   // return res.status(200).json(resData);
});


async function isUrl({ url, pageSize, pageNumber }: any) {
   console.log("As Url - submit Request, params: ", { url, pageSize, pageNumber });
   let res = await mainReq(url, pageSize, pageNumber);
   return res;
}

async function isFile({ file, pageSize, pageNumber }: any) {
   let imgUrl = await submitImageFile(file);
   console.log("As File - submit Request, params: ", { imgUrl, pageSize, pageNumber });
   let res = await mainReq(imgUrl, pageSize, pageNumber);
   return res;
}

app.listen(3000, () => console.log('listening on http://localhost:3000'));

const queryString = (params: Object) => Object.entries(params)
   .map(([key, value]) => {
      if(!value) return undefined;
      if (Array.isArray(value)) {
         return `${key}=${value.join(',')}`
      }
      return `${key}=${value}`;
   })
   .join('&');