import {Request, Response} from "express";
import {cosmosDb} from '../dbRepository';

export let getItems = (req: Request, res: Response) => {
    cosmosDb.getItems((err, results)=>{
        if(err > 0){
            res.sendStatus(err);
        }else{
            res.status(200).json(results);
        }
    });   
};

export let getItem = (req: Request, res: Response) => {
    cosmosDb.getItem(req.params.id, (err, result) => {
        if(err > 0){
            res.sendStatus(err);
        }else{
            res.status(200).json(result);
        }
    });
};

export let addItem = (req: Request, res: Response) => {
    cosmosDb.addItem(req.body, (err, result) => {
        if(err > 0){
            res.sendStatus(err);
        }else{
            res.status(201).json(result);
        }
    });
};

export let updateItem = (req: Request, res: Response) => {
    cosmosDb.updateItem(req.params.id, req.body, (err, result) => {
        if(err > 0){
            res.sendStatus(err);
        }else{
            res.status(200).json(result);
        }
    });
};

export let deleteItem = (req: Request, res: Response) => {
    cosmosDb.deleteItem(req.params.id, (err, result) => {
        if(err > 0){
            res.sendStatus(err);
        }else{
            res.sendStatus(204);
        }
    });
};
