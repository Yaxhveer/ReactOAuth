import { createContext, useContext, useEffect } from "react";
import { useState } from "react";

interface userDataType {
    email: string
    family_name: string
    given_name: string
    id: string
    locale: string
    name: string
    picture?: string
    verified_email: boolean
}

interface authContextType {
    auth: boolean;
    setAuth: (c: boolean) => void;
    userData: userDataType | null;
    setUserData: (c: userDataType | null) => void;
    loading: boolean;
    fetchUserData: (c: string) => void;
    logout: () => void
}

interface Props {
    children: React.ReactNode
}

const AuthContext = createContext<authContextType>({
    auth: false,
    setAuth: () => {},
    userData: null,
    setUserData: () => {},
    loading: true,
    fetchUserData: () => {},
    logout: () => {}
});

export const useAuth = () => useContext(AuthContext);


const AuthProvider:React.FC<Props> = ({ children }) => {

    const [ loading, setLoading ] = useState<boolean>(true);
    const [ auth, setAuth ] = useState<boolean>(false);
    const [ userData, setUserData ] = useState<userDataType | null>(null);
    
    const fetchUserData = async (accessToken: string) => {
        try {
            const data = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            const formattedData = await data.json()
            setUserData(formattedData);
            setAuth(true);
        }
        catch (e) {
            setAuth(false);
            setUserData(null);
            console.error('Error fetching user profile:', e);
        }
        finally {
            setLoading(false);
        }
    }

    const logout = () => {
        setLoading(true);
        console.log(44);
        localStorage.removeItem('token');
        setAuth(false);
        setUserData(null);
        window.location.pathname = '/';
        setLoading(false)
    };

    const value = { auth, setAuth, userData, setUserData, loading, fetchUserData, logout };

    useEffect(() => {
        setLoading(true);
        const token: string | null = localStorage.getItem('token');
        
        if (token) fetchUserData(token);
        else {
            setAuth(false);
            setUserData(null);
            setLoading(false);
        }
        
    }, [])

    return (<>
        <AuthContext.Provider value={value}>
            
            {!loading && children}
        </AuthContext.Provider>
        </>
    );
}

export default AuthProvider;