import { atom, useAtom } from 'jotai';

const Token = {
  accessToken: "",
  refreshToken: ""
};

const Post = {
  id: "",
  title: "",
  content:"",
  photo: "",
  user: {username:""}
}

const UserPost = {
  id: "",
  title: "",
  content:"",
  photo: "",
  user: {username:""}
}

const User = {
  id: "",
  username: "",
  email:""
}

const SinglePost = {
  id: "",
  title: "",
  content:"",
  photo: ""
}

const CreatePost = {
  id: "",
  title: "",
  content: "",
  photo: "",
  user: {username:""}
}

const UpdatePost = {
  id: "",
  title: "",
  content: ""
}

export const fileAtom = atom<File | null>(null);
export const useFile = () => {
  const [ file, setFile ] = useAtom(fileAtom);
  return { file, setFile }
}


export const EditPost = atom(UpdatePost);
export const useEditPost = () => {
  const [editPost, setEditPost] = useAtom(EditPost);
  return { editPost, setEditPost }
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