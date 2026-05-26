import { useNavigate } from "react-router";
import { useAuthContenxt } from "../context/AuthContext";
import toast from "react-hot-toast";

function useAuth() {
  const navigate = useNavigate();
  const { user, token, setUser, setToken } = useAuthContenxt();
  function checkLogin() {
    if (user && token) return true;
    return false;
  }

  function logoutUser() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  }

  function loginUserLocal(token, user) {
    if (!token || !user) {
      toast.error("Invalid login !");
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  }

  return [checkLogin, logoutUser, loginUserLocal];
}

export default useAuth;
