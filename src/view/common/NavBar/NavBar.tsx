export function NavBar(){
    return(
        <div>
            <nav className="bg-indigo-700 text-white shadow-lg">
                <div
                    className="container mx-auto px-4 py-3 flex justify-between items-center"
                >
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-book-open text-2xl"></i>
                        <span className="text-xl font-bold">BookNest</span>
                    </div>

                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-indigo-200 transition">Dashboard</a>
                        <a href="#" className="hover:text-indigo-200 transition">Books</a>
                        <a href="#" className="hover:text-indigo-200 transition">Members</a>
                        <a href="#" className="hover:text-indigo-200 transition">Transactions</a>
                        <a href="#" className="hover:text-indigo-200 transition">Reports</a>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <i
                                className="fas fa-bell text-xl cursor-pointer hover:text-indigo-200"
                            ></i>
                            <span
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                            >3</span
                            >
                        </div>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <img
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="User"
                                className="h-8 w-8 rounded-full"
                            />
                            <span className="hidden md:inline">Admin</span>
                        </div>
                        <button className="md:hidden" id="mobile-menu-button">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>
                </div>
            </nav>
        </div>
)
}