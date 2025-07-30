import { Types } from "mongoose";

export enum PAYMENT_STATUS{
    PAID = "PAID",
    UNPAID = "UNPAID",
    FAILED = "FAILED",
    REFUNDED = "REFUNDED",
    CANCELLED = "CANCELLED"
}

export interface IPayment{
    booking: Types.ObjectId
    transactionId : string
    status : PAYMENT_STATUS
    amount : number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    paymentGateWayData?: any
    invoiceUrl? : string
}