import { Router } from "express";
import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import checkAuth from "../../middleware/check.auth";
import validateRequest from "../../middleware/validateRequest";
import { createDivisionSchema, updateDivisionSchema } from "./division.validation";
import { multerUpload } from "../../config/multer.config";


export const DivisionRoutes = Router()

DivisionRoutes.post("/create",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(createDivisionSchema), multerUpload.single("file"),DivisionController.createDivision);
DivisionRoutes.get("/", DivisionController.getAllDivisions);
DivisionRoutes.get("/:slug", DivisionController.getSingleDivision)
DivisionRoutes.patch("/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN),validateRequest(updateDivisionSchema),DivisionController.updateDivision);
DivisionRoutes.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);
