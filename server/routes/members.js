const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { members } = require('../data/members');
const { transactions } = require('../data/transactions');

const router = express.Router();

// Get all members with optional filtering
router.get('/', (req, res) => {
  try {
    let filteredMembers = [...members];
    
    // Filter by status
    if (req.query.status) {
      filteredMembers = filteredMembers.filter(member => 
        member.status === req.query.status
      );
    }
    
    // Search by name or email
    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredMembers = filteredMembers.filter(member => 
        member.name.toLowerCase().includes(searchTerm) ||
        member.email.toLowerCase().includes(searchTerm)
      );
    }
    
    res.json(filteredMembers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Get single member by ID
router.get('/:id', (req, res) => {
  try {
    const member = members.find(m => m.id === req.params.id);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    // Include member's transaction history
    const memberTransactions = transactions.filter(t => t.memberId === req.params.id);
    
    res.json({
      ...member,
      transactions: memberTransactions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member' });
  }
});

// Add new member
router.post('/', (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Check if email already exists
    const existingMember = members.find(m => m.email === email);
    if (existingMember) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const newMember = {
      id: uuidv4(),
      name,
      email,
      phone: phone || '',
      address: address || '',
      membershipDate: new Date().toISOString().split('T')[0],
      status: 'active',
      borrowedBooks: 0
    };
    
    members.push(newMember);
    res.status(201).json(newMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add member' });
  }
});

// Update member
router.put('/:id', (req, res) => {
  try {
    const memberIndex = members.findIndex(m => m.id === req.params.id);
    if (memberIndex === -1) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    // Check email uniqueness if email is being updated
    if (req.body.email && req.body.email !== members[memberIndex].email) {
      const existingMember = members.find(m => m.email === req.body.email);
      if (existingMember) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }
    
    const updatedMember = { ...members[memberIndex], ...req.body };
    members[memberIndex] = updatedMember;
    
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member' });
  }
});

// Delete member
router.delete('/:id', (req, res) => {
  try {
    const memberIndex = members.findIndex(m => m.id === req.params.id);
    if (memberIndex === -1) {
      return res.status(404).json({ error: 'Member not found' });
    }
    
    // Check if member has active borrows
    const activeBorrows = transactions.filter(t => 
      t.memberId === req.params.id && t.status === 'borrowed'
    );
    
    if (activeBorrows.length > 0) {
      return res.status(400).json({ error: 'Cannot delete member with active borrows' });
    }
    
    members.splice(memberIndex, 1);
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

module.exports = router;