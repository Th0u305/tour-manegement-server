import { model, Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  tour: { type: Schema.Types.ObjectId, ref: "tour", required: true },
  guestCount: { type: Number, required: true },
  phone: { type: String },
  address: { type: String },
  status: { type: String },
  payment: { type: Schema.Types.ObjectId, ref: "payment" },
});

export const Booking = model<IBooking>("booking", bookingSchema);
