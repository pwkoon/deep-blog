"use client";

import { useRouter } from 'next/navigation';
import PostDetail from '@/components/PostDetail';

const PostId = () => {

    const router = useRouter();

    // RETRIEVE SINGLE POST FROM LOCAL STORAGE 
    const loadSinglePostFromLocalStorage = () => {
        const singlePost = localStorage.getItem('single post');
        return singlePost ? JSON.parse(singlePost) : null;
    };

    const singlePost = loadSinglePostFromLocalStorage();

    return (
        <>
            <PostDetail post={singlePost} />
            <button onClick={() => router.back()}>Back</button>
        </>
    )
}

export default PostId