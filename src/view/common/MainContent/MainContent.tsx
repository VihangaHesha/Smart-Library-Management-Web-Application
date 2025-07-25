import {Routes,Route} from "react-router-dom";
import {Home} from "../../pages/Home/Home.tsx";
import {Books} from "../../pages/Books/Books.tsx";
import {Members} from "../../pages/Members/Members.tsx";
import {Transactions} from "../../pages/Transactions/Transactions.tsx";
import {Reports} from "../../pages/Reports/Reports.tsx";
import {Login} from "../../pages/Login/Login.tsx";
import {Register} from "../../pages/Register/Register.tsx";

export const MainContent = () => {
    return (
        <div className="flex flex-col w-full overflow-auto p-2.5 h-[calc(100%-168px)]">
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/books" element={<Books/>}></Route>
                    <Route path="/members" element={<Members/>}></Route>
                    <Route path="/transactions" element={<Transactions/>}></Route>
                    <Route path="/reports" element={<Reports/>}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                </Routes>
            </div>
        </div>
    );
};