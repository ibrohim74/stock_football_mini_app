import {BrowserRouter, Route, Routes, useParams} from "react-router-dom";
import {FOOTBALL, INDEX, TAP} from "./utils/const.jsx";
import IndexPage from "./pages/index_page.jsx";
import Layout from "./pages/layout.jsx";
import {useEffect} from "react";

function App() {
    const tg = window.Telegram.WebApp
    const {user_id} = useParams()
    useEffect(() => {
        tg.expand()
    }, [])

    return (<> asd
            {user_id}
        </>
        // <BrowserRouter>
        //     <Routes>
        //         {/* Index page route */}
        //         <Route path={`${INDEX}:user_id`} element={<IndexPage />} />
        //
        //         {/* Football route with dynamic user ID */}
        //         <Route path={`${FOOTBALL}:user_id/*`} element={<Layout path="football" />} />
        //
        //         {/* Tap route with dynamic user ID */}
        //         <Route path={`${TAP}:user_id/*`} element={<Layout path="tap" />} />
        //     </Routes>
        // </BrowserRouter>
    );
}

export default App;
