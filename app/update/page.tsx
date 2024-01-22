"use client"

import { useEditPost, useToken } from '@/atom';
import UpdatePostForm from '@/components/UpdatePostForm'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Update = () => {

    const router = useRouter();
    const { token } = useToken();
    const [error, setError] = useState("");
    const { editPost, setEditPost } = useEditPost();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !editPost.title || !editPost.content ) {
            setError("All fields are necessary!");
            return;
        }
  
        try {
            const res = await fetch(`http://localhost:4000/posts/${editPost.id}`, {
              method: "PUT",
              headers: {
                "Authorization": token && token.accessToken ? `Bearer ${token.accessToken}` : '',
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: editPost.title,
                content: editPost.content, 
            }),
            });
            if (res.ok) {
                await res.json().then(data => {
                    localStorage.removeItem('userPosts');
                    localStorage.removeItem('posts')
                    setEditPost({...editPost, 
                      title: data.title,
                      content: data.content,
                      created_at: data.created_at,
                      updated_at: data.updated_at
                    });
                })
              };
              localStorage.removeItem('single post')
              localStorage.setItem('single post', JSON.stringify(editPost))
              router.back()       
        } catch (error) {
            console.log("Error during creating post: ", error);
        }
    }
  return (
    <UpdatePostForm handleSubmit={handleSubmit} title={editPost.title} content={editPost.content} error={error}/>
  )
}

export default Update
