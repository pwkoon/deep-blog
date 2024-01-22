import Link from 'next/link'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

type Props = {
    post: {
        id: string,
        title: string,
        content: string,
        photo: string,
        created_at: string,
        updated_at: string,
        user: {
            username: string
          }
    },
    username: string,
    handleDelete: (post: any)=> void,
    handleEdit: (post: any)=> void
}

const Post = ({post, username, handleDelete, handleEdit}: Props) => {

    const [scrolled, setSrolled] = useState(false);

    const router = useRouter();
    const handleClick = () => {
        localStorage.removeItem('single post')
        router.back()
    }

    useEffect(() => {
        const handleScroll = () => {
            setSrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className='p-5 bg-deep-header text-center mx-auto scroll-smooth' id='top'>
            <Link href="/dashboard" onClick={handleClick} className={`font-mono hover:outline-double sticky top-0 z-50 ${scrolled ? 'bg-black text-white p-3 ease-in duration-200' : 'bg-deep-header p-3 ease out duration-200' } `}>
                ...Back... 
            </Link>
            {/* <Link href={'#top'} className='sticky top-0 z-50'>
                <ArrowUpCircleIcon className='bg-black text-white w-10 mx-auto'/>
            </Link> */}
            <section className='h-auto bg-deep-green m-7 grid grid-cols p-5'>
                <div className='mx-auto'>
                    {
                        post.photo ? 
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={post.photo} width={400} height={400} alt="post image"/>
                        // <Image src={post.photo} width={400} height={400} alt="post image"/>
                        :
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="/jungle.jpg" width={400} height={400} alt="post image"/>
                    }     
                </div>
                <div className='grid grid-flow-col justify-items-center gap-5 text-white p-4'> 
                    <p>Author: {post.user.username}</p> 
                    <p>Published on {post.created_at}</p>
                </div>
                <div className='m-2 p-5'>
                    <h1 className='text-6xl text-font-sand font-mono'>.. {post.title}..</h1>
                </div>
                <hr/>
                <div className='grid grid-flow-col justify-items-center text-white p-4'>
                    {
                        post.user.username === username ? 
                        <button className="bg-button-edit text-white p-3" onClick={() => handleEdit && handleEdit(post)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                        </button> :
                        null
                        }
                        {
                        post.user.username === username ? 
                        <button className="bg-button-delete text-white p-3" onClick={() => handleDelete && handleDelete(post)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                        </button> :
                        null
                    }
                </div>
                <div className=' bg-deep-header' style={{margin: '3rem 15rem', lineHeight: '1.8'}}>
                    {parse(post.content)}
                </div>
            </section>
        </div>
    )
}


export default Post