export function Login() {
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
                    <span className="text-gray-500 text-sm">Welcome back! Please login.</span>
                </div>
                <form>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                        />
                    </div>
                    <div className="mb-2">
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none bg-white placeholder-gray-400"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center text-gray-500 text-xs">
                            <input type="checkbox" className="mr-1 rounded border-gray-200"/>
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-600 hover:underline text-xs"
                        >Forgot password?</a
                        >
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition"
                    >
                        Login
                    </button>
                    <div className="mt-5 text-center text-sm">
                        <span className="text-gray-600">Don't have an account?</span>
                        <a
                            /*href="register.html"*/
                            className="text-indigo-600 font-semibold hover:underline ml-1"
                        >Register</a
                        >
                    </div>
                </form>
            </div>
        </div>
    );
}