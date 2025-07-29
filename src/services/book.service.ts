import Book, { IBook } from "../model/book.model";
import Transaction from "../model/transaction.model";
import { CreateBookDTO, UpdateBookDTO, BookResponseDTO } from "../dto/book.dto";

/**
 * Get all active books, with pagination, search, and category filter.
 */
export const getAllBooks = async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    category?: string
): Promise<{ books: BookResponseDTO[]; total: number; pages: number }> => {
  const query: any = { isActive: true };

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { author: { $regex: search, $options: "i" } },
      { isbn: { $regex: search, $options: "i" } }
    ];
  }

  if (category) {
    query.category = category;
  }

  const skip = (page - 1) * limit;
  const books = await Book.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

  const total = await Book.countDocuments(query);
  const pages = Math.ceil(total / limit);

  // Attach status for each book
  const booksWithStatus = await Promise.all(
      books.map(async (book) => {
        const status = await getBookStatus(book._id.toString());
        return mapToResponseDTO(book, status);
      })
  );

  return { books: booksWithStatus, total, pages };
};

/**
 * Get a single book by ID (only if active).
 */
export const getBookById = async (id: string): Promise<BookResponseDTO | null> => {
  const book = await Book.findById(id);
  if (!book || !book.isActive) return null;
  const status = await getBookStatus(id);
  return mapToResponseDTO(book, status);
};

/**
 * Create a new book entry.
 */
export const createBook = async (bookData: CreateBookDTO): Promise<BookResponseDTO> => {
  const book = new Book({
    ...bookData,
    availableCopies: bookData.totalCopies
  });
  await book.save();
  return mapToResponseDTO(book, "Available");
};

/**
 * Update an existing book.
 */
export const updateBook = async (
    id: string,
    updateData: UpdateBookDTO
): Promise<BookResponseDTO | null> => {
  const book = await Book.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  if (!book) return null;
  const status = await getBookStatus(id);
  return mapToResponseDTO(book, status);
};

/**
 * "Delete" a book by marking it inactive, only if no active or overdue transactions.
 */
export const deleteBook = async (id: string): Promise<boolean> => {
  const activeTransactions = await Transaction.countDocuments({
    bookId: id,
    status: { $in: ["active", "overdue"] }
  });
  if (activeTransactions > 0) {
    throw new Error("Cannot delete book with active transactions");
  }
  const book = await Book.findByIdAndUpdate(id, { isActive: false }, { new: true });
  return !!book;
};

/**
 * Get all overdue books.
 */
export const getOverdueBooks = async (): Promise<BookResponseDTO[]> => {
  const overdueTransactions = await Transaction.find({ status: "overdue" }).populate("bookId");

  // Only include active books
  const books = overdueTransactions
      .map((transaction) => transaction.bookId as any)
      .filter((book) => book && book.isActive);

  return books.map((book) => mapToResponseDTO(book, "Overdue"));
};

/**
 * Get all books in a category.
 */
export const getBooksByCategory = async (category: string): Promise<BookResponseDTO[]> => {
  const books = await Book.find({ category, isActive: true });
  const booksWithStatus = await Promise.all(
      books.map(async (book) => {
        const status = await getBookStatus(book._id.toString());
        return mapToResponseDTO(book, status);
      })
  );
  return booksWithStatus;
};

/**
 * Helper: get status of a book.
 */
export const getBookStatus = async (
    bookId: string
): Promise<"Available" | "Checked Out" | "Overdue"> => {
  const book = await Book.findById(bookId);
  if (!book) return "Available";

  if (book.availableCopies === 0) {
    const overdueCount = await Transaction.countDocuments({
      bookId,
      status: "overdue"
    });
    return overdueCount > 0 ? "Overdue" : "Checked Out";
  }

  return "Available";
};

/**
 * Helper: map a book to a response DTO.
 */
export const mapToResponseDTO = (
    book: IBook,
    status: "Available" | "Checked Out" | "Overdue"
): BookResponseDTO => ({
  id: book._id.toString(),
  title: book.title,
  author: book.author,
  isbn: book.isbn,
  category: book.category,
  totalCopies: book.totalCopies,
  availableCopies: book.availableCopies,
  publishedYear: book.publishedYear,
  description: book.description,
  imageUrl: book.imageUrl,
  addedDate: book.addedDate,
  status,
  isActive: book.isActive
});