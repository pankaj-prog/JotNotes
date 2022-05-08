import { useContext, createContext, useState } from "react";

const AuthContext = createContext(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [encodedToken, setEncodedToken] = useState(
    localStorage.getItem("encodedToken")
  );

  const isLoggedIn = Boolean(encodedToken);

  return (
    <AuthContext.Provider
      value={{
        encodedToken,
        isLoggedIn,
        setEncodedToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };
