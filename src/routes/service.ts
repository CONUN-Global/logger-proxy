import { Request, Response } from "express";
import http from 'http';
import {Client, ApiResponse, RequestParams} from '@elastic/elasticsearch'






export async function saveLogger(req: Request, res: Response) {
    const data = req.body;

    console.log(data);
    const client = new Client({node: 'http://3.34.176.161:9200'})
    let result = null;
    async function run (): Promise<void> {
        // Let's start by indexing some data
        const doc1: RequestParams.Index = {
          index: 'loggers',
          pipeline: 'auto_now_add',
          body: JSON.stringify(data)
        }
        const data11 = await client.index(doc1)
        console.log(data11)
        result = data11;
    // await insertDataToES(data)
    // console.log(resEs);
    }
   await run()
    res.json({"Status": res.status, "result" : true })

}
