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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.submitImageFile = submitImageFile;
exports.mainReq = mainReq;
exports.getPets = getPets;
exports.routes = [
    '/home',
    '/about',
    '/contact',
];
let folderId = '1R3jyhPo18MrfG-G5xChAAdkmamRxRyad';
function submitImageFile(file) {
    return __awaiter(this, void 0, void 0, function* () {
        const form = new FormData();
        const blob = new Blob([file.buffer], { type: file.mimetype });
        form.append('image', blob, file.originalname);
        form.append('folderId', folderId);
        let url = 'https://encontreja-ai.vercel.app/api/image';
        let res = yield fetch(url, {
            method: 'POST',
            body: form
        });
        let data = yield res.json();
        return data.imgUrl;
    });
}
function mainReq(imgUrl, pageSize, page) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://encontreja-ai.vercel.app/api/main?img=${imgUrl}&pageSize=${pageSize}&pageNumber=${page}`;
        console.log(url);
        let res = yield fetch(url);
        let data = yield res.json();
        return data;
    });
}
function getPets(filter, pageSize, page) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = `https://encontreja-ai.vercel.app/api/pets?filter=${filter}&pageSize=${pageSize}&pageNumber=${page}`;
        let res = yield fetch(url);
        let data = yield res.json();
        return data;
    });
}
