import { Request, Response } from 'express';
import { getHelloWorldMessage } from '../services/services';

export const helloWorld = (req: Request, res: Response) => {
    const message = getHelloWorldMessage();
    res.json({ message });
};