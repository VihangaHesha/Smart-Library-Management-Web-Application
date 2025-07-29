import Member, { IMember } from '../model/Member';
import Transaction from '../model/Transaction';
import { CreateMemberDTO, UpdateMemberDTO, MemberResponseDTO } from '../dto/MemberDTO';

export class MemberService {
  async getAllMembers(page: number = 1, limit: number = 10, search?: string, status?: string): Promise<{ members: MemberResponseDTO[], total: number, pages: number }> {
    try {
      const query: any = {};
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { memberId: { $regex: search, $options: 'i' } }
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

      const membersDTO = members.map(member => this.mapToResponseDTO(member));

      return { members: membersDTO, total, pages };
    } catch (error: any) {
      throw new Error(`Failed to fetch members: ${error.message}`);
    }
  }

  async getMemberById(id: string): Promise<MemberResponseDTO | null> {
    try {
      const member = await Member.findById(id);
      if (!member) return null;

      return this.mapToResponseDTO(member);
    } catch (error: any) {
      throw new Error(`Failed to fetch member: ${error.message}`);
    }
  }

  async getMemberByMemberId(memberId: string): Promise<MemberResponseDTO | null> {
    try {
      const member = await Member.findOne({ memberId });
      if (!member) return null;

      return this.mapToResponseDTO(member);
    } catch (error: any) {
      throw new Error(`Failed to fetch member: ${error.message}`);
    }
  }

  async createMember(memberData: CreateMemberDTO): Promise<MemberResponseDTO> {
    try {
      const member = new Member(memberData);
      await member.save();
      
      return this.mapToResponseDTO(member);
    } catch (error: any) {
      throw new Error(`Failed to create member: ${error.message}`);
    }
  }

  async updateMember(id: string, updateData: UpdateMemberDTO): Promise<MemberResponseDTO | null> {
    try {
      const member = await Member.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
      
      if (!member) return null;

      return this.mapToResponseDTO(member);
    } catch (error: any) {
      throw new Error(`Failed to update member: ${error.message}`);
    }
  }

  async deleteMember(id: string): Promise<boolean> {
    try {
      // Check if member has active transactions
      const activeTransactions = await Transaction.countDocuments({
        memberId: id,
        status: { $in: ['active', 'overdue'] }
      });

      if (activeTransactions > 0) {
        throw new Error('Cannot delete member with active transactions');
      }

      const member = await Member.findByIdAndDelete(id);
      return !!member;
    } catch (error: any) {
      throw new Error(`Failed to delete member: ${error.message}`);
    }
  }

  async updateMemberStats(memberId: string): Promise<void> {
    try {
      const activeTransactions = await Transaction.countDocuments({
        memberId,
        status: { $in: ['active', 'overdue'] }
      });

      const totalFines = await Transaction.aggregate([
        { $match: { memberId: memberId, fine: { $gt: 0 } } },
        { $group: { _id: null, total: { $sum: '$fine' } } }
      ]);

      await Member.findByIdAndUpdate(memberId, {
        booksCheckedOut: activeTransactions,
        totalFines: totalFines[0]?.total || 0
      });
    } catch (error: any) {
      throw new Error(`Failed to update member stats: ${error.message}`);
    }
  }

  private mapToResponseDTO(member: IMember): MemberResponseDTO {
    return {
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
    };
  }
}