import { sendMail } from '@/service/user.Service';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'
const BannerMessage = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')

    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault(); // Prevent form default behavior
        if (!email) {
            setMessage('Please enter a valid email address.');
            toast.error('Please enter a valid email address!')
            setLoading(false)

            return;
        }

        try {

            const response = await sendMail(email)
            if (response.status === 200) {
                setMessage('Email submitted successfully! We will update you on our re-launch.');
                toast.success("Email submitted successfully! We will update you on our re-launch!");
                setEmail(''); // Clear the email input after successful submission
                setLoading(false)
            } else {
                toast.error('Failed to submit email. Please try again later!')
                setMessage('Failed to submit email. Please try again later.');
                setLoading(false)
            }
        } catch (error) {
            console.error('Error submitting email:', error);
            setMessage('An error occurred. Please try again later.');

            toast.error('An error occurred. Please try again later!')
            setLoading(false)

        }
    };
    // Use useEffect to clear the message after 4 seconds
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage('');
            }, 3000);  // 4000 milliseconds = 4 seconds

            // Cleanup the timer when the component unmounts or message changes
            return () => clearTimeout(timer);
        }
    }, [message]);  // Dependency array, re-run this effect if message changes
    return (
        <>
            <div className='maintance-block-center'>
                <div className='maintance-block-center-inner'>
                    <h3>
                        Spinthebottle.ai is being updated to improve efficiency and fix some small bugs which occurred after
                        Friday’s initial launch. We apologise for the inconvenience. Please leave your email below to be updated on
                        our re-launch.
                    </h3>
                    <form onSubmit={handleSubmit} className='form-group'>
                        <input
                            type='email'
                            placeholder='abc@gmail.com'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button type='submit'>{loading ? "Loading..." : "Submit"}</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </>
    );
};

export default BannerMessage;
