import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import AuthRoute from "../modules/auth/auth.routes";
import { TourRoutes } from "../modules/tour/tour.routes";
import { DivisionRoutes } from "../modules/division/division.routes";
import { BookingRoutes } from "../modules/booking/booking.routes";
import { PaymentRoutes } from "../modules/payment/payment.routes";

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
    path : "/division",
    route : DivisionRoutes
  },
  {
    path : "/tour",
    route: TourRoutes
    
  },
  {
    path : "/booking",
    route : BookingRoutes
  },
  {
    path : "/payment",
    route: PaymentRoutes
  }
];

moduleRoutes.forEach((route) => {
  customRouter.use(route.path, route.route);
});
