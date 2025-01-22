import { Route, Routes, useNavigate } from 'react-router';
import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import StoryCreation from './Components/ShowCreation';
import HomePage from './Components/Homepage';
import { jwtDecode } from 'jwt-decode';
import Stories from './Components/Stories';
import StoryRead from './Components/StoryRead';

function App() {
  const navigate = useNavigate();

  function handleLogin(userData) {
    const { access_token } = userData;

    // Decode the JWT token to get its expiry time
    const decodedToken = jwtDecode(access_token);
    const tokenExpiry = decodedToken.exp * 1000; // Convert seconds to milliseconds

    // Store access_token and expiry time
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('token_expiry', tokenExpiry);

    // Set timer to check when the token expires
    startTimer(tokenExpiry);
  }

  function startTimer(expiryTime) {
    const currentTime = Date.now();
    const timeUntilExpiry = expiryTime - currentTime;

    if (timeUntilExpiry > 0) {
      setTimeout(() => {
        navigate('/login');
      }, timeUntilExpiry);
    } else {
      navigate('/login');
    }
  }

  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login onLogin={handleLogin} />} />
        <Route path='/story-creation' element={<StoryCreation />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/stories' element={<Stories />} />
        <Route path='/story-read/:storyId' element={<StoryRead />} />
      </Routes>
    </>
  );
}

export default App;
