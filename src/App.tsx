import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';
import AuthProvider from './context/authContext';
import Box from "@mui/material/Box"

const App = () => {
  const imageURL: string = 'https://img.freepik.com/free-photo/blue-abstract-gradient-wave-wallpaper_53876-108364.jpg?w=996&t=st=1693323591~exp=1693324191~hmac=0214d4d5d492c1936111a55762150e0cfbfabd3a61f064c953b3a932ba9d30d1'
  return (
    <AuthProvider>
      <Router>
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageURL})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<PrivateRoute Component={<Profile />} />} />
        </Routes>
        </Box>
      </Router>
    </AuthProvider>
)};

export default App;
