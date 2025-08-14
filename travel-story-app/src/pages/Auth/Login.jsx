import React from 'react'
import loginBg from '../../assets/images/login-bg.jpg'
import PasswordInput from '../../components/input/PasswordInput'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
     e.preventDefault();
     if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
     }
     if(!password) {
      setError('Please enter your password');
      return;
     }
     setError("");
     console.log('axiosInstance baseURL:', axiosInstance.defaults.baseURL);

       try {
        const response = await axiosInstance.post('/api/login', {
          email:email,
          password:password,
        });
        if(response.data && response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          navigate('/dashboard');
        } else {
          setError(response.data.message || 'Login failed. Please try again.');
        }
       } catch (error) {
        console.error('Login error:', error);
        setError(error.response?.data?.message || 'An error occurred. Please try again.');
       }
  }
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
       <div className='login-ui-box 
       right-10 -top-40'/>

       <div className='login-ui-box bg-cyan-200 -bottom-40 right-1/2'/>
      <div className='container h-screen flex items-center justify-center px-20 mx-auto'>

        <div className='w-1/2 h-[90vh] flex items-end rounded-lg p-10 z-50'
        style={{
          backgroundImage: `url(${loginBg})`,
          backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>

          </div> 

          <div>
            <h4 className='text-5xl textx-white font-semibold leading-[58px]'>
             Capure Your <br/> Travel Stories
            </h4>

            <p className='text-[15px] text-gray leading-6 pr-7 mt-4'>
              Share your adventures, connect with fellow travelers, and inspire others with your unique travel experiences. Join our community today!
            </p>
          </div>
         <div className='w-2/4 h-[90vh] bg-white rounded-lg p-10 z-50 shadow-lg shawdow-gray-500/50'>
              <form onSubmit={handleLogin} className='flex flex-col gap-4'>
                <h4 className='text-2xl font-bold mb-4'>
                    Login
                  </h4> 
                 <input
                 type="text" placeholder='Email' className='input-box'
                 value={email}
                 onChange={({target}) => {setEmail(target.value)}}
                 />

                 <PasswordInput
                  value={password}
                  onChange={({target}) => {setPassword(target.value)}}
                 />

                 {error && <p 
                 className='text-red-500 text-xs pb-1'>{error}
                  </p>}
                 <button
                  type='submit' className='btn-primary'
                 > LOGIN
                 </button>

                 <p className='text-slate-500 text-center my-4'>
                  Or
                 </p>

                 <button
                 type="submit"

                 className='btn-primary btn-light'
                 onClick={() =>{
                  navigate('/signUp');
                 } }
                 >
                  CREATE ACCOUNT
                 </button>
              </form>
         </div>
      </div>
    </div>
  )
}

export default Login