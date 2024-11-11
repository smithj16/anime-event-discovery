/// components/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoadingScreenPage from '@/pages/loading';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
      if (!userInfo) {
        // Redirect to login page if not authenticated
        router.push('/login');
      }
    }, [userInfo, router]);

    // If userInfo is null, show a loading page
    if (!userInfo) {
      return <LoadingScreenPage/>;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
