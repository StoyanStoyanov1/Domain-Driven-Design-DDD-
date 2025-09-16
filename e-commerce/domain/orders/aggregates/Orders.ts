import { AggregateRoot } from "../../shared/domain/AggregateRoot";
import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { OrdersId } from "../value-object/OrdersId";

export class Orders extends AggregateRoot {
    private readonly ordersId: OrdersId;
    private readonly orderItems: OrderItem[];
    private readonly order: Order[];
    private readonly createdAt: Date = new Date();

    private updatedAt: Date = new Date()

}
