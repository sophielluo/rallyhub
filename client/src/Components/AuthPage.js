import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../Components/ui/button';
import { Input } from '../Components/ui/input';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import TennisBackground from "../Assets/tennis-court-background-blue.jpg";
import { auth } from '../firebase.js'; // Import auth from firebase.js
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from 'firebase/auth';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setActiveTab('signup');
    } else {
      setActiveTab('login');
    }
  }, [location]);
  
  const handleAuthSuccess = (user) => {
    console.log('Authenticated user:', user);
    // TODO: add logic to send user data to backend
    // Check if there's a returnTo path in the location state
    const returnTo = location.state?.returnTo || '/booking';
    navigate(returnTo);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    try {
      let userCredential;
      if (activeTab === 'signup') {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;
      console.log('Authenticated user:', user);
      handleAuthSuccess(userCredential.user);
      // TODO: add logic to send user data to backend
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google authenticated user:', user);
      // TODO: add logic to send user data to backend
      handleAuthSuccess(user);
    } catch (error) {
      if (error.code === 'auth/cancelled-popup-request') {
        console.log('Google sign-in was cancelled');
      } else {
        console.error('Google authentication error:', error);
      }
    }
  };

  const handleFacebookAuth = () => {
    // not implemented
    console.log('Facebook auth not implemented');
  };

  const AuthForm = ({ isSignUp }) => (
    <form onSubmit={handleEmailAuth} className="auth-form">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit">
        {isSignUp ? 'Sign Up' : 'Login'}
      </Button>
    </form>
  );

  const SocialAuth = () => (
    <div>
      <button className="social-auth-button" onClick={handleGoogleAuth}>
        <FcGoogle />
        Continue with Google
      </button>
      <button className="social-auth-button" onClick={handleFacebookAuth}>
        <FaFacebook color="#1877F2" />
        Continue with Facebook
      </button>
    </div>
  );

  return (
    <div
      className="auth-page-container"
      style={{
        backgroundImage: `url(${TennisBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="auth-card">
        <h3>Welcome to RallyHub</h3>
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        {activeTab === 'login' ? <AuthForm isSignUp={false} /> : <AuthForm isSignUp={true} />}
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="auth-separator">
          <span>Or continue with</span>
        </div>
        <SocialAuth />
      </div>
    </div>
  );
};

export default AuthPage;
