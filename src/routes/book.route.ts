import {Router} from "express";

const bookRouter:Router = Router();

bookRouter.get("/all", /*getAllBooks*/); // Get All Books
bookRouter.post("/save", /*authorizeRole('Admin'), saveBook*/); // Save Book
bookRouter.get("/overdue", /*getOverdueBooks*/); // Get Overdue Books
bookRouter.get("/category/:category", /*getBooksByCategory*/); // Get Books by Category
bookRouter.get("/:id", /*getBook*/); // Get Specific Book
bookRouter.put("/update/:id", /*authorizeRole('Admin'), updateBook*/); // Update Book
bookRouter.delete("/delete/:id",/* authorizeRole('Admin'), deleteBook*/); // Delete Book

export default bookRouter
