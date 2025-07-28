export interface BookDto{
    id: number
    title: string
    author: string
    category: string
    quantity: number
    status: 'Available' | 'Checked Out' | 'Overdue'
}