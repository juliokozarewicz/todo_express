import { Request, Response } from 'express';
import { ServicesDefault } from '../services/services';

export const helloWorld = (req: Request, res: Response) => {
    const testValue = req.query.message as string || 'Hello World!!!'; // http://127.0.0.1:PORT/helloworld/helloworld?message=xxxxx
    const message = ServicesDefault.getHelloWorldMessage(testValue);
    res.json({message});
};