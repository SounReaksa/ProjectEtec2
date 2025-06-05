import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }
      const data = await res.json();

      localStorage.setItem("id", data.id);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    if(id){
        setIsAuthenticated(true)
    }else{
        setIsAuthenticated(false)
    }
  }, []);

  return (
    <>
      <AuthContext.Provider value={{ register, isAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthProvider;
