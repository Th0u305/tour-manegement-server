import AppError from "../../errorHelper/AppError";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import httpStatus from "http-status-codes"

// tour types
const createTourTypes = async (data : ITourType) =>{

    const result = TourType.create(data)
    return result
}

const getAllTourTypes = async()=>{

    const types = await TourType.find({})
    const typesTotal = await TourType.countDocuments()

    return {
        data : types,
        meta : {
            total : typesTotal
        }
    }
}

const getSingleTourTypes = async (id : string)=>{

    const tourTypes = await TourType.findById(id)
    return tourTypes
}


// Tour
const createTour = async (data: ITour)=>{
    const result = {
        ...data,
        slug: data.title.toLocaleLowerCase().split(" ").join("-")
    }
    const tour = await Tour.create(result)
    return tour    
}

const getAllTour = async()=>{

    const allTour = await Tour.find({})
    const totalTour = await Tour.countDocuments()

    return{
        data : allTour,
        meta : {
            total : totalTour
        }
    }
}

const getSingleTour = async (id : string)=>{

    const singleTour = await Tour.findById(id)
    return singleTour
}

const updateTour = async(id:string, data: Partial<ITour>)=>{

    if (!id) {
        throw new AppError(httpStatus.NOT_FOUND,"This tour doesn't exists")
    }
    const result = await Tour.findByIdAndUpdate(id,data, {new : true, runValidators: true})

    return result
}

const deleteTour = async(id:string)=>{
    const findTour = Tour.findById(id)

    if (!findTour) {
        throw new AppError(httpStatus.NOT_FOUND, "This tour doesn't exists")
    }

    const result = await Tour.findByIdAndDelete(id, {new : true, runValidators: true})

    return result
}

export const TourService = {
    createTour,
    getAllTour,
    getSingleTour,
    createTourTypes,
    getSingleTourTypes,
    getAllTourTypes,
    updateTour,
    deleteTour
}