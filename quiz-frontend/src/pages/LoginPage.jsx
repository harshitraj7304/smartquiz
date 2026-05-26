import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router";
import { ca } from "zod/v4/locales";
import { loginUser } from "../services/AuthService";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useAuthContenxt } from "../context/AuthContext";
import useAuth from "../hooks/useAuth";
function LoginPage() {
  const navigate = useNavigate();
  const { setToken, setUser, token, user } = useAuthContenxt();
  const [checkLogin, logoutUser, loginUserLocal] = useAuth();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    // Add your login API logic here

    // server ko ye rha mera login detail---:

    try {
      setLoading(true);
      const result = await loginUser(formData);
      console.log(result);
      toast.success("Login success..");
      loginUserLocal(result.accessToken, result.user);

      navigate("/users");
    } catch (error) {
      console.log(error);
      if (error.status == 400) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error("Error in login");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-4 lg:mt-15 flex items-center justify-center bg-background text-foreground px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-md border-border/40">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-semibold">
              Welcome Back
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <>
                    <Spinner /> {"Please wait.."}
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm text-muted-foreground flex flex-col gap-2">
            <a
              onClick={() => {
                if (formData.email && formData.email.trim().length > 4) {
                  //__
                  // call server--> otp bhej de
                  // formData email

                  //forgot page:
                  navigate("/forgot-password");
                }
              }}
              href="#"
              className="text-primary hover:underline"
            >
              Forgot password?
            </a>
            <p>
              Don’t have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default LoginPage;
