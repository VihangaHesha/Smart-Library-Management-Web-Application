import {Link} from "react-router-dom";

export function NavBar(){
    return(
        <div
            className="container bg-indigo-700 text-white shadow-lg mx-auto px-4 py-3 flex justify-between items-center"
        >
            <div className="flex items-center space-x-2">
                <i className="fas fa-book-open text-2xl"></i>
                <span className="text-xl font-bold">BookNest</span>
            </div>
             <div className="hidden md:flex space-x-6">
                 <Link
                 to="/">
                     <p className="hover:text-indigo-200 transition">Dashboard</p>
                 </Link>
                 <Link to="/books">
                     <p className="hover:text-indigo-200 transition">Books</p>
                 </Link>
                 <Link to="/members">
                     <p className="hover:text-indigo-200 transition">Members</p>
                 </Link>
                 <Link to="/transactions">
                     <p className="hover:text-indigo-200 transition">Transactions</p>
                 </Link>
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
    )
}