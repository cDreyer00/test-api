"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_config_1 = __importDefault(require("./multer_config"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.post('/submit', multer_config_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("sending req");
    try {
        let { image, pageSize, page } = req.body;
        console.log(req.body);
        if (image) {
            let resData = yield isUrl({ url: image, pageSize, page });
            return res.status(200).json(resData);
        }
        let file = req.file;
        if (file) {
            let resData = yield isFile({ file, pageSize, page });
            return res.status(200).json(resData);
        }
        return res.status(400).json({ error: 'Invalid Request' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
function isUrl(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url, pageSize, page }) {
        let res = yield (0, routes_1.mainReq)(url, pageSize, page);
        return res;
    });
}
function isFile(_a) {
    return __awaiter(this, arguments, void 0, function* ({ file, pageSize, page }) {
        console.log('file received ', file);
        let imgUrl = yield (0, routes_1.submitImageFile)(file);
        console.log(imgUrl);
        let res = yield (0, routes_1.mainReq)(imgUrl, pageSize, page);
        return res;
    });
}
app.listen(3000, () => console.log('listening on port 3000!'));
