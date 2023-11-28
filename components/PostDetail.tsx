import Link from 'next/link'
import React from 'react'

type Props = {
    post: {
        id: string,
        title: string,
        content: string
    }
}

const Post = ({post}: Props) => {
  return (
    <>
        <section className='p-4'>
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
        </section>
    </>
  )
}

export default Post