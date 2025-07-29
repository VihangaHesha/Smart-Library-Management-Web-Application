export interface CreateMemberDTO {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  membershipDate?: Date;
}

export interface UpdateMemberDTO {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  status?: 'active' | 'inactive' | 'suspended';
  maxBooksAllowed?: number;
}

export interface MemberResponseDTO {
  id: string;
  memberId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  membershipDate: Date;
  status: 'active' | 'inactive' | 'suspended';
  booksCheckedOut: number;
  maxBooksAllowed: number;
  totalFines: number;
}