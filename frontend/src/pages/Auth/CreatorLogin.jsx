import { useNavigate } from 'react-router';
import { useWallet } from "@solana/wallet-adapter-react";

import { ServerURL} from "../../config";
import CenteredContainer from './Centercontainer';
import logo from '../../assets/googleicon.png';
import "./CreatorLogin.css"

import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext';

const CreatorLogin = () => {
  const { user, logout } = useAuth();
  const goto = useNavigate();

  async function SignInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);
    const token = await res.user.getIdToken();

    fetch(`${ServerURL}/api/auth/google`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    }).then(_ => {
      goto("/dashboard");
    }).catch(e => {
      console.log(e.message)
    });
  }

  const { connected, disconnect } = useWallet();

  async function SignOut() {
    try {
      await logout();
      if (connected) {
        await disconnect();
      };
    } catch (err) {
      console.error("Failed to logout:", err);
    }
  }

  return (
    <CenteredContainer
      title="Creator Login"
      footer="For supporters: Just connect your wallet to tip creators"
    >
      <div>
        <div className="login-buttons">
            {
              user ? 
                <div>
                  <p>
                    Already Logged In as {user.displayName}
                  </p>
                  <button type="button" className="signin-button2" onClick={SignOut}>
                    <p>
                      Logout
                    </p>
                  </button>
                </div>
              : 
              <button type="button" className="signin-button2" onClick={SignInWithGoogle}>
                  <img src={logo} alt="logo" className='icon'/>
                  <p>
                    Login with Google
                  </p>
              </button>
            }
        </div>
      </div>
    </CenteredContainer>
  );
};

export default CreatorLogin;
