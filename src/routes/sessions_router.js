//Third party imports
import { Router } from "express";
import passport from 'passport';

const router = Router();

//return current user
router.get('/current', passport.authenticate('current'), (req, res)=>res.send({
    "dataCurrentUser": req.user,
    "jwt token": req.cookies.token
   }));

export default router;
