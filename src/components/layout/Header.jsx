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


    const activeBtn = "md:py-2 md:px-3 !py-1 px-2 rounded-full flex items-center shadow__btn !text-white !bg-transparent"
    
    return (
        <div className={`w-full md:h-20 bg-[rgb(22,22,22)] md:flex md:items-center md:justify-between md:px-14 rounded-b-3xl grid px-3 grid-cols-2 h-max gap-y-3 items-end py-4`}>

            <h1 className="font-Galada text-4xl text-white"><span className="text-purple-500">Yoo</span>Movies</h1>

            {showSearch && <Search/>}

            <ul className="flex justify-center items-center gap-0 md:gap-10 h-full font-bold text-base text-white md:text-2xl" style={{textShadow:'0px 0px 4px white'}}>
                <li onClick={()=>handleClick()}>
                    <NavLink to="/" className={({isActive})=>  `${isActive ? 'active ' : ''}  ${activeBtn}`}>Movies</NavLink>
                </li>
                <li onClick={()=>handleClick()}>
                    <NavLink to="/webseries" className={({isActive})=>  `${isActive ? 'active' : ''} whitespace-nowrap ${activeBtn}`}>Web Series</NavLink>
                </li>
                
            </ul>

        </div>
        )
}

export default Header