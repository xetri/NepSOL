import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children, auth }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return unsubscribe;
    }, [auth]);

    const value = {
        user,
        loading,
        logout: async () => await auth.signOut()
    };
    
    // if(user) {
    //     value.user = {
    //         id: user.email.split("@")[0],
    //         uid: user.uid,
    //         name: user.displayName,
    //         picture: user.photoURL,
    //         createdAt: new Date(user.createdId)
    //     };
    // }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}