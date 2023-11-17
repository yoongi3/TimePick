import { createContext, useContext, useState } from "react";

type UserContextType = {
    isLoggedIn: boolean;
    login: (newName?: string) => void;
    logout: () => void;
    name: string;
}

const UserContext = createContext < UserContextType | undefined > (undefined);

export const UserProvider = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ name, setName ] = useState("")

    const login = (newName = "") =>{
        setIsLoggedIn(true);
        setName(newName);
    }

    const logout = () =>{
        setIsLoggedIn(false);
        setName("");
    }

    return(
        <UserContext.Provider value={{ isLoggedIn, login, logout, name }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}