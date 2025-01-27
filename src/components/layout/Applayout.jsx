import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { SearchProvider } from "../../API/Context"
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Applayout = () => {
    return <>
        <ScrollToTop />
        <SearchProvider>
            <Header />
            <Outlet />
            <Footer />
        </SearchProvider>
    </>
}

const ScrollToTop = () => {
    const { pathname } = useLocation(); // Gets the current route path

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page
    }, [pathname]); // Runs whenever the route changes

    return null; // This component doesn't render anything
};

export default Applayout