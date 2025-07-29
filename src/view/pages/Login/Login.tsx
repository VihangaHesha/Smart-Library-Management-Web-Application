import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { backendApi } from "../../../api.ts";



// Helper function to decode JWT token
const getUserFromToken = (token: string) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            username: payload.username,
            email: payload.email,
            role: payload.role,
            userId: payload.userId
        };
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

type FormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
};

export function Login() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const authenticateUser = async (data: FormData) => {
        setIsLoading(true);
        try {
            const response = await backendApi.post('/auth/login', {
                email: data.email,
                password: data.password
            });

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            // Store tokens in localStorage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // Extract user data from token
            const user = getUserFromToken(accessToken);

            if (user) {
                localStorage.setItem('username', user.username || '');
                localStorage.setItem('email', user.email || '');
                localStorage.setItem('role', user.role || 'user');
                localStorage.setItem('userId', user.userId || '');
            }

            // Success notification
            alert("Successfully logged in!");

            // Navigate to dashboard or home page
            navigate('/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            alert("Login failed. Please check your credentials and try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password page or show modal
        navigate('/forgot-password');
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen font-sans"
            style={{
                background: "linear-gradient(120deg, #6366f1 0%, #818cf8 100%)",
                fontFamily: '"Inter", sans-serif'
            }}
        >
            <div className="w-full max-w-sm bg-white/80 shadow-2xl rounded-xl p-8">
                <div className="flex flex-col items-center mb-6">
                    <span className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-2">
                        <i className="fas fa-book-open text-indigo-600 text-3xl"></i>
                    </span>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-1">BookNest</h2>
                    <span className="text-gray-500 text-sm">Welcome back! Please login.</span>
                </div>

                <form onSubmit={handleSubmit(authenticateUser)}>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            disabled={isLoading}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400 disabled:opacity-50"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="mb-2">
                        <input
                            type="password"
                            placeholder="Password"
                            disabled={isLoading}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400 disabled:opacity-50"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-gray-500 text-xs">
                            <input
                                type="checkbox"
                                className="mr-1 rounded border-gray-200"
                                {...register("rememberMe")}
                            />
                            Remember me
                        </label>
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-indigo-600 hover:underline text-xs"
                        >
                            Forgot password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <div className="mt-5 text-center text-sm">
                        <span className="text-gray-600">Don't have an account?</span>
                        <button
                            type="button"
                            onClick={handleRegister}
                            className="text-indigo-600 font-semibold hover:underline ml-1"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}