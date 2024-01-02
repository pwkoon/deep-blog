import Image from 'next/image' 

type Props = {
  post: {
      id: string,
      title: string,
      content: string,
      photo: string
  },
  handleClick: (post: any)=> void,
  handleDelete: (post: any)=> void,
  handleEdit: (post: any)=> void
}

const PostCard = ({post, handleClick, handleDelete, handleEdit}: Props) => {
  
  return ( 
    <div className="bg-font-sand p-3 max-w-sm rounded overflow-hidden shadow-lg">
      {
        post.photo ? 
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.photo} width="700" height="600" alt="post image"/>
          // <Image src={post.photo} width={600} height={600} alt="post image"/>
        :
          <Image src="/jungle.jpg" width={600} height={600} alt="post image"/>
      }      
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="py-5">
          {post.content}
        </p>
        <div className="text-center">
          <button className="bg-deep-header p-3 m-2" onClick={() => handleClick && handleClick(post)}>Read more</button>
          {/* Only the creator can delete the post */}
          <button className="bg-button-delete text-white p-3 m-2" onClick={() => handleDelete && handleDelete(post)}>Delete</button>
          <button className="bg-button-edit text-white p-3" onClick={() => handleEdit && handleEdit(post)}>Edit</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
