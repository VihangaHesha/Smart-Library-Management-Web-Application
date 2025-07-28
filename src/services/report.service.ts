import Reports from "../model/reports.model";
import {ReportsDto} from "../dto/reports.dto";


export const getDashboardStats = async () => {
    return Reports.find();
}

export const getCategoryReport = async () => {
    return Reports.find();
}

export const getMemberActivityReport = async () => {
    return Reports.find();
}

export const validateReport = (report: ReportsDto) => {
    return !(!report.activeMembers || !report.booksCheckedOut || !report.overdueBooks
        || !report.monthlyGrowth || !report.totalBooks);
}