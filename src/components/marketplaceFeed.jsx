import { useState } from "react";
import PropTypes from "prop-types";
import MarketplacePost from "./marketplacePost.jsx";
import { ModalPostForm } from "./modalPostForm.jsx";

export const MarketplaceFeed = ({ home }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className="bg[#fcfcfc] min-h-screen py-6">
        {/* Botón para vender algo */}
            <div className="fixed bottom-5 right-5">
                <button
                    onClick={openModal}
                    className="bg-blue-500 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition duration-300"
                    aria-label="Agregar publicación"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
        </div>

        <div>
            
        </div>
        <div className="container mx-auto p-4 space-y-6">
            {home.map((post) => (
            <MarketplacePost
                key={post.id_post}
                id={post.id_post}
                image={post.images[0]}
                title={post.title}
                description={post.description}
                price={post.price}
                last_price={post.last_price}
                actual_price={post.actual_price}
                seller_name={post.seller_name}
                seller_photo={post.seller_photo}
                date_expired={post.date_expired}
            />
            ))}
        </div>

        {/* Modal para agregar post */}
        <ModalPostForm isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
    };

    MarketplaceFeed.propTypes = {
    home: PropTypes.arrayOf(
        PropTypes.shape({
        id_post: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        last_price: PropTypes.number.isRequired,
        actual_price: PropTypes.number.isRequired,
        seller_name: PropTypes.string.isRequired,
        seller_photo: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default MarketplaceFeed;
