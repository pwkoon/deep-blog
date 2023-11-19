"use client"

// import { useTokenContext } from '@/context/TokenContext';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react'

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
                        email: data.user.email,
                    })
                });
                // router.push("/posts")
                router.back()
            } else {
                setError("User login failed, reason: not valid user!");
            }
        } catch (error) {
            console.log("Error during login: ", error);
        }
    }

    return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Login</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
                <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email'/>
                <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                <button className='bg-green-600 text-white font-bold cursor-pointer px-6 py-2'>Login</button>
                { error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                    )
                }
                <Link className="text-sm mt-3 text-right" href={'/register'}>
                    Dont have an account? <span className='underline'>Register</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default LoginForm