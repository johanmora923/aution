import { useState, useCallback } from "react";
import io from 'socket.io-client';

const backendUrl = 'https://backend-auction.onrender.com';

const socket = io(`${backendUrl}`, {
    transports: ['websocket', 'polling'], 
    withCredentials: true 
});


export const RealTimeStatistics = () => {
    const [articles, setArticles] = useState([]);
    const [offers, setOffers] = useState([]);
    const [bids, setBids] = useState([]);

    useCallback(() => {
        // Lógica para obtener los artículos más populares
        socket.on('popular-articles', (data) => {
            setArticles(data);
        });
    }, []);

    useCallback(() => {
        // Lógica para obtener las ofertas recientes
        socket.on('recent-offers', (data) => {
            setOffers(data);
        });
    },[]);

    useCallback(()=>{
        // Lógica para obtener las subastas por finalizar
        socket.on('ending-bids', (data) => {
            setBids(data);
        });
    },[]);
    console.log(articles)
    console.log(offers) 
    console.log(bids)

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md w-full md:w-[80%] lg:w-[60%] mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">Estadísticas en Tiempo Real</h2>
        {/* Artículos más populares */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Artículos más populares</h3>
                <ul className="space-y-3" >
                    {/* Placeholder para los artículos */}
                    {articles.map(article => (
                        <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center" key={article.id}>
                            <span className="text-gray-700 font-medium">{article.name}</span>
                            <span className="text-gray-500 text-sm">{article.price}</span>
                        </li>
                    ))}
                </ul>
        </div>
        {/* Ofertas recientes */}
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-green-600 mb-4">Ofertas recientes</h3>
            <ul className="space-y-3">
            {/* Placeholder para las ofertas */}
            {offers.map(offer => (
            <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center" key={offer.id}>
                <span className="text-gray-700 font-medium">{offer.user}</span>
                <span className="text-gray-500 text-sm">Ofertó {offer.amount} {offer.article}</span>
            </li>
            ))}
            </ul>
        </div>
        {/* Subastas por finalizar */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Subastas por finalizar</h3>
                <ul className="space-y-3">
                    {/* Placeholder para las subastas */}
                {bids.map(bid =>(
                    <li className="p-3 bg-white shadow rounded-lg flex justify-between items-center" key={bid.id}>
                        <span className="text-gray-700 font-medium">{bid.article}</span>
                        <span className="text-gray-500 text-sm">{bid.article}</span>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
};

export default RealTimeStatistics;
