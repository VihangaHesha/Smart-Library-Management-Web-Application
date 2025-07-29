import Book, { IBook } from '../model/Book';
import Transaction from '../model/Transaction';
import { CreateBookDTO, UpdateBookDTO, BookResponseDTO } from '../dto/BookDTO';

export class BookService {
  async getAllBooks(page: number = 1, limit: number = 10, search?: string, category?: string): Promise<{ books: BookResponseDTO[], total: number, pages: number }> {
    try {
      const query: any = { isActive: true };
      
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { isbn: { $regex: search, $options: 'i' } }
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

      const booksWithStatus = await Promise.all(
        books.map(async (book) => {
          const status = await this.getBookStatus(book._id.toString());
          return this.mapToResponseDTO(book, status);
        })
      );

      return { books: booksWithStatus, total, pages };
    } catch (error: any) {
      throw new Error(`Failed to fetch books: ${error.message}`);
    }
  }

  async getBookById(id: string): Promise<BookResponseDTO | null> {
    try {
      const book = await Book.findById(id);
      if (!book || !book.isActive) return null;

      const status = await this.getBookStatus(id);
      return this.mapToResponseDTO(book, status);
    } catch (error: any) {
      throw new Error(`Failed to fetch book: ${error.message}`);
    }
  }

  async createBook(bookData: CreateBookDTO): Promise<BookResponseDTO> {
    try {
      const book = new Book({
        ...bookData,
        availableCopies: bookData.totalCopies
      });
      
      await book.save();
      return this.mapToResponseDTO(book, 'Available');
    } catch (error: any) {
      throw new Error(`Failed to create book: ${error.message}`);
    }
  }

  async updateBook(id: string, updateData: UpdateBookDTO): Promise<BookResponseDTO | null> {
    try {
      const book = await Book.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!book) return null;

      const status = await this.getBookStatus(id);
      return this.mapToResponseDTO(book, status);
    } catch (error: any) {
      throw new Error(`Failed to update book: ${error.message}`);
    }
  }

  async deleteBook(id: string): Promise<boolean> {
    try {
      // Check if book has active transactions
      const activeTransactions = await Transaction.countDocuments({
        bookId: id,
        status: { $in: ['active', 'overdue'] }
      });

      if (activeTransactions > 0) {
        throw new Error('Cannot delete book with active transactions');
      }

      const book = await Book.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
      );

      return !!book;
    } catch (error: any) {
      throw new Error(`Failed to delete book: ${error.message}`);
    }
  }

  async getOverdueBooks(): Promise<BookResponseDTO[]> {
    try {
      const overdueTransactions = await Transaction.find({
        status: 'overdue'
      }).populate('bookId');

      const books = overdueTransactions
        .map(transaction => transaction.bookId as any)
        .filter(book => book && book.isActive);

      return books.map(book => this.mapToResponseDTO(book, 'Overdue'));
    } catch (error: any) {
      throw new Error(`Failed to fetch overdue books: ${error.message}`);
    }
  }

  async getBooksByCategory(category: string): Promise<BookResponseDTO[]> {
    try {
      const books = await Book.find({ category, isActive: true });
      
      const booksWithStatus = await Promise.all(
        books.map(async (book) => {
          const status = await this.getBookStatus(book._id.toString());
          return this.mapToResponseDTO(book, status);
        })
      );

      return booksWithStatus;
    } catch (error: any) {
      throw new Error(`Failed to fetch books by category: ${error.message}`);
    }
  }

  private async getBookStatus(bookId: string): Promise<'Available' | 'Checked Out' | 'Overdue'> {
    const book = await Book.findById(bookId);
    if (!book) return 'Available';

    if (book.availableCopies === 0) {
      // Check if any copies are overdue
      const overdueCount = await Transaction.countDocuments({
        bookId,
        status: 'overdue'
      });
      
      return overdueCount > 0 ? 'Overdue' : 'Checked Out';
    }

    return 'Available';
  }

  private mapToResponseDTO(book: IBook, status: 'Available' | 'Checked Out' | 'Overdue'): BookResponseDTO {
    return {
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
    };
  }
}