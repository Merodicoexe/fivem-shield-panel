
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveDbConfig, getDbConfig, testConnection } from "@/utils/db";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const DbConfig = () => {
  const navigate = useNavigate();
  const [host, setHost] = useState<string>("46.247.109.27");
  const [port, setPort] = useState<string>("3306");
  const [user, setUser] = useState<string>("u4_VseEFf3sJj");
  const [password, setPassword] = useState<string>("");
  const [database, setDatabase] = useState<string>("s4_test");
  const [testing, setTesting] = useState<boolean>(false);
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        toast.error("Please login to access the database configuration");
        navigate("/panel");
      }
    };
    
    const loadConfig = () => {
      const config = getDbConfig();
      if (config) {
        setHost(config.host);
        setPort(config.port.toString());
        setUser(config.user);
        setPassword(config.password);
        setDatabase(config.database);
      }
    };
    
    checkAuth();
    loadConfig();
  }, [navigate]);
  
  const handleSave = async () => {
    try {
      const config = {
        host,
        port: parseInt(port),
        user,
        password,
        database,
      };
      
      setTesting(true);
      const success = await testConnection(config);
      
      if (success) {
        saveDbConfig(config);
        toast.success("Database configuration saved successfully");
        navigate("/dashboard");
      } else {
        toast.error("Failed to connect to database");
      }
    } catch (error) {
      toast.error("Error saving database configuration");
      console.error("Error saving DB config:", error);
    } finally {
      setTesting(false);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Successfully logged out!");
    navigate("/panel");
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-gray-800 text-white border-gray-700">
            <CardHeader>
              <CardTitle>Database Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="space-y-2">
                  <Label htmlFor="host">Host</Label>
                  <Input
                    id="host"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="port">Port</Label>
                  <Input
                    id="port"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="database">Database</Label>
                  <Input
                    id="database"
                    value={database}
                    onChange={(e) => setDatabase(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="user">Username</Label>
                  <Input
                    id="user"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    className="bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your database password"
                    className="bg-gray-700 border-gray-600"
                    required
                  />
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/dashboard")}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    disabled={testing}
                  >
                    {testing ? "Testing Connection..." : "Save Configuration"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DbConfig;
