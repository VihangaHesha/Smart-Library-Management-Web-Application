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

interface HardcodedUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'librarian' | 'member';
  isActive: boolean;
}

const adminUser: HardcodedUser = {
  id: 1,
  name: "System Administrator",
  email: "admin@library.com",
  password: bcrypt.hashSync("admin123", 10),
  role: "admin",
  isActive: true
}

const librarianUser: HardcodedUser = {
  id: 2,
  name: "Head Librarian",
  email: "librarian@library.com",
  password: bcrypt.hashSync("lib456", 10),
  role: "librarian",
  isActive: true
}

const userList: HardcodedUser[] = [];
userList.push(adminUser);
userList.push(librarianUser);

// Helper function to check hardcoded users
const checkHardcodedUser = (email: string, password: string): { accessToken: string; refreshToken: string } | null => {
  // Check if email matches hardcoded users
  const existingUser: HardcodedUser | undefined = userList.find(user => user.email === email && user.isActive);
  const isValidPassword = undefined != existingUser && bcrypt.compareSync(password, existingUser?.password);

  if (!existingUser || !isValidPassword) {
    return null;
  }

  const accessToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email, name: existingUser.name, role: existingUser.role },
      JWT_SECRET,
      { expiresIn: "5m" }
  );
  const refreshToken = jwt.sign(
      { email: existingUser.email },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
  );

  refreshTokens.add(refreshToken);

  return { accessToken, refreshToken };
}

/**
 * Authenticate a user by email and password.
 * First checks hardcoded users, then falls back to database users.
 * Issues access and refresh tokens if successful.
 */
export const authenticateUser = async (
    email: string,
    password: string
): Promise<{ accessToken: string; refreshToken: string } | null> => {
  // First check hardcoded users
  const hardcodedResult = checkHardcodedUser(email, password);
  if (hardcodedResult) {
    return hardcodedResult;
  }

  // If not found in hardcoded users, check database
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