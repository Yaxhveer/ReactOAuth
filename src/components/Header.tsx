import { AppBar, Toolbar } from "@mui/material"
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from '@mui/icons-material/Home';
import Container from "@mui/material/Container"
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from "@mui/material/DialogActions/DialogActions";
import Dialog from '@mui/material/Dialog';
import { Link } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { useAuth } from "../context/authContext";

export interface SimpleDialogProps {
    open: boolean;
    handleClose: () => void;
    handleGoogleLogin: () => void;
}

const SimpleDialog:React.FC<SimpleDialogProps> = ({open, handleClose, handleGoogleLogin}) => {

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle mx={4} mt={1}>Welcome</DialogTitle>
            <DialogActions>
                <Button onClick={handleGoogleLogin}>Google Login</Button>
            </DialogActions>
        </Dialog>
    );
}

const Header: React.FC = () => {

    const [open, setOpen] = useState<boolean>(false);
    const { userData, auth, fetchUserData } = useAuth();

    const handleGoogleLogin = () => {
        const clientId = '284689616504-k5govtd2uudjo05ap23jhafjqs99cg8i.apps.googleusercontent.com';
        
        console.log(clientId);
        
        const redirectUri = 'http://localhost:5173/profile'; 
        const scope = 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
        const responseType = 'token';

        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;      
    };

    const handleOAuthResponse = () => {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = localStorage.getItem('token') || params.get('access_token');

        if (accessToken) {
            localStorage.setItem('token', accessToken);
            fetchUserData(accessToken);
        }
    };

    useEffect(() => {
        handleOAuthResponse();
    }, []);

    const handleClickOpen = () => {
        !auth && setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
            <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>

                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                        <Link to='/' style={{ color: 'white' }}>
                        <HomeIcon />
                    </Link>
                </IconButton>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleClickOpen}
                    color="inherit"
                >
                    {
                        auth 
                            ? <Link to='/profile' style={{ color: 'white' }}>
                                <Avatar alt={userData?.name} src={userData?.picture} />
                            </Link> 
                            : <AccountCircle />

                    }
                </IconButton>
                {!auth &&
                        <SimpleDialog
                        open={open}
                        handleClose={handleClose}
                        handleGoogleLogin={handleGoogleLogin} 
                        />
                }
            </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;