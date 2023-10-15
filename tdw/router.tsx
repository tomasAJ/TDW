import { Route, Routes } from "react-router-dom";
import Home from "./src/pages/Home/Home";
// import ErrorPage from "./src/pages/ErrorPage";

const RouterApp = () => {
    return <LogedInRoutes />;
};


const LogedInRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path='*' element={<ErrorPage />} /> */}
            </Routes>
        </>
    );
};
export default RouterApp;