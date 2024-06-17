import EventBus from '@/utils/event';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from "socket.io-client";


const SocketContext = createContext();

const room = 'general';


export const SocketProvider = ({ children }) => {
    // const [childFunctions, setChildFunctions] = useState({});


    // const registerFunction = (key, func) => {
    //     setChildFunctions(prev => ({ ...prev, [key]: func }));
    // };

    // // Example function to deregister child functions
    // const deregisterFunction = (key) => {
    //     setChildFunctions(prev => {
    //         const newState = { ...prev };
    //         delete newState[key];
    //         return newState;
    //     });
    // };

    // Example function to call a registered function
    // const callChildFunction = (key, data) => {
    //     console.log('childFunctions[key]', childFunctions)
    //     if (childFunctions[key]) {
    //         childFunctions[key](data);
    //     }
    // };


    const [socket, setSocket] = useState()

    useEffect(() => {
        setSocket(io(process.env.SOCKET_URL));
    }, []);

    const joinRoom = () => {
        console.log('connected')
        socket.emit('join_room', room);
    }

    const disconnected = () => {
        console.log('disconnted')
    }

  
    useEffect(() => {
        console.log('inside')
        socket?.on("connect", joinRoom);
        socket?.on("disconnect", disconnected);

        return () => {
            socket?.off("connect", joinRoom);
            socket?.off("disconnect", disconnected);
            socket?.disconnect();
        };
    }, [socket])



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => useContext(SocketContext);


