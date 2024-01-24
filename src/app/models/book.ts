import { Genre } from "./Genre";
import { User } from "./user";

export interface Book {
    id: number
    title: string,
    cover_image_url: string,
    author: string,
    description: string,
    genre: Genre,
    price: number,
    published_by: User,
    is_availabe: boolean
}