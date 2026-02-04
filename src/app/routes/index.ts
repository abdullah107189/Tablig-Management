import express from "express";
import { UserRouter } from "../modules/user/user.route.js";
const router = express.Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
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
