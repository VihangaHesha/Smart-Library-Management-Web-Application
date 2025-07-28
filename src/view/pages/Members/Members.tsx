import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/store';
import { getAllMembers, addMember, updateMember, deleteMember } from '../../../slices/membersSlice';
import { Modal } from '../../common/Modal/Modal';
import { MemberForm } from './MemberForm';
import { LoadingSpinner } from '../../common/LoadingSpinner/LoadingSpinner';
import type { Member } from '../../../model/MemberData';

export function Members() {
    const dispatch = useDispatch<AppDispatch>();
    const { list: members, loading, error } = useSelector((state: RootState) => state.members);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | undefined>();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllMembers());
    }, [dispatch]);

    // Filter members based on search term
    const filteredMembers = members.filter(member => 
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddMember = () => {
        setEditingMember(undefined);
        setIsModalOpen(true);
    };

    const handleEditMember = (member: Member) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const handleDeleteMember = async (memberId: string) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await dispatch(deleteMember(memberId)).unwrap();
                console.log('Member deleted successfully');
            } catch (error) {
                console.error('Failed to delete member:', error);
            }
        }
    };

    const handleFormSubmit = async (memberData: Omit<Member, 'id'>) => {
        try {
            if (editingMember) {
                // Update existing member
                await dispatch(updateMember({ ...memberData, id: editingMember.id })).unwrap();
                console.log('Member updated successfully');
            } else {
                // Add new member
                await dispatch(addMember(memberData)).unwrap();
                console.log('Member added successfully');
            }
            setIsModalOpen(false);
            setEditingMember(undefined);
        } catch (error) {
            console.error('Failed to save member:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingMember(undefined);
    };

    const getStatusColor = (member: Member) => {
        // Determine status based on membership date and activity
        const membershipDate = new Date(member.membershipDate);
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - 6);
        
        if (membershipDate < monthsAgo && member.booksCheckedOut === 0) {
            return 'bg-yellow-100 text-yellow-800';
        }
        return 'bg-green-100 text-green-800';
    };

    const getStatusText = (member: Member) => {
        const membershipDate = new Date(member.membershipDate);
        const monthsAgo = new Date();
        monthsAgo.setMonth(monthsAgo.getMonth() - 6);
        
        if (membershipDate < monthsAgo && member.booksCheckedOut === 0) {
            return 'Inactive';
        }
        return 'Active';
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-6">
                <LoadingSpinner size="lg" text="Loading members..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    Error: {error}
                </div>
            </div>
        );
    }

    return (
        <>
        <div className="container mx-auto px-4 py-6">
            {/*Page Header*/}
            <div
                className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
            >
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Members</h1>
                    <p className="text-gray-600">View and manage library members.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                        onClick={handleAddMember}
                    >
                        <i className="fas fa-user-plus"></i>
                        <span>Add Member</span>
                    </button>

                </div>
            </div>
            {/*Member Table*/}
            <div className="bg-white rounded-lg shadow">
                <div
                    className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:justify-between md:items-center"
                >
                    <h2 className="text-lg font-semibold text-gray-800">All Members</h2>
                    <div className="mt-2 md:mt-0 flex space-x-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            placeholder="Search by name, email, ID..."
                        />
                        <button
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg transition"
                        >
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Member ID
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Name
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Email
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Join Date
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Status
                            </th>
                            <th
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {filteredMembers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                    {searchTerm ? 'No members match your search criteria' : 'No members found'}
                                </td>
                            </tr>
                        ) : (
                            filteredMembers.map((member) => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {member.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                                        <div className="flex-shrink-0 h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                                            <i className="fas fa-user text-indigo-600"></i>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{member.name}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {member.membershipDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(member)}`}>
                                            {getStatusText(member)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            title="View"
                                        >
                                            <i className="fas fa-eye"></i>
                                        </button>
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            title="Edit"
                                            onClick={() => handleEditMember(member)}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                            onClick={() => handleDeleteMember(member.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        {/* Add/Edit Member Modal */}
        <Modal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            title={editingMember ? 'Edit Member' : 'Add New Member'}
            size="md"
        >
            <MemberForm member={editingMember} onSubmit={handleFormSubmit} onCancel={handleModalClose} />
        </Modal>
        </>
    );
}