import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from "@mui/material/Typography"
import { useState, useEffect } from 'react'
import { useAuth } from '../context/authContext';


const Profile: React.FC = () => {

    const { userData, setUserData, logout } = useAuth();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(()=>{
        const fetchUserData = (accessToken: string) => {
            fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('User Profile: ', data);
                    setUserData(data);
                })
                .catch((error) => {
                    console.error('Error fetching user profile:', error);
                });
        }
        const token: string | null = localStorage.getItem('token');
        token && fetchUserData(token);
        setLoading(false);
    }, [])

    return (!loading &&
            <Container maxWidth='xl' sx={{mt:2, textAlign:'center'}}>
            <Typography variant="h5">
                    Name: {userData?.name}
                </Typography>
            <Typography variant="h5">
                    Email: {userData?.email}
            </Typography>

            <Button onClick={logout} sx={{mt:4}}>Logout</Button>
            </Container>
    )
}

export default Profile;
