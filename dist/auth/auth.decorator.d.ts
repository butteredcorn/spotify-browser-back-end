import { Request } from 'express';
interface User {
    token?: string;
}
export interface UserRequest extends Request {
    user: User;
}
export declare const User: (...dataOrPipes: any[]) => ParameterDecorator;
export {};
