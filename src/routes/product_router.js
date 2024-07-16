//Third party imports
import { Router } from "express";
import passport from 'passport';

//Local imports
import { productValidator } from "../middlewares/product_validators.js";
import * as controller from "../controllers/product_controller.js";

const router = Router();

router.get("/", passport.authenticate('current'), controller.getAllProducts);

router.get("/:pid", passport.authenticate('current'), controller.getProductById);

router.post("/", passport.authenticate('current'), productValidator, controller.createProduct);

router.put("/:pid", passport.authenticate('current'), productValidator, controller.updateProduct);

router.delete("/:pid", passport.authenticate('current'), controller.deleteProduct);

export default router;
