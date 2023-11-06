"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const userSvc = (0, express_http_proxy_1.default)('http://localhost:4001');
const processSvc = (0, express_http_proxy_1.default)('http://localhost:4002');
const offerSvc = (0, express_http_proxy_1.default)('http://localhost:4003');
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.use('/api/user', userSvc);
app.use('/api/process', processSvc);
app.use('/api/offer', offerSvc);
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
