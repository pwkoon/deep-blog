import { atom, useAtom } from 'jotai';

const Token = {
  accessToken: "",
  refreshToken: ""
};

const Post = {
  id: "",
  title: "",
  content:""
}

const User = {
  email:"",
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

export const currentUser = atom(User)

export const useUser = () => {
  const [user, setUser] = useAtom(currentUser);
  return { user, setUser }
}