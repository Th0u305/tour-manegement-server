import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

export const customRouter = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  customRouter.use(route.path, route.route);
});
