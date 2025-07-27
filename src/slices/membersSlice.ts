import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import {PayloadAction} from "@reduxjs/toolkit"
import type { Member } from "../model/MemberData";

interface MemberState {
    list: Member[];
    loading: boolean;
    error: string | null;
}

const initialState: MemberState = {
    list: [],
    loading: false,
    error: null
};

// Mock data for demonstration
const mockMembers: Member[] = [
    {
        id: "M-10231",
        name: "Emily Brown",
        email: "emily.brown@example.com",
        membershipDate: "2024-03-15",
        booksCheckedOut: 2
    },
    {
        id: "M-10235",
        name: "David Lee",
        email: "david.lee@example.com",
        membershipDate: "2024-02-22",
        booksCheckedOut: 1
    },
    {
        id: "M-10236",
        name: "Priya Singh",
        email: "priya.singh@example.com",
        membershipDate: "2023-12-02",
        booksCheckedOut: 0
    }
];

// Async thunks for API calls (currently using mock data)
export const getAllMembers = createAsyncThunk(
    "members/getAllMembers",
    async () => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/members");
        // return await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return mockMembers;
    }
);

export const addMember = createAsyncThunk(
    "members/addMember",
    async (memberData: Omit<Member, 'id'>) => {
        // TODO: Replace with actual API call
        // const response = await fetch("/api/members", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(memberData)
        // });
        // return await response.json();
        
        const newMember: Member = {
            ...memberData,
            id: `M-${Date.now()}`, // Generate temporary ID
        };
        return newMember;
    }
);

export const updateMember = createAsyncThunk(
    "members/updateMember",
    async (memberData: Member) => {
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/members/${memberData.id}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(memberData)
        // });
        // return await response.json();
        
        return memberData;
    }
);

export const deleteMember = createAsyncThunk(
    "members/deleteMember",
    async (memberId: string) => {
        // TODO: Replace with actual API call
        // await fetch(`/api/members/${memberId}`, { method: "DELETE" });
        
        return memberId;
    }
);

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get all members
            .addCase(getAllMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(getAllMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch members";
            })
            
            // Add member
            .addCase(addMember.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            
            // Update member
            .addCase(updateMember.fulfilled, (state, action) => {
                const index = state.list.findIndex(member => member.id === action.payload.id);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            
            // Delete member
            .addCase(deleteMember.fulfilled, (state, action) => {
                state.list = state.list.filter(member => member.id !== action.payload);
            });
    }
});

export default membersSlice.reducer;