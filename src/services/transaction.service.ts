import Transaction from "../model/transaction.model";
import {TransactionsDto} from "../dto/transactions.dto";


export const getAllTransactions = async (): Promise<TransactionsDto[]> => {
    return Transaction.find();
}

export const saveTransaction = async (transaction: TransactionsDto): Promise<TransactionsDto> => {
    const dataToSave: any = {
        ...transaction,
        returnDate: transaction.returnDate ? new Date(transaction.returnDate) : undefined
    };

    const created = await Transaction.create(dataToSave);
    return created.toObject() as TransactionsDto;
};

export const getTransactionById = async (id: number): Promise<TransactionsDto | null> => {
    return Transaction.findOne({ id });
}

export const updateTransaction = async (id: number, data: TransactionsDto) => {
    const transaction = await Transaction.findOneAndUpdate({ id }, data, { new: true });
    if (!transaction) {
        return null;
    }
    return transaction;
}

export const deleteTransaction = async (id: number) => {
    // Optionally check if transaction is checked out before deleting
    return Transaction.findByIdAndDelete(id);
}

export const validateTransaction = (transaction: TransactionsDto) => {
    return !(!transaction.memberId || !transaction.bookId || !transaction.borrowDate || !transaction.dueDate);
}