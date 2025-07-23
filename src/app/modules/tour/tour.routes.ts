import { Router } from "express";
import { TourController } from "./tour.controller";
import validateRequest from "../../middleware/validateRequest";
import { createTourTypesZodSchema, createTourZodSchema, updateTourZodSchema } from "./tour.validation";
import checkAuth from "../../middleware/check.auth";
import { Role } from "../user/user.interface";

export const TourRoutes = Router()

TourRoutes.post("/create-tour-type",validateRequest(createTourTypesZodSchema) , checkAuth(...Object.values(Role)), TourController.createTourTypes)
TourRoutes.get("/tour-types", TourController.getAllTourTypes)
TourRoutes.get("/tour-types/:id", TourController.getSingleTourTypes)
TourRoutes.post("/create", validateRequest(createTourZodSchema), checkAuth(...Object.values(Role)), TourController.createTour)
TourRoutes.get("/tour",TourController.getAllTours)
TourRoutes.patch("/tour/:id",validateRequest(updateTourZodSchema), checkAuth(...Object.values(Role)), TourController.updateTour)
TourRoutes.delete("/tour/:id", checkAuth("ADMIN", "SUPER_ADMIN", "GUIDE"), TourController.deleteTour)