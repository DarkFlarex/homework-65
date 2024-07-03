import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import PageItem from "./components/Page/PageItem";
import Toolbar from "./components/Toolbar/Toolbar/Toolbar";

const App: React.FC = () => {
    return (
        <>
            <header>
                <Toolbar />
            </header>
            <main className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/pages/home" />} />
                    <Route path="/pages/:pageName" element={<PageItem />} />
                    <Route path="*" element={<h1>Not found!</h1>} />
                </Routes>
            </main>
        </>
    );
};

export default App;
