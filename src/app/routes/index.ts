import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route.js";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },

  // {
  //     path:'/another-path',
  //     route: another route
  // }
];
moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
