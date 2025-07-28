import { Router } from "express";
/*import { getAllTransactions, saveTransaction, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transaction.controller";
import { authorizeRole } from "../middleware/auth.middleware";*/

const transactionRouter: Router = Router();

// Handle Requests
transactionRouter.get("/all", /*getAllTransactions*/); // Get All Transactions
transactionRouter.post("/save", /*authorizeRole('Librarian'), saveTransaction*/); // Save Transaction (Borrow/Return)
transactionRouter.get("/:id", /*getTransaction*/); // Get Specific Transaction
transactionRouter.put("/update/:id", /*authorizeRole('Librarian'), updateTransaction*/); // Update Transaction
transactionRouter.delete("/delete/:id", /*authorizeRole('Admin'), deleteTransaction*/); // Delete Transaction

export default transactionRouter;