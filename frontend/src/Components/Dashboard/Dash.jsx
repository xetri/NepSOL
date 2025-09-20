import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import SolanaIcon from "../../assets/solana.png";
import "./Dash.css";
import { ServerURL } from "../../config";
import { useAuth } from "../../context/AuthContext";

export default function Dash() {
  const { user, loading } = useAuth();
  const goto = useNavigate();
  const [walletAddress, setWalletAddress] = useState(null);

  const [meta, setMeta] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await user.getIdToken();
        const id = user.email.split("@")[0];
        const response = await fetch(`${ServerURL}/api/profile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        const { data } = await response.json();

        if (data && data.id) {
            setMeta(data);
        }
        } catch (err) {
          console.error("Failed to fetch profile metadata:", err);
      }
    })();
  }, []);

  const activities = meta && meta.views ? meta.views : [];
  
  const { setVisible } = useWalletModal();
  const { publicKey, connected, disconnect, connecting } = useWallet();

  useEffect(() => {
    (async () => {
      try {
        const id = user.email.split("@")[0];
        const response = await fetch(`${ServerURL}/api/wallet/address/${id}`);
        const data = await response.json();
        if (data && data.wallet) {
          setWalletAddress(data.wallet);
        }
      } catch (err) {
        console.error("Failed to fetch linked wallet:", err);
      }
    })();
  }, [user]);

  useEffect(() => {
    if (connected && publicKey) {
      setWalletAddress(publicKey.toBase58());

      (async function() {
        try {
          const token = await user.getIdToken();

          await fetch(`${ServerURL}/api/wallet/link`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, wallet: publicKey.toBase58() }),
          });
        } catch (err) {
          setWalletAddress(null);
          await disconnect();
          console.error("Failed to link wallet:", err);
        }
      })();
    }
  }, [connected, publicKey]);
  
  const LinkWallet = async () => {
    try {
      setVisible(true);
    } catch (err) {
      console.error("Failed to connect wallet:", err);
    }
  }
    
  const UnlinkWallet = async () => {
    try {
      const token = await user.getIdToken();

      await disconnect();
      setWalletAddress(null);

      await fetch(`${ServerURL}/api/wallet/unlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, })
      });
    } catch (err) {
      console.error("Failed to disconnect wallet:", err);
    }
  }

  if (!loading && !user) {
    goto("/login");
  }
  
  return (
    <div className="app">
      {/* Header */}
      <header className="dashboard-header">
        <div className="profile">
          <img
            src={user?.photoURL}
            alt="Profile"
            className="profile-img"
          />
          <div>
            <h2>{user?.displayName}</h2>
            <p>@{user?.email.split("@")[0]}</p>
          </div>
        </div>

        <div className="header-buttons">
          {walletAddress ? (
              <>
                <p className="btn-text" onClick={() => {
                  navigator.clipboard.writeText(walletAddress);
                }} >
                  <img src={SolanaIcon} alt="Solana" className="solana-icon" />
                  {walletAddress}
                </p>
                <button className="btn" onClick={UnlinkWallet} disabled={connecting}>
                  Unlink
                </button>
              </>
            ) : (
              <>
                <button className="btn" onClick={LinkWallet} disabled={connecting}>
                  <img src={SolanaIcon} alt="Solana" className="solana-icon" />
                  Link Wallet
                </button>
              </>
            )}
        </div>
      </header>

      {/* Stats */}
      <div className="stats">
        <div className="stat-card">
          <h4>Total Earnings</h4>
          <h4>{meta?.earned != null ? meta.earned : "0"} SOL</h4>
        </div>
        <div className="stat-card">
          <h4>Tips received</h4>
          <h4>{meta?.tips != null ? meta.tips : "0"}</h4>
        </div>
      </div>

      {/* Main Content */}
        {/* History */}
      <div className="main-content">
        <div className="recent-activity">
          <h3>History</h3>
          <ul>
            {activities.length > 0 && activities.map((act, index) => (
              <li key={index}>
                <div className="avatar">{act.sender}</div>
                <div className="activity-info">
                  <p>{act.text}</p>
                  <span>{act.time}</span>
                </div>
              </li>
            ))}
            {
              activities.length === 0 && <p>No recent activity</p>
            }
          </ul>
        </div> 
       </div>

    </div>
  );
}
