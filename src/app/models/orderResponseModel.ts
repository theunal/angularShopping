import { OrderModel } from "./order"
import { PaymentModel } from "./payment"


    export class OrderResponseModel {
        orders : OrderModel[]
        payment : PaymentModel
        total : number
    }