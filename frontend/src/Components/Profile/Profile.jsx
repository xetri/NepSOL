import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import SolanaIcon from "../../assets/solana.png";

import { ServerURL, SolanaEndpoint } from "../../config";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext"
import { useEffect } from "react";

const Profile = () => {
  const goto = useNavigate();
  const { user, loading } = useAuth();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  const connection = new Connection(SolanaEndpoint, "confirmed");

  const { setVisible } = useWalletModal();
  const { publicKey, connect, connected, disconnect, signTransaction } = useWallet();

  const [amount, setAmount] = useState(0.1);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${ServerURL}/api/profile/${id}`);
        const resp_data = await response.json();
        setProfile(resp_data.data);
      } catch (error) {
        goto("/404");
        console.error("Error fetching profile:", error);
      }
    })();
  }, [id]);

  if (user) {
    const userId = user.email.split("@")[0];
    if (id === userId) {
      goto("/dashboard");
    }
  }

  const Tip = async () => {
    try {
      if (!connected) {
        try {
          await connect();
        } catch {
          toast("Connect your wallet to tip");
          setVisible(true);
        }
        return;
      }

      if (!publicKey) {
        toast.error("Wallet not connected");
        return;
      }

      if (!profile || !profile.wallet) {
        toast.error("Profile wallet address not available");
        return;
      }

      if (profile.wallet === publicKey.toString()) {
        toast.error("You cannot tip yourself");
        return;
      }

      // Create and send the transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(profile.wallet),
          lamports: amount * LAMPORTS_PER_SOL, 
        })
      );
      transaction.feePayer = publicKey;
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;

      const signedTx = await signTransaction(transaction)
      const sig = await connection.sendRawTransaction(signedTx.serialize());
      const signature = await connection.confirmTransaction(sig, "confirmed");

      console.log("Transaction successful with signature:", signature);
      toast.success("Tip sent successfully!");
    } catch (err) {
      console.error("Error sending tip:", err);
      toast.error("Failed to send tip");
    }
  }
  
  // if (loading) {
  //     return <h1>Loading...</h1>
  // }

  return (
    <div className="profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <img
          src={profile && profile.picture}
          alt="Profile"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="profile-name">{profile && profile.name}</h2>
          <p className="profile-username">@{id}</p>
          <div className="profile-meta">
            <span>Joined {profile && profile.createdAt && new Date(profile.createdAt).toDateString()}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button onClick={Tip} className="tip-btn">
            <img style={{ marginLeft: "-0.25rem" }} src={SolanaIcon} alt="Solana" className="solana-icon" />
            <p>Tip</p>
          </button>
          {
            connected && <>
              <button className="btn" onClick={async () => {
                await disconnect();
              }}>
                Disconnect Wallet
              </button>
            </>
          }
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div className="stat-box">
          <h3>{profile?.earned != null ? profile.earned : "0"} SOL</h3>
          <p>Total Earned</p>
        </div>
        <div className="stat-box">
          <h3>{profile?.tips != null ? profile.tips : "0"}</h3>
          <p>Tips Received</p>
        </div>
      </div>

    </div>
  );
};

export default Profile;
