
import Proptypes from 'prop-types';
import '../App.css';

export const  Navbar = ({children}) => {
    const LogoPage = '/logo.png'

    return(
        <nav className='flex items-center justify-between flex-wrap bg-[#fcfcfc] p-1  min-w-[375px]'>
            <div className='flex items-center flex-shrink-0 text-white mr-6'>
            <img className='w-[90px] h-[70px]' src={LogoPage} alt="Logo"/>
            </div>
            <div>
                {children}
            </div>
        </nav>
    )   
}

Navbar.propTypes = {
    children: Proptypes.node.isRequired
}