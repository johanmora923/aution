import '../App.css';
import { FaLandmark } from "react-icons/fa";
import {  FcVoicePresentation, FcSms } from "react-icons/fc";
import { BiBell } from "react-icons/bi";
import PropTypes from 'prop-types';
import { SiHomeassistantcommunitystore } from "react-icons/si";

export const NavBarInicio = ({ onChatClick, onAuctionClick, onProfilClick, onPostClick }) => {
    const profilePhoto = window.localStorage.getItem('photo');
    const userLocalStorage = window.localStorage.getItem('userLocalStorage');
    

    return (
        <nav className="flex fixed bottom-0 left-0 right-0  bg-[#f5f5f6] border border-solid border-[#1111] z-50   md:left-auto md:right-auto md:w-65 md:h-[100%] md:flex md:flex-col  md:fixed  md:bottom-0 md:z-50 ">
            <div className="flex hidden h-12 w-[80%] m-auto mt-3 items-center md:w-auto md:mt-1 md:mb-2 md:flex">
                <img src="/auction.png" alt="auction logotype" className='hidden md:block md:mt-3 md:w-[200px]' />
            </div>
            <div className='flex flex-row h-auto w-[70%] justify-around md:flex-col md:space-y-4 md:mt-4 md:ml-4'>
                <div
                    className="text-[#7b8290] flex items-center md:w-auto md:mt-[20%] hover:text-[#292929]"
                    onClick={onPostClick}
                >
                    <SiHomeassistantcommunitystore className="mr-2 size-6" />
                    <span className="hidden md:inline ml-1">Inicio</span>
                </div>
                <div
                    className="text-[#7b8290] flex items-center md:w-auto md:mt-[15%] hover:text-[#292929]  "
                    onClick={onAuctionClick}
                >
                    <FcVoicePresentation className='mr-2 size-6' />
                    <span className="hidden md:inline">My Auction</span>
                </div>
                <div
                    className="text-[#7b8290] flex items-center md:w-auto md:mt-[15%] hover:text-[#292929]"
                    onClick={onChatClick}
                >
                    <FcSms className='mr-2 size-6' />
                    <span className="hidden md:inline">Chat</span>
                </div>
                <div
                    className="text-[#7b8290] flex items-center md:w-auto md:mt-[15%] hover:text-[#292929]"
                    onClick={onAuctionClick}
                >
                    <FaLandmark className='mr-2 size-6' />
                    <span className="hidden md:inline">Auction</span>
                </div>
            </div>
            <div className='flex w-[30%] md:flex-col md:mt-53 md:ml-4  '>
                <div
                    className="text-[#7b8290] ml-auto flex items-center md:w-auto hover:text-[#292929]"
                    onClick={onAuctionClick}
                >
                    <BiBell className='mr-2' />
                    <span className="hidden md:inline">Notification</span>
                </div>
                <div
                    className='flex items-center mb-1 mt-2 md:w-auto md:mt-4 hover:text-[#292929]'
                    onClick={onProfilClick}
                >
                    <img src={profilePhoto}
                        alt="user photo"
                        className='h-[34px] w-[36px] mr-3 rounded-[50px] border border-solid border-[green] '
                        onError={(e) => { e.target.onerror = null; e.target.src = "/default-profile.png"; }}
                    />
                    <h3 className='text-[#89909c] ml-3 hidden md:inline hover:text-[#292929]'>{userLocalStorage}</h3>
                </div>
            </div>
        </nav>
    );
}

NavBarInicio.propTypes = {
    onChatClick: PropTypes.func.isRequired,
    onAuctionClick: PropTypes.func.isRequired,
    onProfilClick: PropTypes.func.isRequired,
    onPostClick: PropTypes.func.isRequired
}