type Props = {
  post: {
      id: string,
      title: string,
      content: string
  },
  handleClick: (post: any)=> void,
  handleDelete: (post: any)=> void
}

const PostCard = ({post, handleClick, handleDelete}: Props) => {


  return ( 
    <div className="bg-font-sand p-3 max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="py-5">
          {post.content}
        </p>
        <div className="text-center">
          <button className="bg-deep-header p-3 m-2" onClick={() => handleClick && handleClick(post)}>Read more</button>
          {/* Only the creator can delete the post */}
          <button className="bg-button-delete text-white p-3" onClick={() => handleDelete && handleDelete(post)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
