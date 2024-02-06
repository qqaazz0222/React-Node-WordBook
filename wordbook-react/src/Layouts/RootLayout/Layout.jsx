import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Component";
import "./Style.css";

const RootLayout = () => {
    return (
        <div id="rootLayout">
            <Header />
            <Outlet />
        </div>
    );
};

export default RootLayout;
