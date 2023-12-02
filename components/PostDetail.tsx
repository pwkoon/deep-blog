import { useRouter } from 'next/navigation'

type Props = {
    post: {
        id: string,
        title: string,
        content: string
    }
}

const Post = ({post}: Props) => {

    const router = useRouter();
    const handleClick = () => {
        localStorage.removeItem('single post')
        router.back()
    }

    return (
        <>
            <section className='p-4'>
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
                <button onClick={handleClick}>Back</button>
            </section>
        </>
    )
}

export default Post