import { Router } from "express";
/*import { getAllMembers, saveMember, getMember, updateMember, deleteMember } from "../controllers/member.controller";
import { authorizeRole } from "../middleware/auth.middleware";*/

const memberRouter: Router = Router();

// Handle Requests
memberRouter.get("/all", /*getAllMembers*/); // Get All Members
memberRouter.post("/save", /*authorizeRole('Admin'), saveMember*/); // Save Member
memberRouter.get("/:id", /*getMember*/); // Get Specific Member
memberRouter.put("/update/:id", /*authorizeRole('Admin'), updateMember*/); // Update Member
memberRouter.delete("/delete/:id", /*authorizeRole('Admin'), deleteMember*/); // Delete Member

export default memberRouter;