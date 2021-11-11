import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';

const app = express();
const { BAD_REQUEST } = StatusCodes;



/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// }

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
const apirouter = express.Router();
app.use('/api', BaseRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    	// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader(
			'Access-Control-Allow-Methods',
			'GET, POST, OPTIONS, PUT, PATCH, DELETE'
		);

		// Request headers you wish to allow
		res.setHeader(
			'Access-Control-Allow-Headers',
			'X-Requested-With,content-type'
		);

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', 'true');
		next();
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

// Export express instance
export default app;
