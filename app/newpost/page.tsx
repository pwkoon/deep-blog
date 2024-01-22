"use client"

import CreatePostForm from '@/components/CreatePostForm'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useFile, usePost, usePostForm, useToken, useUserPost } from '@/atom';
import withAuth from '@/utils/withAuth';
import Loading from '@/components/Loading';

const CreatePost = () => {
    
  const router = useRouter();
  const [error, setError] = useState("");
  const { file, setFile}  = useFile();
  const { postForm, setPostForm } = usePostForm();
  const { posts, setPosts } = usePost();
  const { token, setToken } = useToken();
  const { userPosts, setUserPosts } = useUserPost();

  
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
        router.push('/login');
      }
    };
    fetchTokenFromLocalStorage();
  }, [])

  const validFilesTypes = ['image/jpg','image/jpeg','image/png']

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if ( !postForm.title || !postForm.content || !file ) {
          setError("All fields are necessary!");
          return;
      }

      if (!validFilesTypes.find(type => type === file.type)) {
        console.log("File must be in JPG/PNG format")
        return;
      }

      const formData = new FormData();
      formData.append("image", file)
      console.log("image file", file)
      formData.append("title", postForm.title)
      formData.append("content", postForm.content)

      try {
          const res = await fetch("http://localhost:4000/posts", {
              method: "POST",
              headers: {
                  "Authorization": token && token.accessToken ? `Bearer ${token.accessToken}` : '',
                //   'Content-Type': 'multipart/form-data',
              },
              body: formData
          });

          if (!res.ok) {
            // router.push('/login')
            console.log("error")
          } else {
                await res.json().then(data => {

                // setPostForm({...postForm, id: data.id, user: {username: user.username}})
                setPostForm(data)
                console.log("from create form postform", postForm)
                posts.push(postForm)
                userPosts.push(postForm)
                setPosts(posts)
                setUserPosts(userPosts)
    
                const storedPosts = localStorage.getItem('posts');
                const allPosts = storedPosts ? JSON.parse(storedPosts) : null;
                if (storedPosts && allPosts) {
                    allPosts.push(postForm); 
                }
                localStorage.setItem('posts', JSON.stringify(allPosts));
    
                const storedUserPosts = localStorage.getItem('userPosts');
                const allUserPosts = storedUserPosts ? JSON.parse(storedUserPosts) : null;
                if (storedUserPosts && allUserPosts) {
                    allUserPosts.push(postForm)
                }
                localStorage.setItem('userPosts', JSON.stringify(allUserPosts));
              
            });
            const form = e.target as HTMLFormElement;
            form.reset();
            router.push('/dashboard/userposts')
        } 
      } catch (error) {
          console.log("Error during creating post: ", error);
      }
  }

  return (
    <>
      { token.accessToken ? 
        <CreatePostForm handleSubmit={handleSubmit}/> :
        <Loading />
      }
    </>
  )
}

export default withAuth(CreatePost)