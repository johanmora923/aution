
import Proptypes from 'prop-types';
import '../App.css';

export const  Navbar = ({children}) => {
    const LogoPage = '/logo.png'
    const handleToggleMenu = ()=>{

    }

    return(
        <nav className="flex items-center justify-between flex-wrap bg-gray-50 p-4 sm:p-6 shadow-md ">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
                <img
                className="w-24 h-16 sm:w-28 sm:h-20"
                src={LogoPage}
                alt="Logo of the application"
                />
            </div>
            <button
                className="block sm:hidden text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle navigation menu"
                onClick={handleToggleMenu}>
                <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                />
                </svg>
            </button>
            <div className="hidden sm:flex sm:items-center sm:justify-end w-full sm:w-auto" id="menu">
                {children}
            </div>
            </nav>

    )   
}

Navbar.propTypes = {
    children: Proptypes.node.isRequired
}