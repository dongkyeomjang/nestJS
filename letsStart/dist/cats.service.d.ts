import { Request, Response } from "express";
export declare const readAllCats: (res: Response) => void;
export declare const readCat: (req: Request, res: Response) => void;
export declare const CreateCat: (req: Request, res: Response) => void;
export declare const updateCatAll: (req: Request, res: Response) => void;
export declare const updateCatPartial: (req: Request, res: Response) => void;
export declare const deleteCat: (req: Request, res: Response) => void;
