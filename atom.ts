import { atom, useAtom } from 'jotai';

const Token = {
  accessToken: "",
  refreshToken: ""
};

const Post = {
  id: "",
  title: "",
  content:"",
}

const UserPost = {
  id: "",
  title: "",
  content:""
}

const User = {
  id: "",
  username: "",
  email:""
}

const SinglePost = {
  id: "",
  title: "",
  content:""
}

// const SelectedPost = ""

const CreatePost = {
  id: "",
  title: "",
  content: ""
}

const Delete = {
  id: "",
  title: "",
  content: ""
}

export const DeletePost = atom(Delete);
export const useDeletePost = () => {
  const [deletePost, setDeletePost] = useAtom(DeletePost);
  return { deletePost, setDeletePost }
}


export const tokenAtom = atom(Token);
export const useToken = () => {
  const [token, setToken] = useAtom(tokenAtom);
  return { token, setToken };
};

export const Posts = atom([Post])
export const usePost = () => {
  const [posts, setPosts] = useAtom(Posts);
  return { posts, setPosts }
}

export const UserPosts = atom([UserPost])
export const useUserPost = () => {
  const [userPosts, setUserPosts] = useAtom(UserPosts);
  return { userPosts, setUserPosts }
}

export const currentUser = atom(User)
export const useUser = () => {
  const [user, setUser] = useAtom(currentUser);
  return { user, setUser }
}

// export const SelectedPostId = atom(SelectedPost)
// export const useSelectedPost = () => {
//   const [selectedPost, setSelectedPost] = useAtom(SelectedPostId);
//   return { selectedPost, setSelectedPost }
// }

export const PostDetail = atom(SinglePost)
export const usePostDetail = () => {
  const [postDetail, setPostDetail] = useAtom(PostDetail);
  return { postDetail, setPostDetail }
}

export const PostForm = atom(CreatePost)
export const usePostForm = () => {
  const [postForm, setPostForm] = useAtom(PostForm);
  return { postForm, setPostForm }
}