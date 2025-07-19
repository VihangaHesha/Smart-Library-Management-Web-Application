import {BrowserRouter, Route, Routes} from "react-router-dom";
import {DefaultLayout} from "./view/common/DefaultLayout/DefaultLayout.tsx";

function App(){
    return(
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<DefaultLayout/>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App;