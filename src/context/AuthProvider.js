import { createContext, useState } from "react";
const AuthContexte = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContexte.Provider value={(auth, setAuth)}>
            {children}
        </AuthContexte.Provider>
    )
}

export default AuthContexte;