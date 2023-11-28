'use client'

import { useEffect } from 'react';
import { useToken, useUser } from '../atom';
import Link from 'next/link';

const Board = () => {
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  // retrieve token from localstorage
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
  }, [])

  // retrieve user from localstorage
  useEffect(() => {
    const fetchUserFromLocalStorage = () => {
      try {
        if (typeof window !== 'undefined') {
          const userStorage = window.localStorage.getItem('user') || '';
          if (userStorage) {
            const parsedUser = JSON.parse(userStorage);
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error parsing user from localStorage:', error);
      }
    };
    fetchUserFromLocalStorage();
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4001/logout", {
        method: "POST", // Assuming your server expects a POST request for logout
        credentials: "include", // Include credentials for cross-origin requests
      });

      if (res.ok) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.clear();
          window.location.reload();
        }
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
                <p>Hello {user.username}</p> 
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
                  <Link href="/dashboard/userposts">See your posts</Link>
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