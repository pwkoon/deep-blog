import Link from 'next/link'
import { useRouter } from 'next/navigation'
import parse from 'html-react-parser';

type Props = {
    post: {
        id: string,
        title: string,
        content: string,
        photo: string
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
                        <img src={post.photo} width={600} height={600} alt="post image"/>
                        // <Image src={post.photo} width={600} height={600} alt="post image"/>
                        :
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src="/jungle.jpg" width={600} height={600} alt="post image"/>
                    }     
                </div>
                <div className='m-2'>
                    <h1 className='text-6xl text-font-sand font-mono'>.. {post.title}..</h1>
                </div>
                <div className='text-white' style={{margin: '3rem 15rem', lineHeight: '1.8'}}>
                    <p>{parse(post.content)}</p>
                </div>
            </section>
        </div>
    )
}

export default Post