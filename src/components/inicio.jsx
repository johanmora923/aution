import { NavBarInicio } from "./navbarInicio.jsx"
import  LiveChat  from "./LiveChat.jsx"
import { useState,  useEffect } from "react";
import { Profile } from "./profile.jsx";
import { MarketplaceFeed } from "./marketplaceFeed.jsx"
import axios from 'axios';

export const Inicio = () =>{
    const [activeComponent, setActiveComponent] = useState('home');
    const [posts, setPosts] = useState([])
    const [myAuctions, setMyAuctions] = useState([])

    const handleChatClick = () => {
        setActiveComponent('chat');
    };

    const handleAuctionClick = () => {
        setActiveComponent('myAuctions');
    };
    
    const handleProfilClick = () => {
        setActiveComponent('profile');
    };

    const handlePostClick = () => {
        setActiveComponent('home')
    }
    
    useEffect(() => {
        try{
            axios.get('https://backend-auction.onrender.com/posts')
        .then(Response => {
            setPosts(Response.data)
        })
        }catch (error){
            console.error('cannot get the Auctions',error)
        }
        
    },[])

    useEffect(() => { 
        const id = window.localStorage.getItem('id')
        try{
            axios.get(`https://backend-auction.onrender.com/myPosts?id=${id}`)
        .then(Response => {
            setMyAuctions(Response.data)
        })
        }catch (error){
            console.error('cannot get the Auctions',error)
        }
    },[])



    const senderID = parseInt(window.localStorage.getItem('id'))

    return(
        <div className="bg-[#fcfcfc] ">
            <NavBarInicio onChatClick={handleChatClick} onAuctionClick={handleAuctionClick} onProfilClick={handleProfilClick} onPostClick={handlePostClick}/>
            <div className={`md:ml-65 h-full bg-[#fcfcfc]`}>
                {activeComponent === 'chat' && <LiveChat sender_id={senderID}/>}
                {activeComponent === 'profile' && <Profile />}
                {activeComponent === 'home'   && <MarketplaceFeed home={posts}/>}
                {activeComponent === 'myAuctions' && <MarketplaceFeed home={myAuctions}/>}
            </div> 
        </div>
    )
}