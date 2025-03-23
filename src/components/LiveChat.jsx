import { useState, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { IoSendSharp } from "react-icons/io5";
import { AiOutlineRollback } from "react-icons/ai";
import { FaMicrophone } from "react-icons/fa6";
import CryptoJS from 'crypto-js';

const backendUrl = 'https://backend-auction.onrender.com';

const socket = io(`${backendUrl}`, {
    transports: ['websocket', 'polling'], 
    withCredentials: true 
});

const LiveChat = ({ sender_id }) => {
    const [contacts, setContacts] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [replyTo, setReplyTo] = useState(null);
    const [lastMessages, setLastMessages] = useState({});
    const backendLink = 'https://backend-auction.onrender.com'

    const secretKey = import.meta.env.VITE_KEY; 

    const encrypt = (text) => {
        return CryptoJS.AES.encrypt(text, secretKey).toString();
    };

    const decrypt = useCallback((ciphertext) => {
        const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }, [secretKey]);

    const fetchContacts = useCallback(() => {
        axios.get(`${backendLink}/contacts?userId=${sender_id}`)
            .then(response => {
                setContacts(response.data);
            });
    }, [sender_id]);

    const fetchLastMessages = useCallback(() => {
        contacts.forEach(contact => {
            const idContact = contact.id;
            socket.emit('get last message', { sender: sender_id, receiver: idContact });
        });
    }, [contacts, sender_id]);

    useEffect(() => {
        fetchContacts();
        socket.on('last message', (data) => {
            console.log('connected 1')
            if (data && data.receiver) {
                const decryptedMessage = {
                    ...data,
                    content: decrypt(data.content)
                };
                setLastMessages(prevState => ({
                    ...prevState,
                    [data.receiver]: decryptedMessage
                }));
            }
        });

        return () => {
            socket.off('last message');
        };
    }, [fetchContacts, decrypt]);

    useEffect(() => {
        if (contacts.length > 0) {
            fetchLastMessages();
        }
    }, [contacts, fetchLastMessages]);

    useEffect(() => {
        if (selectedUser) {
            socket.emit('join', { sender: sender_id, receiver: selectedUser.id });

            socket.emit('get messages', { sender: sender_id, receiver: selectedUser.id });

            socket.on('load messages', (data) => {
                console.log('connected 2')
                const decryptedMessages = data.map(msg => ({
                    ...msg,
                    content: decrypt(msg.content)
                }));
                setMessages(decryptedMessages);
            });

            socket.on('messages', (message) => {
                const decryptedMessage = {
                    ...message,
                    content: decrypt(message.content)
                };
                setMessages((prevMessages) => [...prevMessages, decryptedMessage]);
            });

            return () => {
                socket.off('load messages');
                socket.off('messages');
            };
        }
    }, [sender_id, selectedUser, decrypt]);

    const sendMessage = () => {
        const encryptedMessage = encrypt(newMessage);
        const message = {
            sender_id,
            receiver_id: selectedUser.id,
            content: encryptedMessage,
            reply_to: replyTo ? replyTo.id : null,
        };
        socket.emit('send message', message);
        setNewMessage('');
        setReplyTo(null);
    };

    const closeChat = () => {
        setSelectedUser(null);
        setMessages([]);
    };

    const formatDateTime = (timestamp) => {
        const date = dayjs(timestamp);
        const today = dayjs().startOf('day');
        const yesterday = dayjs().subtract(1, 'day').startOf('day');

        if (date.isAfter(today)) {
            return date.format('HH:mm');
        } else if (date.isAfter(yesterday)) {
            return 'Ayer';
        } else {
            return date.format('DD/MM/YYYY');
        }
    };

    return (
        <div className='bg-[#fcfcfc] w-full h-full md:h-screen '>
            <div className={` fixed z-52 md:block  flex bg-[#fcfcfc] w-full h-13 border border-solid border-gray-300 md:flex
                ${selectedUser ? 'block' : 'hidden'}`}>
                <div className='hidden md:block flex w-1/3 border md:mt-2 '>
                    <span className='text-[#292929] text-xl m-auto ml-5 font-semibold '>contacts</span>
                </div>
                <div className='flex w-full md:w-3/4 items-center'>
                    <div className='flex items-center ml-10 md:ml-0'>
                        <img src={selectedUser ? `${backendLink}${selectedUser.profile_photo.replace(/ /g, '%20')}` : '/default-profile.png'}
                            alt="profile photo"
                            className='w-[34px] h-[34px]  rounded-full mr-2'
                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-profile.png"; }}
                        />
                        <h2 className='text-[#292929] text-xl font-semibold ml-4'>{selectedUser ? selectedUser.name : ''}</h2>
                    </div>
                    <div className='ml-auto md:right-0 md:fixed md:mr-5'>
                        <button
                            onClick={closeChat}
                            className='w-[50px] h-[30px] bg-transparent mr-2 text-white rounded-md'
                        ><AiOutlineRollback className='text-[#292929] ' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex  h-screen md:h-[100%]'>
                <div className={` w-full md:w-1/3 p-4  border bg-[#fcfcfc] border-solid border-gray-300 md:block ${selectedUser ? 'hidden' : 'block'}`}>
                    <h2 className='text-[#292929] mt-1 mb-3 text-xl font-semibold'>Contacts</h2>
                    <ul className=' overflow-y-auto'>
                        {contacts.map(contact => (
                            <li key={contact.id} className='mb-2'>
                                <div className='flex p-2 rounded-lg hover:bg-gray-300 text-black' onClick={() => setSelectedUser(contact)}>
                                    <div>
                                        <img src={`${backendLink}${contact.profile_photo.replace(/ /g, '%20')}`}
                                            className='w-[34px] min-w-[34px] h-[34px] mt-1.5 rounded-full mr-2'
                                            onError={(e) => { e.target.onerror = null; e.target.src = "/default-profile.png"; }}
                                        />
                                    </div>
                                    <div className='flex flex-col w-full ml-2'>
                                        <div className='flex flex-col'>
                                            <span>{contact.name}</span>
                                            <span className='text-gray-600 mt-1 text-sm w-24 overflow-hidden whitespace-nowrap text-ellipsis'>
                                                {lastMessages[contact.id]?.content || 'Sin mensajes'}
                                            </span>
                                        </div>
                                        <div className='flex ml-auto'>
                                            <span className="text-gray-500 text-xs ml-2 mt-[80%]">
                                            {formatDateTime(lastMessages[contact.id]?.timestamp)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`w-[100%] z-51 overflow-y-auto h-screen    p-4 rounded-lg shadow-lg bg-[#f5f5f5] border  border-solid border-gray-300 ${selectedUser ? 'block' : 'hidden'}`}>
                    {selectedUser ? (
                        <>
                            <div className='overflow-y-auto mb-50  mt-10 ' key={selectedUser.id}>
                                {messages.map((msg) => (
                                    <div key={msg.id_message} className='flex items-center'>
                                        <img src={msg.sender_profile_photo ? `${backendLink}${msg.sender_profile_photo.replace(/ /g, '%20')}` : '/default-profile.png'} alt="" className={`w-[30px] h-[30px]  rounded-full mr-2 mt-5 ${msg.sender_id === sender_id ? '' : 'order-last ml-2'
                                            }`} />
                                        <div
                                            className={`p-2 my-2 w-80 rounded-lg ${msg.sender_id === sender_id ? 'bg-[#dadef4] text-black' : 'bg-[#c9f0f8] text-black ml-[40%]'}`}
                                        >
                                            {msg.reply_to && (
                                                <div className='text-xs text-gray-500'>
                                                    reply to: {messages.find((m) => m.id_message === msg.reply_to)?.content}
                                                </div>
                                            )}
                                            <div className='break-words w-full'>{msg.content}</div>
                                            <div className='flex justify-between mt-2'>
                                                <span className="text-black text-xs ml-2">
                                                    {formatDateTime(msg.timestamp)}
                                                </span>
                                                <button className='text-xs text-black  ' onClick={() => setReplyTo(msg)}>reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {replyTo && (
                                <div className='text-xs text-gray-500 mb-2'>
                                    reply to: {replyTo.content}
                                    <button className='ml-2 text-red-500' onClick={() => setReplyTo(null)}>cancel</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div>Selecciona un contacto para empezar a chatear</div>
                    )}
                </div>
            </div>
            <div className={`flex bg-transparent fixed bottom-0  border-[#1111] w-full md:ml-0  lg:ml-70 p-2 md:h-auto ${selectedUser ? 'block z-53' : 'hidden '}`}>
                <div className='flex w-full md:w-2/4 justify-around items-center'> 
                    <div>
                        <FaMicrophone className='text-[2em] text-black mb-1 ' />
                    </div>
                    <div className=''>
                        <textarea
                            type='text'
                            className='md:w-80 md:h-10  bg-transparent p-2 border-b mb-2  text-black outline-none'
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                    </div>
                    <div>
                        <IoSendSharp className='text-[2em] text-black mb-1 ' onClick={sendMessage} />
                    </div>
                </div>
            </div>
        </div>
    );
}

LiveChat.propTypes = {
    sender_id: PropTypes.number.isRequired,
};

export default LiveChat;
