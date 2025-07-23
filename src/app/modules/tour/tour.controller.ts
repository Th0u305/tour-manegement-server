import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { TourService } from "./tour.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status-codes"

// Tour types
const createTourTypes = catchAsync(async(req:Request, res:Response)=>{

    const data = await req.body
    const result = await TourService.createTourTypes(data)

    sendResponse(res,{
        statusCode : httpStatus.CREATED,
        success : true,
        message : "Tour types created successfully",
        data : result
    })
})

const getAllTourTypes = catchAsync(async(req:Request, res:Response)=>{

    const result = await TourService.getAllTourTypes()
    
    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "All Tour retrieved",
        data : result.data,
        meta : result.meta
    })
})

const getSingleTourTypes = catchAsync(async(req:Request, res:Response)=>{

    const id = await req.params.id
    const result = await TourService.getSingleTourTypes(id)

    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "Successfully retrieved single tour",
        data : result
    })
})


// Tour
const createTour = catchAsync( async (req: Request , res: Response )=>{

    const data = await req.body

    const result = await TourService.createTour(data)

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success : true,
        message : "Tour created successfully",
        data : result
    })
})

const getAllTours = catchAsync( async( req: Request, res: Response)=>{

    const result = await TourService.getAllTour()
    
    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "All Tour retrieved",
        data : result.data,
        meta : result.meta
    })
})

const getSingleTour = catchAsync(async(req:Request, res:Response)=>{

    const id = await req.params.id
    const result = await TourService.getSingleTour(id)

    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "Successfully retrieved single tour",
        data : result
    })
})

const updateTour = catchAsync(async(req:Request, res:Response)=>{
    const data = await req.body
    const id = await req.params.id
    const result = await TourService.updateTour(id,data)

    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "Tour updated successfully",
        data : result
    })
})

const deleteTour =catchAsync(async(req:Request, res:Response)=>{
    
    const id = await req.params.id
    await TourService.deleteTour(id)

    sendResponse(res,{
        statusCode : httpStatus.OK,
        success : true,
        message : "Tour deleted successfully",
        data : null
    })
})

export const TourController = {
    createTour,
    getAllTours,
    getSingleTour,
    createTourTypes,
    getAllTourTypes,
    getSingleTourTypes,
    updateTour,
    deleteTour
}