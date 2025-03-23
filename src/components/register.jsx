import
{ useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaApple } from 'react-icons/fa'


export const Register = () => {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('https://backend-project-a.vercel.app/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, password, email }),
        })
        console.log('user:', user);
        console.log('Password:', password);
        console.log('Email:', email);
        if (res.ok) {
            console.log('Register success');
        } else {
            console.log('Register failed',res);
        }
    }
    const handleAppleSubmit = () =>{
        console.log()
    }

    const handleGoogleSubmit = () =>{
        console.log()
    }

    return(
        <div className="bg-gray-100 w-full min-h-screen  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="mt-5 mb-5 bg-white w-full max-w-md md:max-w-lg lg:max-w-xl rounded-xl shadow-lg p-6 sm:p-8">
            <div className="flex flex-col items-center">
                <img
                className="w-24 sm:w-28 md:w-36 h-auto mb-6"
                src="/icono.png"
                alt="Logo de la aplicación"
                />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">
                Create an account
                </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                onClick={handleGoogleSubmit}
                className="flex items-center justify-center bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-1/2 text-sm font-medium hover:bg-gray-200 transition"
                aria-label="Sign in with Google">
                <FaGoogle className="mr-2" color="#4285f4" />
                Google
                </button>
                <button
                onClick={handleAppleSubmit}
                className="flex items-center justify-center bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 w-full sm:w-1/2 text-sm font-medium hover:bg-gray-200 transition"
                aria-label="Sign in with Apple">
                <FaApple className="mr-2" />
                Apple
                </button>
            </div>
            <div className="flex items-center w-full mb-6" role="separator">
                <div className="h-px flex-grow bg-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">Or use Email</span>
                <div className="h-px flex-grow bg-gray-300"></div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="user" className="block text-sm font-medium text-gray-700">
                Username
                </label>
                <input
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                aria-required="true"
                />
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                </label>
                <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                aria-required="true"
                />
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
                aria-required="true"
                />
                <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
                Submit
                </button>
            </form>
            <p className="text-sm text-gray-600 mt-6 text-center">
                Already have an account?{' '}
                <Link
                className="text-indigo-600 font-medium hover:underline"
                to="/"
                aria-label="Navigate to the sign-in page">
                Sign in here
                </Link>
            </p>
            </div>
        </div>

    )
}