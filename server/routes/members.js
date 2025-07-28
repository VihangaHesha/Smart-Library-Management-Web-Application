const express = require('express');
const router = express.Router();
const { members, getNextId } = require('../data/members');

// GET /api/members - Get all members
router.get('/', (req, res) => {
  res.json(members);
});

// GET /api/members/:id - Get member by ID
router.get('/:id', (req, res) => {
  const memberId = req.params.id;
  const member = members.find(m => m.id === memberId);
  
  if (!member) {
    return res.status(404).json({ error: 'Member not found' });
  }
  
  res.json(member);
});

// POST /api/members - Add new member
router.post('/', (req, res) => {
  const { name, email, membershipDate, booksCheckedOut } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  // Check if email already exists
  const existingMember = members.find(m => m.email === email);
  if (existingMember) {
    return res.status(400).json({ error: 'Email already exists' });
  }
  
  const newMember = {
    id: getNextId(),
    name,
    email,
    membershipDate: membershipDate || new Date().toISOString().split('T')[0],
    booksCheckedOut: booksCheckedOut || 0
  };
  
  members.push(newMember);
  res.status(201).json(newMember);
});

// PUT /api/members/:id - Update member
router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const memberIndex = members.findIndex(m => m.id === memberId);
  
  if (memberIndex === -1) {
    return res.status(404).json({ error: 'Member not found' });
  }
  
  const { name, email, membershipDate, booksCheckedOut } = req.body;
  
  // Check if email already exists for another member
  if (email && email !== members[memberIndex].email) {
    const existingMember = members.find(m => m.email === email && m.id !== memberId);
    if (existingMember) {
      return res.status(400).json({ error: 'Email already exists' });
    }
  }
  
  members[memberIndex] = {
    ...members[memberIndex],
    name: name || members[memberIndex].name,
    email: email || members[memberIndex].email,
    membershipDate: membershipDate || members[memberIndex].membershipDate,
    booksCheckedOut: booksCheckedOut !== undefined ? parseInt(booksCheckedOut) : members[memberIndex].booksCheckedOut
  };
  
  res.json(members[memberIndex]);
});

// DELETE /api/members/:id - Delete member
router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  const memberIndex = members.findIndex(m => m.id === memberId);
  
  if (memberIndex === -1) {
    return res.status(404).json({ error: 'Member not found' });
  }
  
  members.splice(memberIndex, 1);
  res.json({ message: 'Member deleted successfully' });
});

module.exports = router;