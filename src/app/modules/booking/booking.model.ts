import { model, Schema } from "mongoose";
import { BOOKING_STATUS, IBooking } from "./booking.interface";


const bookingSchema = new Schema<IBooking>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    tour: {
        type: Schema.Types.ObjectId,
        ref: "tours",
        required: true,
    },
    payment: {
        type: Schema.Types.ObjectId,
        ref: "payments"
    },
    status: {
        type: String,
        enum: Object.values(BOOKING_STATUS),
        default: BOOKING_STATUS.PENDING
    },
    guestCount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey : false
})

export const Booking = model<IBooking>("booking", bookingSchema)