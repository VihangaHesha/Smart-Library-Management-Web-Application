import type {BookData} from "../../../model/BookData.ts";


type BookProps = {
    data : BookData
}

export function Book({data} : BookProps) {
    // const dispatch = useDispatch<AppDispatch>();

    return (

                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <div
                                    className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center"
                                >
                                    <i className="fas fa-book text-indigo-600"></i>
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">
                                        {data.title}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.author}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {data.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                                ${data.status === 'Available' ? 'bg-green-100 text-green-800' : 
                                    data.status === 'Checked Out' ? 'bg-yellow-100 text-yellow-800' : 
                                        data.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                                            'bg-gray-100 text-gray-800'}`}
                            >{data.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                <i className="fas fa-eye"></i>
                            </button>
                            <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
    );
};