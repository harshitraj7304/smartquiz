import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <AuthContext.Provider value={{ token, user, setToken, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// token , user
export const useAuthContenxt = () => useContext(AuthContext);
