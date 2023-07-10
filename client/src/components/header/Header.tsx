import {NavLink, useLocation} from "react-router-dom";
import {useMemo, useState} from "react";
import {useUserStore} from "../../store/userStores/useUserStore.ts";
import {guestNavRouters, userNavRouters} from "./headerRouters.ts";
import {TNavRouters} from "../../utils/types.ts";

const Header = () => {

    const {pathname} = useLocation();

    const {token, handleLogout} = useUserStore(store => store);

    const [visibleNavMobile, setVisibleNavMobile] = useState("hidden");

    const handleChangeVisibleNavMenu = () => {
        setVisibleNavMobile(prev => prev === "hidden" ? "visible" : "hidden")
    }

    const routersOnNavBarHeader = useMemo((): TNavRouters[] => {
        if (!!token) {
            return userNavRouters;
        }
        return guestNavRouters;
    }, [token]);


    return (
        <header>
            <nav className="bg-gray-900 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <NavLink to="/" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Budget</span>
                    </NavLink>
                    <div className="flex items-center lg:order-2">
                        {!token ?
                          <>
                            <NavLink to="/login" className={`${pathname === "/login" && "bg-amber-50"} text-gray-400 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 `}>Log
                                                                                                                                                                                                                                                                                                                          in
                            </NavLink>
                            <NavLink to="/register" className={`${pathname === "/register" && "bg-amber-50"} text-gray-400 dark:text-white hover:bg-gray-50 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 `}>Sign
                            </NavLink>
                          </>
                            :
                            <button onClick={handleLogout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700">Logout</button>
                        }
                        {token &&
                          <button onClick={handleChangeVisibleNavMenu} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                            </svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </button>
                        }
                    </div>
                    {token &&
                      <div className={`${visibleNavMobile} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {routersOnNavBarHeader.map(({name, path}) => (
                                <NavLink key={path} to={path} className={`${pathname === path ? "text-amber-50" : "text-gray-600"} block py-2 pr-4 pl-3 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white`}>
                                    {name}
                                </NavLink>
                            ))}
                        </ul>
                      </div>
                    }
                </div>
            </nav>
        </header>
    )
}

export default Header