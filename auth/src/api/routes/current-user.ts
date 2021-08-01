import express from "express";
import { currentUser } from '@ig26tickets/common';
const router = express.Router();

router.get("/currentuser", currentUser,(req, res) => {
  res.send({currentUser:req.currentUser || null });//current user is actual JSON payload

});

export { router as currentUserRouter };
