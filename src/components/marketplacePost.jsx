
import PropTypes from 'prop-types';
import ExpandableText from './ExpandableText.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const MarketplacePost = ({ id, image, title, description, price, last_price, actual_price, seller_name, seller_photo }) => {
    const [lastBidder, setLastBidder] = useState(last_price);
    const [highestBid, setHighestBid] = useState(actual_price == 0 ? price : actual_price);
    const [newBid, setNewBid] = useState('');
    const [timeRemaining, setTimeRemaining] = useState(3600); // 1 hour in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        if (parseFloat(newBid) > highestBid) {
            setLastBidder(highestBid);
            setHighestBid(parseFloat(newBid));
            setNewBid('');
            axios.post(`https://backend-auction-sigma.vercel.app//changeBid`, {
                postId: id,
                lastPrice: parseFloat(highestBid),
                actualPrice: parseFloat(newBid),
            })
            .then(response => {
                if (response.status === 200) {
                    console.log('Bid placed successfully');
                } else {
                    console.error('Error placing bid');
                }
            })
            .catch(error => {
                console.error('Error placing bid:', error);
            });
        } else {   
            alert('Your bid must be higher than the current highest bid.');
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="bg-white w-full text-[#292929] shadow-md md:w-[45%] rounded-lg p-4 mb-4">
            <div className='flex items-center mb-4'>
                <img src={`http://localhost:3000${seller_photo}`} alt={seller_name} className="w-13 h-13 rounded-full object-cover"/>
                <span className="ml-5 text-[1.2em]">{seller_name}</span>
            </div>
            <img src={`http://localhost:3000${image}`} alt={title} className="w-full h-48 object-cover rounded-md mb-4"/>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <ExpandableText text={description} maxLength={100} />
            <div className="flex flex-col justify-between mb-4 mt-5">
                <span className="text-lg font-semibold text-blue-600">starting price: ${price}</span>
                <span>previous price: {lastBidder}</span>
                <span className="text-lg font-semibold text-blue-600">current price: ${highestBid}</span>
                <span className="text-sm text-gray-500">Time remaining: {formatTime(timeRemaining)}</span>
            </div>
            <form onSubmit={handleBidSubmit} className="mb-4 mt-7 ">
                <input
                    type="number"
                    value={newBid}
                    onChange={(e) => setNewBid(e.target.value)}
                    className=" p-2 border rounded-md mb-2"
                    placeholder="Enter your bid"
                />
                <button type="submit" className="bg-blue-500 ml-5 text-white px-4 py-2 rounded-md hover:bg-blue-600">Place Bid</button>
            </form>
            
        </div>
    );
};

export default MarketplacePost;


MarketplacePost.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    sellerName: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    last_price: PropTypes.number.isRequired,
    actual_price: PropTypes.number.isRequired,
    seller_name: PropTypes.string.isRequired,
    seller_photo: PropTypes.string.isRequired,
}