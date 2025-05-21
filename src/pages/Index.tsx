import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
const Index = () => {
  const {
    toast
  } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const handleDemoClick = () => {
    setIsLoading(true);
    toast({
      title: "Demo Started",
      description: "Starting the demonstration..."
    });

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demo Ready",
        description: "The demonstration is now ready!"
      });
    }, 2000);
  };
  return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Modern Web Application
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-300">
            A powerful and responsive web dashboard built with React and Tailwind CSS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDemoClick} disabled={isLoading}>
              {isLoading ? "Loading..." : "Start Demo"}
            </Button>
            <Button size="lg" variant="outline" className="border-gray-500 bg-slate-50 text-gray-950">
              Learn More <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Main Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-slate-50">{feature.title}</CardTitle>
                <CardDescription className="text-gray-400">{feature.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" className="bg-slate-50">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>)}
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20">
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of users who are already enjoying our platform.
            Start building your own dashboard today.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Get Started
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-10 border-t border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400">
            © 2025 Web Application. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Privacy</Link>
            <Link to="#" className="text-gray-400 hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>;
};

// Feature data
const features = [{
  title: "Responsive Design",
  subtitle: "Works on all devices",
  description: "Our application is designed to work flawlessly on desktops, tablets, and mobile phones."
}, {
  title: "Modern UI Components",
  subtitle: "Built with Shadcn UI",
  description: "Leverage the power of reusable, accessible components for a consistent user experience."
}, {
  title: "Customizable Dashboard",
  subtitle: "Make it your own",
  description: "Easily customize the dashboard to fit your specific needs and preferences."
}];
export default Index;