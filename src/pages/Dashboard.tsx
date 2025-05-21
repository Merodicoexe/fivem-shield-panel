
import { useEffect, useState } from "react";
import { fetchStats } from "@/utils/db";
import Header from "@/components/Header";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [stats, setStats] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      if (!user) {
        toast.error("Please login to access the dashboard");
        navigate("/panel");
      }
    };
    
    const loadStats = async () => {
      try {
        setLoading(true);
        const data = await fetchStats();
        setStats(data);
      } catch (error) {
        toast.error("Failed to load stats");
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    loadStats();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Successfully logged out!");
    navigate("/panel");
  };
  
  const chartConfig = {
    Bans: { color: "#ff4d4f" },
    Logs: { color: "#1890ff" },
    Warns: { color: "#faad14" },
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header isLoggedIn={true} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-gray-800 text-white border-gray-700">
            <CardHeader>
              <CardTitle>Statistics Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <p>Loading stats...</p>
                </div>
              ) : (
                <ChartContainer className="h-64" config={chartConfig}>
                  <BarChart data={stats}>
                    <XAxis dataKey="name" stroke="#888888" />
                    <YAxis stroke="#888888" />
                    <Bar dataKey="value" fill="#8884d8" />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent />
                      }
                    />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 text-white border-gray-700">
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300">Configure your database connection settings</p>
                <Button
                  className="w-full"
                  onClick={() => navigate("/db-config")}
                >
                  Configure Database
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
