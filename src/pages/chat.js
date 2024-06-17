import React, {  useEffect, useRef, useState } from 'react';
import { useSocket } from '@/Components/SocketProvider';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import { Axios } from '@/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);


    const chatContainerRef = useRef(null);
    const lastMessageRef = useRef(null);
    const timeoutIdRef = useRef(null);
    const pageNumberRef = useRef(1);
    const { socket } = useSocket();
    const { account } = useActiveWeb3React();

    useEffect(() => {
        if (!socket) return;

        socket.on('receive_message', message => {
            setMessages(prevMessages => [...prevMessages, message]);
            adjustScrollAfterNewMessage();
        });

        socket.on('user_typing', setIsTyping);

        return () => {
            socket.off('receive_message');
            socket.off('user_typing');
        };
    }, [socket]);

    useEffect(() => {
        loadMessages(); // Load the initial page of messages
    }, []);




    const adjustScrollAfterNewMessage = () => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    

    const loadMessages = async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await Axios.get('/chat', {
                params: {
                    page: pageNumberRef.current,
                    limit: 20  // Consider dynamically adjusting if initial load isn't enough
                }
            });
            const newMessages = response.data.data;
            setMessages(prev => [...newMessages.reverse(), ...prev]);
            pageNumberRef.current += 1;
            setHasMore(response.data?.totalPages >= pageNumberRef.current);
        } catch (error) {
            console.error('Failed to load messages:', error);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    const onScroll = async (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const isAtBottom = scrollTop + clientHeight === scrollHeight;
        setIsAutoScrollEnabled(isAtBottom);
        if (scrollTop === 0 && hasMore && !loading) {
            const oldScrollHeight = scrollHeight;
            await loadMessages();
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            chatContainerRef.current.scrollTop = newScrollHeight - oldScrollHeight;
        }
    };



    const handleSendMessage = () => {
        if (!account) {
            toast.error('Please connect your wallet!');
            return;
        }

        const messageData = {
            room: 'general',
            message: inputValue,
            author: account,
            timestamp: new Date(),
        };
        socket.emit('send_message', messageData);
        setInputValue('');
        // scrollToBottom();
    };

    const handleTyping = (e) => {
        setInputValue(e.target.value);
        if (!isTyping) {
            setIsTyping(true);
            socket.emit('start_typing', 'general');
        }

        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = setTimeout(() => {
            setIsTyping(false);
            socket.emit('stop_typing', 'general');
        }, 1000);
    };
    useEffect(() => {
        if (isAutoScrollEnabled) {
            scrollToBottom();
        }
    }, [messages, isAutoScrollEnabled]);
    return (
        <div className='chat-block common-block-readius'>
            <div className='back_btn'>
            <Link href='/game'>
                <svg width='12' height='20' viewBox='0 0 12 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                    d='M11 1L1 10.3679L10.2146 19'
                    stroke='white'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                />
                </svg>
                <p>Back</p>
            </Link>
        </div>
            <h2>Chat</h2>
            <div className='chat-block-main'>
                <div className='chat-block-top'>
                    <img src='/table-art.png' alt='Table Art' />
                    <h3>Name Here</h3>
                </div>
                <div
                    className='chat-block-middle'
                    style={{ overflowY: 'scroll' }}
                    onScroll={onScroll}
                    ref={chatContainerRef}
                >
                    {messages.map((msg, index) => (
                        <div key={index} className={msg?.author?.toLowerCase() !== account?.toLowerCase() ? 'chat-left-block' : 'chat-right-block'} ref={index === messages.length - 1 ? lastMessageRef : null}>
                            {msg?.author?.toLowerCase() !== account?.toLowerCase() && <img src={msg?.image || '/table-art.png'} alt='Avatar' />}
                            <h3>{msg.message}</h3>
                        </div>
                    ))}
                    {/* {isTyping && <p>Typing...</p>} */}
                    {loading && <p>Loading more messages...</p>}
                </div>
                <div className='chat-block-bottom'>
                    <div className='chat-block-bottom-inner'>
                        <div className='form-group'>
                            <textarea
                                value={inputValue}
                                onChange={handleTyping}
                                onKeyDown={event => {
                                    if (event.key === 'Enter' && !event.shiftKey) {
                                        event.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                                className='form-control'
                                placeholder='Type Something........'
                            ></textarea>
                        </div>
                        <button onClick={handleSendMessage}>
                            <svg width='31' height='30' viewBox='0 0 31 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                <path
                                    d='M25.3604 9.25956L11.3401 2.23195C1.90002 -2.47644 -1.9576 1.38117 2.76244 10.8096L4.84858 14.9702L2.76244 19.1308C-1.9576 28.5593 1.91167 32.4285 11.3401 27.7085L25.3604 20.7042C31.6421 17.5458 31.6537 12.4062 25.3604 9.25956V9.25956ZM19.4632 15.9026L10.5826 15.9259C10.2329 15.9259 9.92991 15.786 9.70847 15.5646C9.48704 15.3432 9.34719 15.0401 9.34719 14.6905C9.34912 14.3635 9.47989 14.0504 9.71115 13.8191C9.94241 13.5879 10.2555 13.4571 10.5826 13.4551L19.4632 13.4318C20.1392 13.4318 20.6986 13.9912 20.6986 14.6672C20.6986 15.3432 20.1392 15.9026 19.4632 15.9026Z'
                                    fill='#393939'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
