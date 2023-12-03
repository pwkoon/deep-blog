"use client"

import Link from 'next/link'
import { FC, useState } from 'react'
import { useRouter } from 'next/navigation';

export const RegisterForm: FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !email || !password ) {
            setError("All fields are necessary!");
            return;
        }
        
        try {
            const res = await fetch("http://localhost:4001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, 
                    email, 
                    password,
                }),
            });

            console.log(res)

            if (res.ok) {
                const form = e.target as HTMLFormElement;
                form.reset();
                router.push("/login")
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during registration: ", error);
        }
    };

  return (
    <div className='grid place-items-center h-screen bg-deep-register bg-fixed bg-cover bg-center'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-font-blue'>
            <h1 className='text-xl font-bold my-4 text-font-blue text-center'>Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'> 
                <input onChange={(e) => setUsername(e.target.value)} type='text' placeholder='Username'/>
                <input onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email'/>
                <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' />
                <button className='bg-font-blue text-white font-bold cursor-pointer px-6 py-2'>Register</button>
                { error && (
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                    )
                }
                <Link className="text-sm mt-3 text-right text-font-sand" href={'/login'}>
                    Already have an account? <span className='underline'>Login</span>
                </Link>
            </form>
        </div>
    </div>
  )
}
