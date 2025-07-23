import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import AuthRoute from "../modules/auth/auth.routes";
import { TourRoutes } from "../modules/tour/tour.routes";

export const customRouter = Router();
const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path : "/auth",
    route : AuthRoute
  },
  {
    path : "/tour",
    route: TourRoutes
    
  }
];

moduleRoutes.forEach((route) => {
  customRouter.use(route.path, route.route);
});
