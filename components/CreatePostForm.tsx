"use client"

import { usePost, useToken } from '@/atom';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreatePostForm = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const { posts, setPosts } = usePost();
    const { token } = useToken();
    console.log(token)

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !title || !content ) {
            setError("All fields are necessary!");
            return;
        }

        try {
            const res = await fetch("http://localhost:4000/posts", {
                method: "POST",
                headers: {
                    "Authorization": token && token.accessToken ? `Bearer ${token.accessToken}` : '',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
              
                }),
            });
            if (res.ok) {
                res.json().then(data => {
                    const newPost = {id: data.id, title: data.title, content: data.content}
                    posts.push(newPost)
                    setPosts(posts)
                });
                router.push('/dashboard')
            } else {
                setError("There must be some backend server error");
            }
        } catch (error) {
            console.log("Error during creating post: ", error);
        }
    }

  return (
    <>
        <div className='p-5 h-screen bg-deep-blue'>
            <div>
                <h1 className='font-mono text-xl p-4'>Create. your own POST..</h1>
                <Link href="/dashboard">Back to dashboard</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="sm:col-span-4">
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" autoComplete="title" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder=" Next js..." />
                            </div>
                        </div>
                    <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">Content</label>
                        <div className="mt-2">
                            <textarea onChange={(e) => setContent(e.target.value)} id="content" name="content" rows={3} className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default CreatePostForm