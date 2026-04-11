"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
// signup
exports.signupInput = zod_1.default.object({
    email: zod_1.default.email(),
    username: zod_1.default.string().optional(),
    password: zod_1.default.string().min(6)
});
//signin 
exports.signinInput = zod_1.default.object({
    email: zod_1.default.email(),
    password: zod_1.default.string().min(6)
});
// blog zod validation 
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});
