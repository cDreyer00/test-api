
import express, { Request, Response } from 'express'
import uploads from './multer_config';
import { mainReq, submitImageFile } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', uploads.single('image'), async (req, res) => {
   console.log("sending req");
   try {
      let { image, pageSize, pageNumber } = req.body;
      console.log(req.body);

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
   console.log(filter);
   let url = `https://encontreja-ai.vercel.app/api/pet?${filter}`;
   console.log(url);
   let r = await fetch(url);
   let data = await r.json();
   return res.status(200).json(data);
   // let resData = await getPets(filter, pageSize, page);
   // return res.status(200).json(resData);
});


async function isUrl({ url, pageSize, pageNumber }: any) {
   console.log('url received pg number: ', pageNumber);
   let res = await mainReq(url, pageSize, pageNumber);
   return res;
}

async function isFile({ file, pageSize, pageNumber }: any) {
   console.log('file received ', file);
   let imgUrl = await submitImageFile(file);
   console.log(imgUrl);
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