import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const ModalPostForm = ({ isOpen, onClose }) => {
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

        axios.post('http://localhost:3000/newPost', data)
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
        <div className="fixed text-[#292929] inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Crear Publicación</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Imágenes:</label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Título de la publicación"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Descripción:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Descripción de la publicación"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Precio:</label>
                        <input
                            type="decimal"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            placeholder="Precio en USD"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

ModalPostForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};
