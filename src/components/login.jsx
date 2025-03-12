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
        <div className='bg-transparent w-full  flex flex-col items-center justify-center min-w-[375px]'>
            <div className='bg-transparent w-90 md:w-110 h-auto m-auto  '>
            <div className='flex flex-col bg-[#fdfdfd] m-auto mt-10 rounded-[20px] text-[#110f0f] w-90 md:w-110 h-250] mb-10'>
                <img className='w-[100px] md:w-[150px]  mt-2 h-
                [80px] md:h-100px m-auto ' src="/icono.png" alt="logo" />
                <h2 className='m-auto  text-xl'>sign into your account</h2>
                <div className='m-auto flex flex-row justify-around '>
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center
                        justify-center bg-[#dddd] text-[#110f0f] p-2 rounded mt-4 mr-2 text-[14px] w-[50%]">
                        <FaGoogle className="mr-2 justify-between" color='#4285f4' />Sign in with Gmail
                    </button>
                    <button
                        onClick={handleAppleLogin}
                        className="flex items-center  justify-center bg-[#dddd] text-[#110f0f] p-2 rounded w-[50%] mt-4 text-[14px] ">
                        <FaApple className="mr-2" />Sign in with Apple
                    </button>
                </div>
                <div className='flex flex-row items-center  mt-3 w-[95%] m-auto justify-between'>
                    <div className='bg-[#1111] w-35 h-0.5 rounded-[50px]'></div>
                    <span className='text-xs ml-1 mr-1 text-gray-600 w-30 text-center' >Or use Email</span>
                    <div  className='bg-[#1111] w-35 h-0.5 rounded-[50px]'></div>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col'  >
                    <div className='w-[90%] m-auto mt-8 '>
                        <input
                            type="text"
                            id="email"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            required
                            placeholder='user'
                            className='h-12 w-[100%] outline-none border-b border-b-gray-300  '
                        />
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder='password'
                            className='h-12 outline-none w-[100%]   '
                        />
                    </div>
                    <div className='mt-3 m-auto flex w-full justify-around'>
                        <div>
                            <input 
                        type="checkbox" 
                        name="remenberDevice" id="remenberDevise" 
                        className=''
                        />
                        <label 
                        htmlFor="remenberDevice"
                        className='text-sm text-gray-500'
                        >Remenber me on this device</label> 
                        </div>
                        <a className=' text-gray-500 text-sm' href=""
                        >
                            forgot password?
                        </a>
                    </div>
                    <button  
                    className='bg-[#292929] text-[#fdfdfd] w-[50%] h-10  m-auto  rounded-[15px] mt-7 hover:bg-[#000]  ' 
                    type="submit">
                        sign in
                    </button>
                </form>
                <p className='m-auto mt-5 mb-5 text-gray-600'>
                    Not a member? <Link className='text-[#110f0f]' to="/register">Registrate aqui</Link>
                </p>
            </div>
        </div>
    </div>
        
    )
};

export default Login;