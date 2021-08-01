import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler,NotFoundError } from '@ig26tickets/common';
import cookieSession from 'cookie-session';
import {routes} from './api/index';
const app = express();

app.set('trust proxy',true); //make sure express aware that is behind the proxy of ingress nginx
//and make sure that still trust traffic being secure
app.use(json());
app.use(cookieSession({
    signed:false,//disable encryption
    secure:process.env.NODE_ENV !== 'test' //means that cookies only going to be shared 
    //when someone is making a request to server over https connection
}));

app.use('/api',routes);

app.all('*',async (req,res)=>{
     throw new NotFoundError();
})
//we want to make sure we always have consist response
app.use(errorHandler);

export { app };