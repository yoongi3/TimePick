import { createContext, useContext, useState } from "react";

type UserContextType = {
    login: (newName?: string, newID ?:string) => void;
    logout: () => void;
    displayName: string;
    activeUser: string;
}

const UserContext = createContext < UserContextType | undefined > (undefined);

export const UserProvider = ({ children }) => {
    const [ activeUser, setActiveUser ] = useState("")
    const [ displayName, setName ] = useState("");

    const login = async (newName: string = "", newID: string = "") =>{
        setActiveUser(newID)
        setName(newName);
    }

    const logout = () =>{
        setActiveUser(undefined)
        setName("");
    }

    return(
        <UserContext.Provider value={{ login, logout, displayName, activeUser }}>
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