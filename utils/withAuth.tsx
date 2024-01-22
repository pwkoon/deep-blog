// withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToken } from '@/atom';

const withAuth = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const Auth = (props: P) => {
    const router = useRouter();
    const { token, setToken } = useToken()

    useEffect(() => {
      if (!token.accessToken) {
      
        router.replace('/login');
      }
    }, []);

    // Render the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;

