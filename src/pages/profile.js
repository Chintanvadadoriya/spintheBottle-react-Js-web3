import { useActiveWeb3React } from '@/hooks/useActiveWeb3React'
import { updateUserAction } from '@/redux/action/stackAction'
import { stakingState } from '@/redux/slice/stackSlice'
import { useFormik } from 'formik'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';


const SUPORTED_IMG_TYPE = [
    'image/jpeg',
    'image/png',
]

const Profile = () => {

    const { user, loading } = useSelector(stakingState);
    const { account, balance,sdk } = useActiveWeb3React();
    const dispatch = useDispatch()


    const [priviewImg, setPriviewImg] = useState();

    const formik = useFormik({
        initialValues: {
            userName: '',
            bio: '',
            image: ''
        },
        validationSchema: Yup.object({
            userName: Yup.string().max(12, 'Your username must be 12 characters or fewer!').required('Required'),
            // bio: Yup.string().required('Required'),
        }),
        
        onSubmit: async (values, helpers) => {
            if (!account) return;
            console.log('valuessadad', values);
            const signature = await sdk?.wallet?.sign(
				`I want to update my profile :${account?.toLowerCase()}:${
					user?.nonce
				}`
			);
			if (!signature) {
				toast.error("Signing failed!");

                return;
            }
        
            const formData = new FormData();
            formData.append('userName', values.userName);
            formData.append('bio', values.bio);
            formData.append('address', account);
            if (values.image instanceof File && SUPORTED_IMG_TYPE.includes(values?.image?.type)) {
                formData.append('image', values.image);
            }
            formData.append("signature", signature);

          let res=  await dispatch(updateUserAction(formData))
            if(res?.payload?.address){
                toast.success("Profile updated successfully!");
            }
        }
    });

    useEffect(() => {
        if (!user) return;
        formik.setValues({
            userName: user.userName,
            bio: user.bio,
        });
        if (user.image) {
            setPriviewImg(user.image)
        }
    }, [user])

    const onFileChange = (e) => {
        if (!SUPORTED_IMG_TYPE.includes(e.target.files[0]?.type)) {
            return toast.error('Please select a valid image');
        }
        priviewImg && URL.revokeObjectURL(priviewImg);
        formik.setFieldValue('image', e.target.files[0])
        setPriviewImg(URL.createObjectURL(e.target.files[0]))
    }
      

    return (
        // <div style={{ marginTop: '50%' }}>
        //     <form onSubmit={formik.handleSubmit}>
        //         <input
        //             value={formik.values.userName}
        //             name="userName"
        //             onChange={formik.handleChange}
        //             onBlur={formik.handleBlur}
        //         />
        //         <input
        //             value={formik.values.bio}
        //             name="bio"
        //             onChange={formik.handleChange}
        //             onBlur={formik.handleBlur}
        //         />
        //         <input type='file' onChange={onFileChange} />
        //         <button type='submit'>submit</button>
        //     </form>
        // </div>
        <div className='profile-main common-block-readius'>
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
        <h2>Profile</h2>

            <div className='profile-main-flex'>
                <div className='profile-main-flex-inner-left'>
                    <div className='profile-main-flex-inner-left-inner'>
                        <div className='profile-img-inner'>
                            <img src={priviewImg || '/table-art.png'}></img>
                        </div>
                        <h3>{user?.userName}</h3>
                        <p>
                            {user?.bio}
                        </p>
                       
                        {/* <h5>Total Prize Amount : 0.00</h5> */}
                        {/* <ul>
                            <li>
                                <a href='#'>
                                    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <g clip-path='url(#clip0_131_41)'>
                                            <g filter='url(#filter0_d_131_41)'>
                                                <path
                                                    d='M48.1752 13.3241C44.8502 11.7741 41.2502 10.6491 37.5002 9.99914C37.4673 9.99809 37.4346 10.0043 37.4044 10.0172C37.3741 10.0302 37.3471 10.0496 37.3252 10.0741C36.8752 10.8991 36.3502 11.9741 36.0002 12.7991C32.0227 12.1991 27.9777 12.1991 24.0002 12.7991C23.6502 11.9491 23.1252 10.8991 22.6502 10.0741C22.6252 10.0241 22.5502 9.99914 22.4752 9.99914C18.7252 10.6491 15.1502 11.7741 11.8002 13.3241C11.7752 13.3241 11.7502 13.3491 11.7252 13.3741C4.92517 23.5491 3.05017 33.4491 3.97517 43.2491C3.97517 43.2991 4.00017 43.3491 4.05017 43.3741C8.55017 46.6741 12.8752 48.6741 17.1502 49.9991C17.2252 50.0241 17.3002 49.9991 17.3252 49.9491C18.3252 48.5741 19.2252 47.1241 20.0002 45.5991C20.0502 45.4991 20.0002 45.3991 19.9002 45.3741C18.4752 44.8241 17.1252 44.1741 15.8002 43.4241C15.7002 43.3741 15.7002 43.2241 15.7752 43.1491C16.0502 42.9491 16.3252 42.7241 16.6002 42.5241C16.6502 42.4741 16.7252 42.4741 16.7752 42.4991C25.3752 46.4241 34.6502 46.4241 43.1502 42.4991C43.2002 42.4741 43.2752 42.4741 43.3252 42.5241C43.6002 42.7491 43.8752 42.9491 44.1502 43.1741C44.2502 43.2491 44.2502 43.3991 44.1252 43.4491C42.8252 44.2241 41.4502 44.8491 40.0252 45.3991C39.9252 45.4241 39.9002 45.5491 39.9252 45.6241C40.7252 47.1491 41.6252 48.5991 42.6002 49.9741C42.6752 49.9991 42.7502 50.0241 42.8252 49.9991C47.1252 48.6741 51.4502 46.6741 55.9502 43.3741C56.0002 43.3491 56.0252 43.2991 56.0252 43.2491C57.1252 31.9241 54.2002 22.0991 48.2752 13.3741C48.2502 13.3491 48.2252 13.3241 48.1752 13.3241ZM21.3002 37.2741C18.7252 37.2741 16.5752 34.8991 16.5752 31.9741C16.5752 29.0491 18.6752 26.6741 21.3002 26.6741C23.9502 26.6741 26.0502 29.0741 26.0252 31.9741C26.0252 34.8991 23.9252 37.2741 21.3002 37.2741ZM38.7252 37.2741C36.1502 37.2741 34.0002 34.8991 34.0002 31.9741C34.0002 29.0491 36.1002 26.6741 38.7252 26.6741C41.3752 26.6741 43.4752 29.0741 43.4502 31.9741C43.4502 34.8991 41.3752 37.2741 38.7252 37.2741Z'
                                                    fill='white'
                                                />
                                            </g>
                                        </g>
                                        <defs>
                                            <filter
                                                id='filter0_d_131_41'
                                                x='-16.2452'
                                                y='-6.00098'
                                                width='92.4985'
                                                height='80.0105'
                                                filterUnits='userSpaceOnUse'
                                                color-interpolation-filters='sRGB'>
                                                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                                                <feColorMatrix
                                                    in='SourceAlpha'
                                                    type='matrix'
                                                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                                    result='hardAlpha'
                                                />
                                                <feOffset dy='4' />
                                                <feGaussianBlur stdDeviation='10' />
                                                <feComposite in2='hardAlpha' operator='out' />
                                                <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0' />
                                                <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_131_41' />
                                                <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_131_41' result='shape' />
                                            </filter>
                                            <clipPath id='clip0_131_41'>
                                                <rect width='60' height='60' fill='white' />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </li>
                            <li>
                                <a href='#'>
                                    <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <g clip-path='url(#clip0_131_43)'>
                                            <g filter='url(#filter0_d_131_43)'>
                                                <path
                                                    d='M44.4921 7.20001H52.2201L35.3362 26.5179L55.2001 52.8H39.6474L27.4674 36.858L13.5276 52.8H5.79545L23.8555 32.1368L4.80005 7.20211H20.7474L31.7577 21.7736L44.4921 7.20001ZM41.7811 48.1713H46.063L18.4206 11.587H13.8258L41.7811 48.1713Z'
                                                    fill='white'
                                                />
                                            </g>
                                        </g>
                                        <defs>
                                            <filter
                                                id='filter0_d_131_43'
                                                x='-15.2'
                                                y='-8.79999'
                                                width='90.4'
                                                height='85.6'
                                                filterUnits='userSpaceOnUse'
                                                color-interpolation-filters='sRGB'>
                                                <feFlood flood-opacity='0' result='BackgroundImageFix' />
                                                <feColorMatrix
                                                    in='SourceAlpha'
                                                    type='matrix'
                                                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                                                    result='hardAlpha'
                                                />
                                                <feOffset dy='4' />
                                                <feGaussianBlur stdDeviation='10' />
                                                <feComposite in2='hardAlpha' operator='out' />
                                                <feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.1 0' />
                                                <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_131_43' />
                                                <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_131_43' result='shape' />
                                            </filter>
                                            <clipPath id='clip0_131_43'>
                                                <rect width='60' height='60' fill='white' />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </li>
                        </ul> */}
                        <div className='total-eth-main'>
                            <p>Total MATIC {balance}</p>
                        </div>
                    </div>
                </div>
                <div className='profile-main-flex-inner-right'>
                    <form onSubmit={formik.handleSubmit} className='profile-main-flex-inner-right-inner'>
                        <h3>Edit Profile</h3>
                        <div className='form-custom'>
                            <div className='form-group'>
                                <input
                                    type='text'
                                    className='form-control'
                                    placeholder='Username'
                                    value={formik.values.userName}
                                    name="userName"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <div className='form-error'>
                                    {formik.errors.userName ? (
                                        <span className="form-text text-red">
                                            {formik.errors.userName}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className='form-group'>
                                <textarea
                                    className='form-control'
                                    placeholder='Bio'
                                    name='bio'
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.bio}
                                ></textarea>
                                <div className='form-error'>
                                    {formik.errors.bio ? (
                                        <span className="form-text text-red">
                                            {formik.errors.bio}
                                        </span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className='form-group'>
                                <input className='form-control' type='file' onChange={onFileChange} />
                            </div>
                        </div>
                        <div className='update-block-custom'>
                            <button disabled={loading} type='submit' className='update-btn'>{loading ? 'Updating...' : 'Update'} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile