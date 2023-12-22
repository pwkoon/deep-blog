"use client"

import CreatePostForm from '@/components/CreatePostForm'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { usePost, usePostForm, useToken, useUserPost } from '@/atom';

const CreatePost = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { postForm, setPostForm } = usePostForm();
  const { posts, setPosts } = usePost();
  const { token } = useToken();
  const { userPosts, setUserPosts } = useUserPost();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ( !postForm.title || !postForm.content ) {
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
                  title: postForm.title,
                  content: postForm.content, 
              }),
          });
          if (res.ok) {
              await res.json().then(data => {
                  console.log("from create form", data)
                  setPostForm({...postForm, id: data.id})
                  posts.push(postForm)
                  userPosts.push(postForm)
                  setPosts(posts)
                  setUserPosts(userPosts)

                  const storedPosts = localStorage.getItem('posts');
                  const allPosts = storedPosts ? JSON.parse(storedPosts) : null;
                  if (storedPosts && allPosts) {
                      allPosts.push({...postForm, id: data.id}); 
                  }
                  localStorage.setItem('posts', JSON.stringify(allPosts));

                  const storedUserPosts = localStorage.getItem('userPosts');
                  const allUserPosts = storedUserPosts ? JSON.parse(storedUserPosts) : null;
                  if (storedUserPosts && allUserPosts) {
                      allUserPosts.push({...postForm, id: data.id})
                  }
                  localStorage.setItem('userPosts', JSON.stringify(allUserPosts));
              });
              const form = e.target as HTMLFormElement;
              form.reset();
              router.push('/dashboard/userposts')
          } else {
              setError("There must be some backend server error");
          }
      } catch (error) {
          console.log("Error during creating post: ", error);
      }
  }

  return (
    <CreatePostForm handleSubmit={handleSubmit}/>
  )
}

export default CreatePost