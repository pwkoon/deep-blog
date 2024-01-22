import Image from 'next/image' 
import parse from 'html-react-parser';
import Head from 'next/head';

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
  handleClick: (post: any)=> void,
}

const PostCard = ({post, handleClick}: Props) => {
  
  return ( 
    <>
      {/* <Head>
      <meta http-equiv="Cache-control" content="public" />
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      </Head> */}
      <div className="bg-font-sand p-3 max-w-sm rounded overflow-hidden shadow-lg">
        {
          post.photo ? 
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.photo} width="600" height="600" alt="post image"/>
            // <Image src={post.photo} width={600} height={600} alt="post image"/>
          :
            <Image src="/jungle.jpg" width={600} height={600} alt="post image" priority/>
        }      
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{post.title}</div>
          <div>{parse(post.content.slice(0,100))}...</div>
          <div className="text-center">
            <button className="bg-deep-header p-3 m-2" onClick={() => handleClick && handleClick(post)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostCard;
