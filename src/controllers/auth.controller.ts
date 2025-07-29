import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middleware/auth.middleware';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const result = await authService.registerUser(req.body);
    const statusCode = result.success ? 201 : 400;
    res.status(statusCode).json(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

// Login a user and return tokens
export const login = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    const tokens = await authService.authenticateUser(email, password);
    if (!tokens) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Retrieve user data for response
    const user = await authService.getUserProfile((await getUserIdByEmail(email)));
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      },
      ...tokens
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    });
  }
};

// Get the currently authenticated user's profile
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getUserProfile(req.user!._id.toString());
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch profile'
    });
  }
};

// Helper to get userId from email (used in login for user data in response)
async function getUserIdByEmail(email: string): Promise<string> {
  const user = await (await import('../model/user.model')).default.findOne({ email });
  return user ? user._id.toString() : '';
}