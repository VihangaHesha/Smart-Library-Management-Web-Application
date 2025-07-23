export const Footer = () => {
    return (
        <>
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <div className="flex items-center space-x-2">
                                <i className="fas fa-book-open text-2xl"></i>
                                <span className="text-xl font-bold">BookNest</span>
                            </div>
                            <p className="text-gray-400 mt-2">
                                Your digital library management solution
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" className="hover:text-indigo-300 transition">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="hover:text-indigo-300 transition">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="hover:text-indigo-300 transition">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="hover:text-indigo-300 transition">
                                <i className="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
        ;
};