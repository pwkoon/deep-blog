"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react'
import { useToken, useUser } from '../atom';

const LoginForm: FC = () => {
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { token, setToken } = useToken();
    const { user, setUser } = useUser();

    const router = useRouter()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !email || !password ) {
            setError("All fields are necessary!");
            return;
        }
        try {
            const res = await fetch("http://localhost:4001/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            if (res.ok) {
                res.json().then(data => {
                    setToken({
                        accessToken: data.accessToken,
                        refreshToken: data.refreshToken
                    });
                    setUser({
                        id: data.user.id,
                        email: data.user.email,
                        username: data.user.username
                    })
                });
                router.push('/dashboard')
            } else {
                setError("User login failed, reason: not valid user!");
            }
        } catch (error) {
            console.log("Error during login: ", error);
        }
    }

    // STORE TOKEN IN LOCAL STORAGE
    useEffect(() => {
        const setTokenInLocalStorage = () => {
          try {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('user', JSON.stringify(user));
            }
          } catch (error) {
            console.error('Error setting user in localStorage:', error);
          }
        };
        setTokenInLocalStorage();
      }, [user, setUser])
    
    // STORE USER IN LOCAL STORAGE
    useEffect(() => {
        const setTokenInLocalStorage = () => {
          try {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('token', JSON.stringify(token));
            }
          } catch (error) {
            console.error('Error setting token in localStorage:', error);
          }
        };
        setTokenInLocalStorage();
      }, [token, setToken])
    
    return (
    <div className='grid place-items-center h-screen bg-deep-login bg-fixed bg-cover bg-center'>
      <Link className='font-mono text-font-blue' href={'/'}>
        Deep.<br />
        .. Blog
      </Link>
      <div className='shadow-lg p-5 rounded-lg border-t-4 border-font-blue'>
          <h1 className='text-xl text-center text-font-sand font-bold my-4'>Login</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3 focus'> 
              <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email'/>
              <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
              <button className='bg-font-blue text-white font-bold cursor-pointer px-6 py-2'>Login</button>
              { error && (
                  <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                      {error}
                  </div>
                  )
              }
              <Link className="text-sm mt-3 text-right text-font-sand" href={'/register'}>
                  Dont have an account? <span className='underline'>Register</span>
              </Link>
          </form>
      </div>
    </div>
  )
}

export default LoginForm