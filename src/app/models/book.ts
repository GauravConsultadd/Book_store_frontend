import { Genre } from "./Genre";
import { User } from "./user";

export interface Book {
    id: number
    title: string,
    cover_image_url: File,
    author: string,
    description: string,
    genre: string,
    price: number,
    published_by: User,
    is_available: boolean
}

export interface updateBookModel {
    id:number,
    title: string,
    cover_image_url: File,
    author: string,
    description: string,
    genre: string,
    price: number,
}