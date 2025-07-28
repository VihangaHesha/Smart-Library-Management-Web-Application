import { FilterQuery } from "mongoose";
import Book from "../model/book.model";
import {BookDto} from "../dto/book.dto"


export const getALlBooks = async (filter: FilterQuery<typeof Book> = {}) => {
    return Book.find(filter);
}

export const getBookById = async (id: string) => {
    return Book.findById(id);
}

export const createBook = async (data: any) => {
    const book = new Book(data);
    return book.save();
}

export const updateBook = async (id: string, data: any) => {
    return Book.findByIdAndUpdate(id, data, { new: true });
}

export const deleteBook = async (id: string) => {
    // Optionally check if book is checked out before deleting
    return Book.findByIdAndDelete(id);
}

export const getOverdueBooks = async () => {
    return Book.find({ status: "Overdue" });
}

export const getBooksByCategory = async (category: string) => {
    return Book.find({ category });
}

export const updateBookStatus = async (id: string, status: string) => {
    return Book.findByIdAndUpdate(id, { status }, { new: true });
}

export const validateBooks =  (book : BookDto) => {
    return !(!book.title || !book.author || !book.category || !book.quantity || !book.status);

}