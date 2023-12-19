import { createContext, useContext, useState } from "react";
import { addParticipantToEvent } from "../Services/EventService";

type UserContextType = {
    isLoggedIn: boolean;
    login: (newName?: string) => void;
    logout: () => void;
    displayName: string;
    id: string;
}

const UserContext = createContext < UserContextType | undefined > (undefined);

export const UserProvider = ({ children }) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ displayName, setName ] = useState("");
    const [ id, setID ] = useState("");

    const login = async (newName: string = "", newID: string = "") =>{
        setIsLoggedIn(true);
        setName(newName);
        setID(newID);
    }

    const logout = () =>{
        setIsLoggedIn(false);
        setName("");
        setID("");
    }

    return(
        <UserContext.Provider value={{ isLoggedIn, login, logout, displayName, id }}>
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