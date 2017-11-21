import {DocumentClient, CollectionMeta, DocumentQuery, RetrievedDocument} from "documentdb";
import {cosmosDbConfig} from './dbConfig';

export type DocumentsCallback = (err: number, docs: RetrievedDocument[])=> void;
export type DocumentCallback = (err: number, doc: RetrievedDocument)=> void;

class DbRepository{
    docClient: DocumentClient;
    collection: CollectionMeta;
    constructor(docClient: DocumentClient){
        this.docClient = docClient;
    }

    init(){
        let dbQuery: any = {
            query: 'SELECT * FROM root r WHERE r.id= @id',
            parameters: [{
                name: '@id',
                value: 'ToDoList'
            }]
        };

        this.docClient.queryDatabases(dbQuery).toArray((err, dbs) => {
            let db = dbs[0];
            const colQuery: DocumentQuery = {
                query: 'SELECT * FROM root r WHERE r.id=@id',
                parameters: [{
                    name: '@id',
                    value: 'Items'
                }]
            }; 

            this.docClient.queryCollections(db._self, colQuery).toArray((err, collections) => {
                this.collection = collections[0];
                console.log('initialization finished');
            });
        });
    }

    getItems(callback:DocumentsCallback){
        let querySpec: DocumentQuery  = {
            query: 'SELECT * FROM root',
            parameters: []
        };

        this.docClient.queryDocuments(this.collection._self, querySpec).toArray((err, results) => {
            if(null == err){
                callback(0, results);
            }else{
                callback(err.code, null);
            }
        });
    }

    getItem(id: string, callback: DocumentCallback){
        let querySpec: DocumentQuery = {
            query: 'SELECT * FROM root r WHERE r.id = @id',
            parameters: [{
                name: '@id',
                value: id
            }]
        };

        this.docClient.queryDocuments(this.collection._self, querySpec).toArray((err, results) => {
            if (null == err && results.length > 0) {
                callback(0, results[0]);
            } else {
                callback(404, null);
            }
        });
    }

    updateItem(id: string, target: any, callback: DocumentCallback){
        this.getItem(id, (err, doc) => {
            if(0 == err){
                doc.title = target.title;
                doc.description = target.description;
                this.docClient.replaceDocument(doc._self, doc, (err, result) => {
                    callback(0, result);
                });
            }else{
                callback(404, null);
            }
        });
    }

    deleteItem(id: string, callback: DocumentCallback){
        this.getItem(id, (err, doc) => {
            if(0 == err){
                this.docClient.deleteDocument(doc._self, (err) => {
                    callback(0, null);
                });
            }else{
                callback(404, null);
            }
        });
    }

    addItem(item: any, callback: DocumentCallback){
        this.docClient.createDocument(this.collection._self, item, (err, result) => {
            if(null == err){
                callback(0, result);
            }else{
                callback(err.code, null);
            }
        });
    }
}

let docDbClient = new DocumentClient(cosmosDbConfig.host, {
    masterKey: cosmosDbConfig.authKey
});

let cosmosDb = new DbRepository(docDbClient);
cosmosDb.init();

export {cosmosDb};