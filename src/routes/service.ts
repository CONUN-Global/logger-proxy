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
    res.json({"Status": res.status, "Saved": result})

}



function insertDataToES( data: any) {



		const jsonData = JSON.stringify(data);

		const options = {
			host: 'logger.conun.io',
			// port: explorerconfig.elasticsearch.port,
			path: '/?pipeline=auto_now_add',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': jsonData.length
			}
		};
		const htr = http.request(options, res => {
			res.setEncoding('utf8');
			res.on('data', chunk => {
				console.log('saving data to ElasticSearch ' + chunk);
			});
		});
		htr.write(jsonData);
		htr.end();
	}