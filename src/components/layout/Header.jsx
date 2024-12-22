import { NavLink, useLocation } from "react-router-dom"
import Search from "../Ui/Search"
import { useContext } from "react";
import { SearchContext } from "../../API/Context";

const Header = () => {
    const location = useLocation();
    const showSearch = location.pathname === '/' || location.pathname === '/webseries';
    const{currentPage, setCurrentPage} = useContext(SearchContext);

    const handleClick = ()=>{
        setCurrentPage(1)
    }


    const activeBtn = "md:py-2 md:px-3 py-0 px-2 rounded-full flex items-center"
    
    return (
        <div className={`w-full md:h-20 bg-zinc-800 md:flex md:items-center md:justify-between md:px-14 rounded-b-3xl grid px-3 grid-cols-2 h-max gap-y-3 items-end py-4`}>

            <h1 className="text-white font-Galada text-4xl"><span className="text-violet-500">Yoo</span>Movies</h1>

            {showSearch && <Search/>}

            <ul className="flex justify-center items-center md:gap-10 gap-0 text-white md:text-2xl text-base h-full font-bold" style={{textShadow:'0px 0px 4px white'}}>
                <li onClick={()=>handleClick()}>
                    <NavLink to="/" className={({isActive})=>  `${isActive ? 'bg-violet-600' : ''} ${activeBtn}`}>Movies</NavLink>
                </li>
                <li onClick={()=>handleClick()}>
                    <NavLink to="/webseries" className={({isActive})=>  `${isActive ? 'bg-violet-600' : ''} ${activeBtn}`}>Web Series</NavLink>
                </li>
                
            </ul>

        </div>
        )
}

export default Header