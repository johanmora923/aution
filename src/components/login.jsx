import  { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { FaGoogle, FaApple } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleGoogleLogin = () => {
        // Lógica para iniciar sesión con Google
        console.log('Iniciar sesión con Google')
    }

    const handleAppleLogin = () => {
        // Lógica para iniciar sesión con Apple
        console.log('Iniciar sesión con Apple')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://backend-project-a.vercel.app/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password }),
        })
        console.log('user:', user);
        console.log('Password:', password);
        if (res.ok) {
            const data = await res.json()
            console.log('Login success');
            window.localStorage.setItem( 'userLocalStorage', user )
            window.localStorage.setItem( 'id', data.id)
            window.localStorage.setItem('email', data.email)
            navigate('/inicio')
        } else {
            console.log('Login failed',res);
        }
    };


    return (
        <div className="w-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 h-screen bg-gray-100">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="flex flex-col items-center p-8">
            <img
                className="w-24 md:w-32 lg:w-40 mb-6"
                src="/icono.png"
                alt="logo"
            />
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
                Sign in to your account
            </h2>
            <div className="flex gap-4 mb-6 w-full">
                <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 w-1/2 text-sm font-medium hover:bg-gray-200 transition">
                <FaGoogle className="mr-2" color="#EA4335" />
                Google
                </button>
                <button
                onClick={handleAppleLogin}
                className="flex items-center justify-center bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 w-1/2 text-sm font-medium hover:bg-gray-200 transition">
                <FaApple className="mr-2" />
                Apple
                </button>
            </div>
            <div className="flex items-center w-full mb-6">
                <div className="h-px flex-grow bg-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">Or use Email</span>
                <div className="h-px flex-grow bg-gray-300"></div>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                    placeholder="Username"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
                </div>
                <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                />
                </div>
                <div className="flex justify-between items-center text-sm mb-6">
                <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                </label>
                <a href="/" className="text-indigo-600 hover:underline">
                    Forgot password?
                </a>
                </div>
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                Sign in
                </button>
            </form>
            </div>
            <div className="bg-gray-50 text-center py-4">
            <p className="text-sm text-gray-600">
                Not a member?{' '}
                <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                Register here
                </Link>
            </p>
            </div>
        </div>
    </div>
    )
};

export default Login;