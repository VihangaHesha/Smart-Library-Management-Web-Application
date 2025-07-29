export interface CreateBookDTO {
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  publishedYear: number;
  description?: string;
  imageUrl?: string;
}

export interface UpdateBookDTO {
  title?: string;
  author?: string;
  isbn?: string;
  category?: string;
  totalCopies?: number;
  availableCopies?: number;
  publishedYear?: number;
  description?: string;
  imageUrl?: string;
  isActive?: boolean;
}

export interface BookResponseDTO {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  publishedYear: number;
  description?: string;
  imageUrl?: string;
  addedDate: Date;
  status: 'Available' | 'Checked Out' | 'Overdue';
  isActive: boolean;
}