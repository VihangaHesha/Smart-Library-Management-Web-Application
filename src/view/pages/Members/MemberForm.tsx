import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Member } from '../../../model/MemberData';

interface MemberFormProps {
    member?: Member;
    onSubmit: (data: Omit<Member, 'id'>) => void;
    onCancel: () => void;
}

interface MemberFormData {
    name: string;
    email: string;
    membershipDate: string;
    booksCheckedOut: number;
}

export const MemberForm = ({ member, onSubmit, onCancel }: MemberFormProps) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<MemberFormData>();

    useEffect(() => {
        if (member) {
            reset({
                name: member.name,
                email: member.email,
                membershipDate: member.membershipDate,
                booksCheckedOut: member.booksCheckedOut
            });
        } else {
            // Set default values for new member
            reset({
                name: '',
                email: '',
                membershipDate: new Date().toISOString().split('T')[0], // Today's date
                booksCheckedOut: 0
            });
        }
    }, [member, reset]);

    const handleFormSubmit = (data: MemberFormData) => {
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                </label>
                <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter member's full name"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                </label>
                <input
                    type="email"
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    placeholder="Enter email address"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Membership Date */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Membership Date *
                </label>
                <input
                    type="date"
                    {...register('membershipDate', { required: 'Membership date is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                {errors.membershipDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.membershipDate.message}</p>
                )}
            </div>

            {/* Books Checked Out (for editing existing members) */}
            {member && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Books Currently Checked Out
                    </label>
                    <input
                        type="number"
                        min="0"
                        {...register('booksCheckedOut', { 
                            min: { value: 0, message: 'Cannot be negative' }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        placeholder="Number of books checked out"
                    />
                    {errors.booksCheckedOut && (
                        <p className="text-red-500 text-sm mt-1">{errors.booksCheckedOut.message}</p>
                    )}
                </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    {member ? 'Update Member' : 'Add Member'}
                </button>
            </div>
        </form>
    );
};