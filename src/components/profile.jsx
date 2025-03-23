import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaUserEdit } from 'react-icons/fa'; 
import { MdEmail, MdMarkEmailRead, MdVerifiedUser  } from "react-icons/md";   
import { FcSms } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";



export const Profile = () => {
    const [user, setUser] = useState({
        profile_photo: '',
        name: '',
        email: '',
        residence: '',
        phone: '',
        isPhoneVerified: false
    });
    const [email, setEmail] = useState('');
    const [emailVerification, setEmailVerification] = useState(false);
    const [residence, setResidence] = useState('');
    const [phone, setPhone] = useState('');
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [updateModal, setUpdateModal] = useState('hidden');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const backendLink = "https://backend-auction.onrender.com";

    const requestEmailVerification = () => {
        const userId = window.localStorage.getItem('id');
        const email = window.localStorage.getItem('email'); // O como obtengas el email del usuario

        axios.post(`${backendLink}/request-email-verification`, { userId, email })
            .then(response => {
                (response.ok)
                setVerificationMessage('Se ha enviado un correo de verificación a tu dirección de email.');
            })
            .catch(error => {
                console.error('Error al solicitar verificación de correo:', error);
                setVerificationMessage('Hubo un error al enviar el correo de verificación.');
            });
    };

    useEffect(() => {
        // Fetch user data from the server
        axios.get(`${backendLink}/user/profile`, {
            params: { userId: window.localStorage.getItem('id') }
        })
            .then(response => {
                const userData = response.data;
                setUser(userData);
                setEmail(userData.email || '');
                setResidence(userData.residence || '');
                setPhone(userData.phone || '');
                if (userData.email_verified > 0) { setEmailVerification(true) }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    const handleUpdateProfile = () => {
        axios.post(`${backendLink}/user/update`, {
            userId: window.localStorage.getItem('id'),
            email,
            residence,
            phone
        })
            .then(response => {
                response
                console.log('Update successful');
                setIsEditing(false); // Close the edit form after updating
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    const handleVerifyPhone = () => {
        // Logic to verify phone number
        setIsPhoneVerified(true);
        alert('Phone number verified successfully');
    };

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleUploadProfilePhoto = () => {
        const formData = new FormData();
        formData.append('profile_photo', profilePhoto);
        formData.append('userId', window.localStorage.getItem('id'));

        axios.post(`${backendLink}/upload-profile-photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                response
                alert('Profile photo updated successfully');
                setUpdateModal('hidden');
                // Fetch updated user data
                axios.get(`${backendLink}/user/profile`, {
                    params: { userId: window.localStorage.getItem('id') }
                })
                    .then(response => {
                        const updatedUserData = response.data;
                        setUser(updatedUserData);
                        // Asegúrate de actualizar también el estado del perfil fotográfico
                        setProfilePhoto(null);
                    })
                    .catch(error => {
                        console.error('Error fetching updated user data:', error);
                    });
            })
            .catch(error => {
                console.error('Error uploading profile photo:', error);
            });
    };

    const handleUpdateModal = () => {
        setUpdateModal('flex');
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    window.localStorage.setItem('photo', user.profile_photo);

    return (
        <div className="flex bg-[#fcfcfc]  text-[#292929]">
            <div className='bg-[#fdfdfd] w-full m-auto ml-5 rounded-[10px]'>
                <div className="flex mb-4 mt-10">
                    <div className='flex m-auto border border-[#c9f0f8] border-[2px] rounded-full p-1 '>
                        <img
                            src={user.profile_photo}
                            alt="Profile"
                            className="w-38 h-38 rounded-full m-auto "
                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-profile.png"; }} // Fallback en caso de error
                            onClick={handleUpdateModal}
                        />
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <h3 className="text-[2.4em] text-center mt-3 mb-1 text-[#292929] font-semibold">{user.name}</h3>
                    <span className='text-[#292929] m-auto'>{user.residence}</span>
                    <button
                        onClick={handleEditClick}
                        className={`mt-4 bg-blue-500 text-white p-2 rounded ${isEditing ? 'hidden' : 'block'}`}
                    >
                        <FaEdit className="inline mr-2" /> Edit Profile
                    </button>
                    <div className="flex justify-between m-auto mt-5">
                        <button
                            onClick={handleUpdateProfile}
                            className={`bg-blue-500 text-white p-2 rounded ${isEditing ? 'block' : 'hidden'}`}
                            disabled={!isEditing}
                        >
                            Update Profile
                        </button>
                    </div>
                </div>
                {isEditing && (
                    <div className='flex flex-col mt-10 '>
                        <div className='flex flex-col mb-50 m-auto md:m-0'>
                            <div className='flex items-center'>
                                <FaUserEdit className='text-[2em] mr-2 text-[#20b2aa]'/>
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="text-[#292929] p-2 border-b"
                                />
                            </div>
                            <div className='flex items-center mt-5'>
                                <MdEmail className='text-[2em] mr-2 text-[#20b2aa]' />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="text-[#292929] p-2 border-b "
                                />
                                {emailVerification ? <MdMarkEmailRead className='ml-5 text-[2em] text-[#16b325]' /> : <button
                                className={`${emailVerification ? 'bg-[#16b325]' : 'bg-[#b3171f]'} text-white p-2 rounded`}
                                onClick={requestEmailVerification}
                            >
                                {emailVerification ? 'Email Verified' : 'Verify Email'}
                            </button>
                                }
                            </div>
                            <div className='flex items-center mt-4'>
                                <FcSms className='text-[2em] mr-2 text-[#20b2aa]' />
                                <input
                                    type="number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex items-center mt-4 border-b"
                                />
                                {isPhoneVerified ? <MdVerifiedUser className='ml-9 text-[2em] text-[#16b325]' /> : <button
                                    onClick={handleVerifyPhone}
                                    className={`ml-6 ${isPhoneVerified ? 'bg-[#16b325]' : 'bg-[#b3171f]'} text-white p-2 rounded`}
                                    disabled={isPhoneVerified}
                                    >
                                    {isPhoneVerified ? 'Phone Verified' : 'Verify Phone'}
                                    </button>
                                }
                            </div>  
                            <div className='flex items-center mt-4'>
                                <IoLocationSharp className='text-[#20b2aa] text-[2em] mr-2' />
                                <input
                                    type="text"
                                    value={residence}
                                    onChange={(e) => setResidence(e.target.value)}
                                    className="flex items-center mt-4 border-b"
                                />
                            </div>
                        </div>
                    </div>
                )}
                <div className={`profile-photo-upload mb-4 ${updateModal}`}>
                    <label className="block mb-2">Profile Photo:</label>
                    <input
                        type="file"
                        onChange={handleProfilePhotoChange}
                        className="w-full text-black p-2 border rounded mb-4"
                    />
                    <button
                        onClick={handleUploadProfilePhoto}
                        className="w-full bg-blue-500 text-white p-2 rounded mb-4"
                    >
                        Upload Photo
                    </button>
                </div>
            </div>
            <div>
                <div className='mt-20'>
                    {verificationMessage && <p>{verificationMessage}</p>}
                </div>
            </div>
        </div>
    );
};