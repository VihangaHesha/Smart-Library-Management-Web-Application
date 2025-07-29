import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as memberService from '../services/member.service';


export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const status = req.query.status as string;

    const result = await memberService.getAllMembers(page, limit, search, status);
    
    res.json({
      success: true,
      data: result.members,
      pagination: {
        page,
        limit,
        total: result.total,
        pages: result.pages
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch members'
    });
  }
};

export const getMemberById = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID',
        errors: errors.array()
      });
    }

    const member = await memberService.getMemberById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch member'
    });
  }
};

export const getMemberByMemberId = async (req: Request, res: Response) => {
  try {
    const { memberId } = req.params;
    const member = await memberService.getMemberByMemberId(memberId);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      data: member
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch member'
    });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const member = await memberService.createMember(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Member created successfully',
      data: member
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create member'
    });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const member = await memberService.updateMember(req.params.id, req.body);
    
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Member updated successfully',
      data: member
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update member'
    });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID',
        errors: errors.array()
      });
    }

    const deleted = await memberService.deleteMember(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Member not found'
      });
    }

    res.json({
      success: true,
      message: 'Member deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete member'
    });
  }
};