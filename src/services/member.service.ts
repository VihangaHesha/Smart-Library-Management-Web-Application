import Member, { IMember } from "../model/member.model";
import Transaction from "../model/transaction.model";
import { CreateMemberDTO, UpdateMemberDTO, MemberResponseDTO } from "../dto/member.dto";

/**
 * Get all members, with pagination, search, and status filter.
 */
export const getAllMembers = async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: string
): Promise<{ members: MemberResponseDTO[]; total: number; pages: number }> => {
  const query: any = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { memberId: { $regex: search, $options: "i" } }
    ];
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;
  const members = await Member.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

  const total = await Member.countDocuments(query);
  const pages = Math.ceil(total / limit);

  const membersDTO = members.map(mapToResponseDTO);

  return { members: membersDTO, total, pages };
};

/**
 * Get a single member by their MongoDB ID.
 */
export const getMemberById = async (id: string): Promise<MemberResponseDTO | null> => {
  const member = await Member.findById(id);
  if (!member) return null;
  return mapToResponseDTO(member);
};

/**
 * Get a single member by their memberId field.
 */
export const getMemberByMemberId = async (memberId: string): Promise<MemberResponseDTO | null> => {
  const member = await Member.findOne({ memberId });
  if (!member) return null;
  return mapToResponseDTO(member);
};

/**
 * Create a new member.
 */
export const createMember = async (memberData: CreateMemberDTO): Promise<MemberResponseDTO> => {
  const member = new Member(memberData);
  await member.save();
  return mapToResponseDTO(member);
};

/**
 * Update an existing member.
 */
export const updateMember = async (
    id: string,
    updateData: UpdateMemberDTO
): Promise<MemberResponseDTO | null> => {
  const member = await Member.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });
  if (!member) return null;
  return mapToResponseDTO(member);
};

/**
 * Delete a member (only if they have no active or overdue transactions).
 */
export const deleteMember = async (id: string): Promise<boolean> => {
  const activeTransactions = await Transaction.countDocuments({
    memberId: id,
    status: { $in: ["active", "overdue"] }
  });
  if (activeTransactions > 0) {
    throw new Error("Cannot delete member with active transactions");
  }
  const member = await Member.findByIdAndDelete(id);
  return !!member;
};

/**
 * Update member statistics: books checked out and total fines.
 */
export const updateMemberStats = async (memberId: string): Promise<void> => {
  const activeTransactions = await Transaction.countDocuments({
    memberId,
    status: { $in: ["active", "overdue"] }
  });

  const totalFines = await Transaction.aggregate([
    { $match: { memberId: memberId, fine: { $gt: 0 } } },
    { $group: { _id: null, total: { $sum: "$fine" } } }
  ]);

  await Member.findByIdAndUpdate(memberId, {
    booksCheckedOut: activeTransactions,
    totalFines: totalFines[0]?.total || 0
  });
};

/**
 * Helper: map a member to a response DTO.
 */
export const mapToResponseDTO = (member: IMember): MemberResponseDTO => ({
  id: member._id.toString(),
  memberId: member.memberId,
  name: member.name,
  email: member.email,
  phone: member.phone,
  address: member.address,
  membershipDate: member.membershipDate,
  status: member.status,
  booksCheckedOut: member.booksCheckedOut,
  maxBooksAllowed: member.maxBooksAllowed,
  totalFines: member.totalFines
});