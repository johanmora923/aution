import {  useState } from 'react';
import PropTypes from 'prop-types';
import MarketplacePost from './marketplacePost.jsx';
import { ModalPostForm } from './modalPostForm.jsx';





export const MarketplaceFeed = ({ home }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    return (
        <div>
            <div className='flex '>
                <button onClick={openModal} className=" ml-auto mr-3 mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >vender algo
                </button>
            </div>
            <div className="container mx-auto p-4 ">
            {home.map(post => (
                <MarketplacePost
                    key={post.id_post}
                    id={post.id_post}
                    image={post.images[0]}
                    title={post.title}
                    description={post.description}
                    price={post.price}
                    last_price={post.last_price}
                    actual_price={post.actual_price}
                    sellerId={post.seller_Id}
                    seller_name={post.seller_name}
                    seller_photo={post.seller_photo}
                />
            ))}
            </div>
            <ModalPostForm isOpen={isModalOpen} onClose={closeModal} />
        </div>

    );
};

// Agregar validación de PropTypes
MarketplaceFeed.propTypes = {
    home: PropTypes.arrayOf(PropTypes.shape({
        id_post: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        sellerId: PropTypes.number.isRequired,
    })).isRequired,
};

export default MarketplaceFeed;
