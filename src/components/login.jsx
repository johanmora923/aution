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
        <div className="w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 h-screen">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl bg-transparent">
                <div className="flex flex-col bg-[#fdfdfd] rounded-[20px] text-[#110f0f] shadow-lg p-6 sm:p-8">
                    <img
                    className="w-[80px] md:w-[120px] lg:w-[150px] mx-auto mb-4"                        
                    src="/icono.png"
                    alt="logo"
                    />
                    <h2 className="text-center text-xl font-medium mb-4">Sign into your account</h2>            
                    <div className="flex justify-between gap-3">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex items-center justify-center bg-gray-200 text-black p-2 rounded w-full text-sm md:text-base">
                            <FaGoogle className="mr-2" color="#4285f4" />
                                Sign in with Gmail
                        </button>
                        <button
                            onClick={handleAppleLogin}
                            className="flex items-center justify-center bg-gray-200 text-black p-2 rounded w-full text-sm md:text-base">
                            <FaApple className="mr-2" />
                                Sign in with Apple
                        </button>
                    </div>
                    <div className="flex items-center my-4">
                        <div className="flex-grow h-[1px] bg-gray-300"></div>
                        <span className="mx-4 text-gray-600 text-xs">Or use Email</span>
                        <div className="flex-grow h-[1px] bg-gray-300"></div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                        type="text"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        placeholder="Username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                        />
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-400"
                        />
                        <div className="flex justify-between text-sm">
                            <label className="flex items-center">
                                <input type="checkbox" className="mr-1" />
                                Remember me
                            </label>
                            <a href="/" className="text-gray-500">
                                Forgot password?
                            </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                                Sign in
                            </button>
                            </form>
                            <p className="text-center text-sm text-gray-600 mt-4">
                                Not a member?{' '}
                                <Link to="/register" className="text-black font-medium">
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
    )
};

export default Login;