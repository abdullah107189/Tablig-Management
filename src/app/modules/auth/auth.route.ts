
import { Router } from "express";
import { AuthControllers } from "./auth.controller.js";

const router = Router();

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);
// router.post("/refresh", AuthControllers.refresh);
// router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
