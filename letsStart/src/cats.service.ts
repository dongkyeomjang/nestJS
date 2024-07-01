import {Request, Response} from "express";
import {Cat} from "./cats.model";

export const readAllCats = (res:Response) => {
    try{
        const cats = Cat;
        res.status(200).send({
            success : true,
            data : {
                cats,
            }
        });
    } catch (error) {
        res.status(400).send({
            success : false,
            error : error.message,
        });
    }
}

export const readCat = (req:Request,res:Response) => {
    try {
        const catId = req.params.id;
        const cat = Cat.find((cat) => cat.id === catId);
        if (!cat) {
            throw new Error("Cat not found");
        }
        res.status(200).send({
            success: true,
            data: {
                cat,
            }
        });
    } catch (error) {
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
}

export const CreateCat = (req:Request,res:Response) => {
    try{
        const data = req.body;
        console.log(data);
        Cat.push(data);
        res.status(200).send({
            success: true,
            data: {}
        });
    } catch(error) {
        res.status(400).send({
            success: false,
            error : error.message,
        });
    }
}

export const updateCatAll = (req:Request,res:Response) => {
    try{
        let result;
        const body = req.body;
        const catId = req.params.id;
        Cat.forEach((cat) => {
            if(cat.id === catId) {
                cat = body;
                result = cat;
            }
        });
        if(!result) {
            throw new Error("Cat not found");
        }

        res.status(200).send({
            success: true,
            data: {
                result,
            }
        });

    } catch(error){
        res.status(404).send({
            success: false,
            error: error.message,
        });
    }
}

export const updateCatPartial = (req:Request,res:Response) => {
    try{
        let result;
        const catId = req.params.id;
        const body = req.body;
        Cat.forEach((cat) => {
            if(cat.id === catId) {
                cat = {...cat, ...body};
                result = cat;
            }
        })
        if(!result) {
            throw new Error('Cat not found');
        }
        res.status(200).send({
            success: true,
            data: { result }
        });
    } catch(error) {
        res.status(404).send({
            success: false,
            error : error.message,
        });
    }
}

export const deleteCat = (req:Request,res:Response) => {
    try{
        const catId = req.params.id;
        const newCats = Cat.filter((cat) => cat.id !== catId);
        if(newCats.length === Cat.length) {
            throw new Error('Cat not found');
        }
        res.status(200).send({
            success: true,
            data: newCats,
        });
    } catch(error) {
        res.status(404).send({
            success: false,
            error : error.message,
        });
    }
}