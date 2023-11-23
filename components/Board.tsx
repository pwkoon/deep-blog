'use client'

import Link from 'next/link';
import { useToken, useUser } from '../atom';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Board = () => {

  const { token, setToken } = useToken();
  const { user } = useUser();

  const router = useRouter();

  // const tokenStorage =  typeof window !== 'undefined' ?  JSON.parse(window.localStorage.getItem("token") || "") : null
  // const tokenStorage =  window.localStorage.getItem("token") 
  // console.log("token from board", tokenStorage )

  useEffect(() => {
    const fetchTokenFromLocalStorage = () => {
      try {
        if (typeof window !== 'undefined') {
          const tokenStorage = window.localStorage.getItem('token') || '';
          if (tokenStorage) {
            const parsedToken = JSON.parse(tokenStorage);
            setToken(parsedToken);
          }
        }
      } catch (error) {
        console.error('Error parsing token from localStorage:', error);
      }
    };
    fetchTokenFromLocalStorage();
  }, [setToken])


  // const handleLogout = async (e: React.FormEvent<HTMLFormElement>) =>{
  //   e.preventDefault();
  //     try {
  //         const res = await fetch("http://localhost:4001/logout")
  //         if (res.ok) {
  //             // if (localStorage && typeof window !== 'undefined') {
  //             //   window.localStorage.clear();
  //             // }
  //             if (typeof window !== 'undefined' && window.localStorage) {
  //               window.localStorage.clear();
  //             }
              
  //             router.push("/")
  //         } else {
  //             console.log("Logout failed");
  //         }
  //     } catch (error) {
  //         console.log("Error during logout: ", error);
  //     }
  // }

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4001/logout", {
        method: "POST", // Assuming your server expects a POST request for logout
        credentials: "include", // Include credentials for cross-origin requests
      });

      if (res.ok) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.clear();
        }

        router.push("/");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.log("Error during logout: ", error);
    }
  };


  //TRY HANDLE SUBMIT ON /POSTS HERE BY FETCHING DATA FROM BACKEND
  return (
      <>
        <div className='bg-deep-blue h-screen'>
          <div className='h-auto pt-2'>
            <h1 className='font-mono text-xl p-2'>
              Deep. Blog..
            </h1>
              { token?.accessToken.length === 0 ?
                <p>Hello Guest</p> :
                <p>Hello User</p> 
              }
            <div className='pt-2'>
              <p className='text-center w-1/4 border-solid p-7 bg-font text-white hover:bg-cyan-600 cursor-pointer' style={{margin:"auto"}}>
                { token?.accessToken.length === 0 ?
                  <Link href="/login">See posts</Link> :
                  <Link href="/posts">See posts</Link>
                }
              </p>
            </div>
            <div className='pt-2'>
              <p className='text-center w-1/4 border-solid p-7 bg-font text-white hover:bg-cyan-600 cursor-pointer' style={{margin:"auto"}}>
                { token?.accessToken.length === 0 ?
                  <Link href="/login">See your posts</Link> :
                  <Link href="/userposts">See your posts</Link>
                }
              </p>
            </div>
            <div className='pt-2'>
              <p className='text-center w-1/4 border-solid p-7 bg-font text-white hover:bg-cyan-600 cursor-pointer' style={{margin:"auto"}}>
                { token?.accessToken.length === 0 ?
                  <Link href="/login">Create posts</Link> :
                  <Link href="/newpost">Create posts</Link>
                }
              </p>
            </div>
            <div className='pt-2'>
              <p className='text-center w-1/4 border-solid p-7 bg-font text-white hover:bg-cyan-600 cursor-pointer' style={{margin:"auto"}}>
              <a href="/login">Login</a>
              </p>
            </div>
            <div className='pt-2'>
              <p className='text-center w-1/4 border-solid p-7 bg-font text-white hover:bg-cyan-600 cursor-pointer' style={{margin:"auto"}}>
              <Link href="/" onClick={handleLogout}>Logout</Link>
              </p>
            </div>
          </div>
          <div className='bg-deep-dark-blue h-1/4 static'>
            {/* <p className='font-mono text-4xl text-center absolute' >
              You are<br/>
              what your record <br/>
              says you are
              </p> */}
          </div>
        </div>
      </>
    )
  }

export default Board