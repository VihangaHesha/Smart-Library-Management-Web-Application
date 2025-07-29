export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'librarian' | 'member';
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken?: string;
  refreshToken?: string;
}