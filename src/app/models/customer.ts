
import { BasketModel } from './basket';
import { PaymentModel } from './payment';

    export class CustomerModel {
        payment : PaymentModel
        baskets : BasketModel[]
    }