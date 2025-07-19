import {Routes,Route} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {Books} from "../../pages/Books/Books.tsx";
import {Members} from "../../pages/Members/Members.tsx";
import {Transactions} from "../../pages/Transactions/Transactions.tsx";
import {Reports} from "../../pages/Reports/Reports.tsx";

export const MainContent = () => {
    return (
        <div className="flex flex-col w-full overflow-auto p-2.5 h-[78vh]">
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/books" element={<Books/>}></Route>
                    <Route path="/members" element={<Members/>}></Route>
                    <Route path="/transactions" element={<Transactions/>}></Route>
                    <Route path="/reports" element={<Reports/>}></Route>
                </Routes>
            </div>
        </div>
    );
};