
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Header from "@/components/Header";
import { login, register } from "@/lib/api";

type User = {
  email: string;
  id: number;
};

const Panel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const userData = isLogin
        ? await login(email, password)
        : await register(email, password);
  
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      toast.success(isLogin ? "Successfully logged in!" : "Successfully registered!");
    } catch (error: any) {
      toast.error(error.message || "Login/Registration failed.");
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success("Successfully logged out!");
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <Header isLoggedIn={true} onLogout={handleLogout} />
        
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Control Panel</h1>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="mr-2"
              >
                Go to Dashboard
              </Button>
            </div>
            <p className="text-xl mb-8 text-gray-300">
              Welcome, {user?.email}!
            </p>
            
            <div className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-gray-400">Image placeholder</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-gray-400">Image placeholder</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-gray-400">Image placeholder</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4 aspect-video flex items-center justify-center">
                  <p className="text-gray-400">Image placeholder</p>
                </div>
              </div>
            </div>
            
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header isLoggedIn={false} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-lg">
          <h1 className="text-3xl font-bold mb-6">
            {isLogin ? "Login" : "Register"}
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-700 border-gray-600"
              />
            </div>
            
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-400 hover:underline"
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </button>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-700">
            <Button asChild variant="outline" className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
