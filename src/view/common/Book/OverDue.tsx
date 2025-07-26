import type { BookData } from "../../../model/BookData.ts";

type OverDueProps = {
    books: BookData[];
};

export const OverDue = ({ books }: OverDueProps) => {
    const overdueBooks = books.filter(book => book.status === "Overdue");

    return (
        <>
            {overdueBooks.map(book => (
                <tr key={book.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500">{book.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">Unknown Member</div>
                        <div className="text-sm text-gray-500">unknown@example.com</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Not Set
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            N/A
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        $0.00
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                            <i className="fas fa-envelope"></i>
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                            <i className="fas fa-check"></i>
                        </button>
                    </td>
                </tr>
            ))}
        </>
    );
};
