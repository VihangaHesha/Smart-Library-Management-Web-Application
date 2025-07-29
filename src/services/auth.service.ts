import User, { IUser } from '../model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { RegisterDTO, LoginDTO, AuthResponseDTO } from '../dto/auth.dto';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const refreshTokens = new Set<string>();

/**
 * Authenticate a user by email and password.
 * Issues access and refresh tokens if successful.
 */
export const authenticateUser = async (
    email: string,
    password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.isActive) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  const accessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '5m' }
  );
  const refreshToken = jwt.sign(
      { email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
  );

  refreshTokens.add(refreshToken);

  return { accessToken, refreshToken };
};

/**
 * Register a new user.
 */
export const registerUser = async (
    userData: RegisterDTO
): Promise<AuthResponseDTO> => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    return {
      success: false,
      message: 'User already exists with this email',
    };
  }

  // Hash password and create new user
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  await user.save();

  // Generate tokens
  const accessToken = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '5m' }
  );
  const refreshToken = jwt.sign(
      { email: user.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
  );

  refreshTokens.add(refreshToken);

  return {
    success: true,
    message: 'User registered successfully',
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken,
    refreshToken,
  };
};

/**
 * Get a user profile without password.
 */
export const getUserProfile = async (
    userId: string
): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};

/**
 * Exported for testing or management of refresh tokens.
 */
export const isRefreshTokenValid = (token: string): boolean => {
  return refreshTokens.has(token);
};