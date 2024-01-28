import { Book } from "./book"
import { User } from "./user"

export interface Order {
    id: number
    books: Book[]
    order_date: Date
    total_price: number
    is_paid: boolean
}

export interface CheckoutOrder {
    user : User,
    books: Book[],
    total_price: number
    is_paid: boolean
}

export interface AdminOrderModel {
    id: number
    books: Book[]
    order_date: Date
    total_price: number
    is_paid: boolean
    user: User
} 

export interface createOrderModel {
    user: number,
    books: number[],
    total_price: number
    is_paid: boolean
}