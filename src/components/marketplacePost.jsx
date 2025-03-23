import PropTypes from "prop-types";
import ExpandableText from "./ExpandableText.jsx";
import { useState, useEffect } from "react";
import axios from "axios";

export const MarketplacePost = ({
    id,
    image,
    title,
    description,
    price,
    last_price,
    actual_price,
    seller_name,
    seller_photo,
    date_expired
    }) => {
    const [lastBidder, setLastBidder] = useState(last_price);
    const [highestBid, setHighestBid] = useState(actual_price === 0 ? price : actual_price);
    const [newBid, setNewBid] = useState("");
    const [timeRemaining, setTimeRemaining] = useState(''); // 1 hour in seconds
    const backendLink = "https://backend-auction.onrender.com";

    useEffect(() => {
        setTimeRemaining(date_expired);
    }, [date_expired]);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        const parsedBid = parseFloat(newBid);

        // Validaciones adicionales
        if (!newBid || isNaN(parsedBid)) {
        alert("Por favor, introduce una cantidad válida.");
        return;
        }

        if (parsedBid <= highestBid) {
        alert("Tu oferta debe ser mayor que la oferta actual.");
        return; 
        }

        try {
            const response = await axios.post(`${backendLink}/changeBid`, {
            postId: id,
            lastPrice: highestBid,
            actualPrice: parsedBid,
            idUser: window.localStorage.getItem("id"),
        });

        if (response.status === 200) {
            setLastBidder(highestBid);
            setHighestBid(parsedBid);
            setNewBid("");
            alert("¡Oferta realizada con éxito!");
        } else {
            console.error("Error al realizar la oferta");
            alert("Hubo un problema al procesar tu oferta. Inténtalo de nuevo.");
        }
        } catch (error) {
        console.error("Error al realizar la oferta:", error);
        alert("Error al conectar con el servidor. Inténtalo más tarde.");
        }
    };

    return (
        <div className="bg-white text-gray-800 shadow-lg rounded-lg p-6 mb-6 md:min-w-[400px]  md:w-[45%] transition duration-300 hover:shadow-xl">
        {/* Seller Info */}
        <div className="flex items-center mb-4">
            <img
            src={`${backendLink}${seller_photo}`}
            alt={`Foto de ${seller_name}`}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
            <span className="ml-4 font-medium text-lg">{seller_name}</span>
        </div>

        {/* Post Image */}
        <img
            src={`${backendLink}${image}`}
            alt={title}
            className="w-full h-56 object-cover rounded-lg mb-4"
        />

        {/* Post Title and Description */}
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <ExpandableText text={description} maxLength={120} />

        {/* Price Details */}
        <div className="flex flex-col mt-4 text-sm">
            <span className="font-semibold text-blue-600 text-lg">Starting price: ${price}</span>
            <span className="text-gray-600">Previous price: ${lastBidder}</span>
            <span className="font-semibold text-blue-600 text-lg">Current price: ${highestBid}</span>
            <span className="text-sm text-gray-500">Time remaining:{timeRemaining}</span>
        </div>

        {/* Bidding Form */}
        <form onSubmit={handleBidSubmit} className="mt-6">
            <div className="flex items-center gap-4">
            <input
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your bid"
                aria-label="Enter your bid"
            />
            <button
                type="submit"
                className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Place Bid
            </button>
            </div>
        </form>
        </div>
    );
};

MarketplacePost.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    last_price: PropTypes.number.isRequired,
    actual_price: PropTypes.number.isRequired,
    seller_name: PropTypes.string.isRequired,
    seller_photo: PropTypes.string.isRequired,
    date_expired: PropTypes.string.isRequired,
};


export default MarketplacePost