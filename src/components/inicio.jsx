import { NavBarInicio } from "./navbarInicio.jsx"
import  LiveChat  from "./LiveChat.jsx"
import { useState,  useEffect } from "react";
import { Profile } from "./profile.jsx";
import { MarketplaceFeed } from "./marketplaceFeed.jsx"
import axios from 'axios';
import RealTimeStatistics from "./realTimeStatistics.jsx";

export const Inicio = () =>{
    const [activeComponent, setActiveComponent] = useState('home');
    const [posts, setPosts] = useState([])
    const [myAuctions, setMyAuctions] = useState([])
    const backendLink = 'https://backend-auction.onrender.com'

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
            axios.get(`${backendLink}/posts`)
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
            axios.get(`${backendLink}/myPosts?id=${id}`)
        .then(Response => {
            setMyAuctions(Response.data)
        })
        }catch (error){
            console.error('cannot get the Auctions',error)
        }
    },[])



    const senderID = parseInt(window.localStorage.getItem('id'))

    return(
        <div className="bg-gray-50 min-h-screen ">
            <NavBarInicio
                onChatClick={handleChatClick}
                onAuctionClick={handleAuctionClick}
                onProfilClick={handleProfilClick}
                onPostClick={handlePostClick}
            />
            <div className="md:ml-64 h-full bg-gray-50 transition-all ease-in-out">
                {activeComponent === 'chat' && (
                <section
                    className="p-4"
                    aria-labelledby="chat-section"
                >
                    <h2 id="chat-section" className="sr-only">Live Chat</h2>
                    <LiveChat sender_id={senderID} />
                </section>
                )}
                {activeComponent === 'profile' && (
                <section
                    className="p-4"
                    aria-labelledby="profile-section"
                >
                    <h2 id="profile-section" className="sr-only">Profile</h2>
                    <Profile />
                </section>
                )}
                {activeComponent === 'home' && (
                <section
                    className="flex"
                    aria-labelledby="home-section"
                >
                    <MarketplaceFeed home={posts} />
                    <RealTimeStatistics />

                </section>
                )}
                {activeComponent === 'myAuctions' && (
                <section
                    className="p-4 flex"
                    aria-labelledby="auctions-section"
                >
                    <h2 id="auctions-section" className="sr-only">My Auctions</h2>
                    <MarketplaceFeed home={myAuctions} />
                    <RealTimeStatistics />
                </section>
                )}
            </div>
    </div>

    )
}