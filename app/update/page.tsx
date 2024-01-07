"use client"

import { useEditPost, usePostForm, useToken } from '@/atom';
import UpdatePostForm from '@/components/UpdatePostForm'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Update = () => {

    const router = useRouter();
    const { postForm } = usePostForm();
    const { token } = useToken();
    const [error, setError] = useState("");
    const { editPost } = useEditPost();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ( !postForm.title || !postForm.content ) {
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
                title: postForm.title,
                content: postForm.content, 
            }),
            });
            if (res.ok) {
                await res.json().then(data => {
                    localStorage.removeItem('userPosts');
                    localStorage.removeItem('posts')
                })
                // setEditPost({
                //   id: "",
                //   title: "",
                //   content:""
                // });
            };
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
