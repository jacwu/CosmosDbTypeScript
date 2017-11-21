import * as express from "express";
import * as bodyParser from "body-parser";
import * as itemsController from './controllers/itemsController';

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', itemsController.getItems);
app.get('/items/:id', itemsController.getItem);
app.post('/items', itemsController.addItem);
app.put('/items/:id', itemsController.updateItem);
app.delete('/items/:id', itemsController.deleteItem);

const port = process.env.port || 3000;
app.listen(app.get("port"),() => {
    console.log('Server Started');
} );