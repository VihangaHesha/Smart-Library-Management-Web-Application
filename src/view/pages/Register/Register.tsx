export const Register = () => {
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
        <span
            className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-2"
        >
          <i className="fas fa-book-open text-indigo-600 text-3xl"></i>
        </span>
                    <h2 className="text-2xl font-bold text-indigo-700 mb-1">BookNest</h2>
                    <span className="text-gray-500 text-sm">Create your free account</span>
                </div>
                <form id="registerForm">
                    <div id="step1">
                        <div className="mb-4">
                            <input
                                type="text"
                                id="name"
                                placeholder="Full Name"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                            // onClick="sendOTP()"
                            id="sendOtpBtn"
                        >
                            Send OTP
                        </button>
                    </div>
                    <div id="step2" className="hidden">
                        <div className="mb-4">
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter OTP"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow transition"
                            // onClick="verifyOTP()"
                            id="verifyOtpBtn"
                        >
                            Verify OTP
                        </button>
                        <div className="mt-2 text-center text-xs text-gray-500">
                            <span>Didn't receive the code?</span>
                            <button
                                type="button"
                                className="text-indigo-600 hover:underline ml-1"
                                // onClick="resendOTP()"
                            >
                                Resend OTP
                            </button>
                        </div>
                    </div>
                    <div id="step3" className="hidden">
                        <div className="mb-4">
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                            />
                        </div>
                        <div className="mb-6">
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                                required
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                        >
                            Register
                        </button>
                    </div>
                    <div className="mt-5 text-center text-sm">
                        <span className="text-gray-600">Already have an account?</span>
                        <a
                            href="login.html"
                            className="text-indigo-600 font-semibold hover:underline ml-1"
                        >Login</a
                        >
                    </div>
                </form>
                <div id="message" className="text-center text-sm mt-3 text-red-600"></div>
            </div>
        </div>
    );
};