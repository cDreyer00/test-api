import multer from "multer";

// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: function(req, file, cb) {
//     cb(null, `${file.fieldname}-${Date.now()}${file.originalname}`);
//   }
// });

const uploads = multer({ storage: multer.memoryStorage() });
// var uploads  = multer({ dest: 'uploads/' })

export default uploads;