import Member from "../model/members.model";
import { MemberDto } from "../dto/member.dto";


export const getAllMembers = async (): Promise<MemberDto[]> => {
    return Member.find();
}

export const saveMember = async (member: MemberDto): Promise<MemberDto> => {
    // Optionally, check for duplicate email before saving
    return Member.create(member);

}

export const getMemberById = async (id: number): Promise<MemberDto | null> => {
    return Member.findOne({ id });
}

export const updateMember = async (id: number, data: MemberDto) => {
    const member = await Member.findOneAndUpdate({ id }, data, { new: true });
    if (!member) {
        return null;
    }
    return member;
}

export const deleteMember = async (id: number) => {
    // Optionally check if member is checked out before deleting
    return Member.findByIdAndDelete(id);
}

export const validateMember = (member: MemberDto) => {
    return !(!member.name || !member.email || !member.membershipDate || !member.booksCheckedOut);
}
