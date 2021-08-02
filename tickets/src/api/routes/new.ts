import express ,{ Request, Response } from 'express';
import { requireAuth } from '@ig26tickets/common';
const router = express.Router();

router.post('/',requireAuth,( req:Request, res:Response )=>{
    res.sendStatus(200);
})
export {router as createTicketRouter}