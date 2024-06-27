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
        let { image, pageSize, pageNumber } = req.body;
        console.log(req.body);
        if (image) {
            let resData = yield isUrl({ url: image, pageSize, pageNumber });
            return res.status(200).json(resData);
        }
        let file = req.file;
        if (file) {
            let resData = yield isFile({ file, pageSize, pageNumber });
            return res.status(200).json(resData);
        }
        return res.status(400).json({ error: 'Invalid Request' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}));
app.get('/pet', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filter = queryString(req.query);
    console.log(filter);
    let url = `https://encontreja-ai.vercel.app/api/pet?${filter}`;
    console.log(url);
    let r = yield fetch(url);
    let data = yield r.json();
    return res.status(200).json(data);
    // let resData = await getPets(filter, pageSize, page);
    // return res.status(200).json(resData);
}));
function isUrl(_a) {
    return __awaiter(this, arguments, void 0, function* ({ url, pageSize, pageNumber }) {
        console.log('url received pg number: ', pageNumber);
        let res = yield (0, routes_1.mainReq)(url, pageSize, pageNumber);
        return res;
    });
}
function isFile(_a) {
    return __awaiter(this, arguments, void 0, function* ({ file, pageSize, pageNumber }) {
        console.log('file received ', file);
        let imgUrl = yield (0, routes_1.submitImageFile)(file);
        console.log(imgUrl);
        let res = yield (0, routes_1.mainReq)(imgUrl, pageSize, pageNumber);
        return res;
    });
}
app.listen(3000, () => console.log('listening on http://localhost:3000'));
const queryString = (params) => Object.entries(params)
    .map(([key, value]) => {
    if (!value)
        return undefined;
    if (Array.isArray(value)) {
        return `${key}=${value.join(',')}`;
    }
    return `${key}=${value}`;
})
    .join('&');
