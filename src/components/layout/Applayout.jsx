import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import Header from "./Header"
import { SearchProvider } from "../../API/Context"

const Applayout = () => {
    return <>
        <SearchProvider>
            <Header />
            <Outlet />
            <Footer />
        </SearchProvider>
    </>
}

export default Applayout