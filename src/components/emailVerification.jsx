import  { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export const EmailVerification = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');

        axios.get(`https://backend-auction-sigma.vercel.app/verify-email?token=${token}`)
            .then(response => {
                response
                setMessage('¡Tu correo electrónico ha sido verificado con éxito!');
            })
            .catch(error => {
                console.error('Error al verificar el correo electrónico:', error);
                setMessage('El enlace de verificación es inválido o ha expirado.');
            });
    }, [location]);

    return (
        <div className='w-[50%] h-[50%] m-auto text-[#292929]'>
            <h2>Verificación de Correo Electrónico</h2>
            <p>{message}</p>
        </div>
    );
};


