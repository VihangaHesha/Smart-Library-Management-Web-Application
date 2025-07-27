export interface ReportData {
    totalBooks: number;
    activeMembers: number;
    booksCheckedOut: number;
    overdueBooks: number;
    monthlyGrowth: {
        books: number;
        members: number;
        checkouts: number;
        overdue: number;
    };
}

export interface BookCategoryReport {
    category: string;
    count: number;
    percentage: number;
}

export interface MemberActivityReport {
    memberId: string;
    memberName: string;
    booksCheckedOut: number;
    overdueBooks: number;
    totalFines: number;
}