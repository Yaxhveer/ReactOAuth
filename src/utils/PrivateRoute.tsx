import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

interface Prop {
    Component: React.ReactNode;
}

const PrivateRoute: React.FC<Prop> = ({ Component }) => {
    
    const { auth, loading } = useAuth();
    console.log(loading);
    
    while(loading) true;
        console.log(auth, loading);
    
    if (auth) return Component;
    else return <Navigate to="/" />;
};

export default PrivateRoute;