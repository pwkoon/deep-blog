import Link from 'next/link'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser';

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
    }
}

const Post = ({post}: Props) => {
    const router = useRouter();
    const handleClick = () => {
        localStorage.removeItem('single post')
        router.back()
    }

    return (
        <div className='p-5 bg-deep-header text-center mx-auto'>
            <Link href="/dashboard" onClick={handleClick} className='font-mono hover:outline-double'>...Back home...</Link>
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
                <div className='text-white' style={{margin: '3rem 15rem', lineHeight: '1.8'}}>
                    <p>{parse(post.content)}</p>
                </div>
            </section>
        </div>
    )
}

export default Post