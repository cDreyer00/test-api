import { Multer } from "multer";

let folderId = '1R3jyhPo18MrfG-G5xChAAdkmamRxRyad'

export async function submitImageFile(file: Express.Multer.File) {
   const form = new FormData();
   const blob = new Blob([file.buffer], { type: file.mimetype });
   form.append('image', blob, file.originalname);
   form.append('folderId', folderId);

   let url = 'https://encontreja-ai.vercel.app/api/image'

   let res = await fetch(url, {
      method: 'POST',
      body: form
   })

   let data = await res.json();
   return data.imgUrl;
}

export async function mainReq(imgUrl: string, pageSize: number, page: number) {
   let url = `https://encontreja-ai.vercel.app/api/main?img=${imgUrl}&pageSize=${pageSize}&pageNumber=${page}`
   console.log(url);
   let res = await fetch(url);
   let data = await res.json();
   
   return data;
}

export async function getPets(filter:any, pageSize: number, page: number) {
   let url = `https://encontreja-ai.vercel.app/api/pets?filter=${filter}&pageSize=${pageSize}&pageNumber=${page}`
   
   let res = await fetch(url);
   let data = await res.json();
   
   return data;
}