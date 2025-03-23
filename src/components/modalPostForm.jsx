import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const ModalPostForm = ({ isOpen, onClose }) => {
    const backendLink = 'https://backend-auction.onrender.com'
    const [formData, setFormData] = useState({
        images: [],
        title: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'images') {
            setFormData({
                ...formData,
                images: files,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const seller_Id = window.localStorage.getItem('id');
        const data = new FormData();
        for (const key in formData) {
            if (key === 'images') {
                for (let i = 0; i < formData.images.length; i++) {
                    data.append('images', formData.images[i]);
                }
            } else {
                data.append(key, formData[key]);
            }
        }
        data.append('seller_id', seller_Id); // Añadir seller_id a la solicitud

        axios.post(`${backendLink}/newPost`, data)
            .then((response) => {
                console.log('Post guardado:', response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error al guardar el post:', error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed text-[#292929] inset-0 flex items-center justify-center bg-gray-900/50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl transform scale-100 transition-transform duration-300">
                {/* Header del modal */}
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-3xl font-bold text-gray-900">Crear Publicación</h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-red-500 transition duration-300 text-2xl focus:outline-none"
                    aria-label="Cerrar modal"
                >
                    &times;
                </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit}>
                {/* Campo para imágenes */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Imágenes:</label>
                    <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Seleccionar imágenes"
                    />
                    <p className="text-sm text-gray-500 mt-2">Puedes cargar hasta 5 imágenes.</p>
                </div>

                {/* Campo para el título */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Título:</label>
                    <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Escribe el título aquí..."
                    aria-label="Escribe el título"
                    />
                </div>

                {/* Campo para la descripción */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Descripción:</label>
                    <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe los detalles de tu publicación..."
                    aria-label="Describe tu publicación"
                    />
                </div>

                {/* Campo para el precio */}
                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">Precio (USD):</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Introduce el precio..."
                    aria-label="Escribe el precio"
                    />
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end space-x-3">
                    <button
                    type="button"
                    onClick={onClose}
                    className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition duration-300 focus:outline-none"
                    aria-label="Cancelar publicación"
                    >
                    Cancelar
                    </button>
                    <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-300 focus:outline-none"
                    aria-label="Guardar publicación"
                    >
                    Publicar
                    </button>
                </div>
                </form>
            </div>
            </div>

    )
};

ModalPostForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
