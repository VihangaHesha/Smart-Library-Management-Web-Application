import { Router } from "express";
/*import { getDashboardStats, getCategoryReport, getMemberActivityReport } from "../controllers/report.controller";
import { authorizeRole } from "../middleware/auth.middleware";*/

const reportRouter: Router = Router();

// Handle Requests
reportRouter.get("/dashboard", /*getDashboardStats*/); // Dashboard Stats
reportRouter.get("/categories", /*getCategoryReport*/); // Category Report
reportRouter.get("/member-activity", /*getMemberActivityReport*/); // Member Activity Report

export default reportRouter;