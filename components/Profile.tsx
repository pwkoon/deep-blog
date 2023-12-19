'use client'

import { useEffect } from 'react';
import { useToken, useUser } from '../atom';
import Link from 'next/link';

const Board = () => {
  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  console.log("from profile", user)

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
          <div className='h-100 bg-fixed bg-center bg-cover bg-deep-ocean'>
            <div className='h-screen scroll-smooth grid grid-rows-3 grid-flow-col gap-4'>
              <div className='row-span-3 mx-auto pt-10'>
                <h1 className='font-mono p-2 text-font-sand' style={{fontSize: "6rem"}}>
                  Deep.<br />
                  .. Blog
                </h1>
                <p className='text-white'>.</p>
                <div className='pt-10'>
                  <div className='text-white font-mono text-center' style={{fontSize: "1rem"}}>
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                      { token?.accessToken.length === 0 ?
                        <h1>Hello Guest</h1> :
                        <h1>Welcome {user.username}</h1> 
                      }
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                    <p className='text-white'>.</p>
                  </div>
                </div>
              </div>    
              <div className='col-row-2 mx-auto'>
                <div>
                  <div className='p-5'>
                    <p className='text-center border-solid rounded-3xl p-10 bg-font-blue text-white hover:bg-cyan-600 cursor-pointer'>
                      { token?.accessToken.length === 0 ?
                        <Link href="/login">See posts</Link> :
                        <Link href="/posts">See posts</Link>
                      }
                    </p>
                  </div>
                  <div className='p-5'>
                    <p className='text-center border-solid p-10 rounded-3xl bg-font-blue text-white hover:bg-cyan-600 cursor-pointer'>
                      { token?.accessToken.length === 0 ?
                        <Link href="/login">Your posts</Link> :
                        <Link href="/dashboard/userposts">Your posts</Link>
                      }
                    </p>
                  </div>
                  <div className='p-5'>
                    <p className='text-center border-solid p-10 rounded-3xl bg-font-blue text-white hover:bg-cyan-600 cursor-pointer'>
                      { token?.accessToken.length === 0 ?
                        <Link href="/login">Create posts</Link> :
                        <Link href="/newpost">Create posts</Link>
                      }
                    </p>
                  </div>
                  <div className='p-5'>
                    <p className='text-center border-solid p-10 rounded-3xl bg-font-blue text-white hover:bg-cyan-600 cursor-pointer'>
                    <a href="/login">Login</a>
                    </p>
                  </div>
                  <div className='p-5'>
                    <p className='text-center border-solid p-10 rounded-3xl bg-font-blue text-white hover:bg-cyan-600 cursor-pointer'>
                    <Link href="/" onClick={handleLogout}>Logout</Link>
                    </p>
                  </div>
                </div>
              </div>   
            </div>
          </div>
          <div className='bg-font-blue h-auto p-3'>
          </div>
          <div className='h-100 bg-fixed bg-center bg-cover bg-deep-turtle'>
            <div className='scroll-smooth grid grid-rows-2 grid-flow-col gap-4'>
              <div className='row-span-2 m-20 h-1/2'>
                <div className='text-center font-mono' style={{fontSize: "1.5rem"}}>
                  <p className='text-white'>.</p>
                  <p className='text-white'>.</p>
                  <p className='text-white'>.</p>
                  <h1 className='text-white'>Create and customize posts effortlessly.</h1>
                  <p className='text-white'>.</p>
                  <h1 className='text-white'>Connect with a community that shares your interests.</h1>
                  <p className='text-white'>.</p>
                  <h1 className='text-white'>Explore diverse content from our vibrant user base.</h1>
                  <p className='text-white'>.</p>
                  <h1 className='text-white'>Prioritize privacy and security.</h1>
                  <p className='text-white'>.</p>
                  <p className='text-white'>.</p>
                  <p className='text-white'>.</p>
                </div>
              </div>
              <div className='col-row-2'>
                <h1 className='font-mono p-10 text-font-sand' style={{fontSize: "6rem"}}>
                  About.<br />
                  .. US
                </h1>
              </div>
            </div>
            <div className='bg-deep-header p-5 text-center'>
              <div className='flex w-fit mx-auto p-2'>
                {/* <!-- Facebook --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-2"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
                {/* <!-- Instagram --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-2"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                {/* <!-- Github --> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mx-2"
                  fill="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </div>
            </div>
          </div>
      </>
    )
  }

export default Board