import jwt from 'jsonwebtoken';
import User, { IUser } from '../model/User';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from '../dto/AuthDTO';

export class AuthService {
  private generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  async register(userData: RegisterDTO): Promise<AuthResponseDTO> {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        return {
          success: false,
          message: 'User already exists with this email'
        };
      }

      // Create new user
      const user = new User(userData);
      await user.save();

      // Generate token
      const token = this.generateToken(user._id.toString());

      return {
        success: true,
        message: 'User registered successfully',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  async login(loginData: LoginDTO): Promise<AuthResponseDTO> {
    try {
      // Find user and include password for comparison
      const user = await User.findOne({ email: loginData.email }).select('+password');
      
      if (!user || !user.isActive) {
        return {
          success: false,
          message: 'Invalid credentials or account inactive'
        };
      }

      // Check password
      const isPasswordValid = await user.comparePassword(loginData.password);
      if (!isPasswordValid) {
        return {
          success: false,
          message: 'Invalid credentials'
        };
      }

      // Generate token
      const token = this.generateToken(user._id.toString());

      return {
        success: true,
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  }

  async getUserProfile(userId: string): Promise<IUser | null> {
    try {
      return await User.findById(userId).select('-password');
    } catch (error) {
      return null;
    }
  }
}