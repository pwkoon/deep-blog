type Props = {
  post: {
      id: string,
      title: string,
      content: string
  },
  handleClick: (post: any)=> void
}

const PostCard = ({post, handleClick}: Props) => {

  return ( 
    <div className="p-3 max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.title}</div>
        <p className="text-gray-700 text-base">
          {post.content}
        </p>
        <button onClick={() => handleClick && handleClick(post)}>Read more</button>
      </div>
    </div>
  )
}

export default PostCard;
