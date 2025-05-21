
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Panel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Control Panel</h1>
          <p className="text-xl mb-8 text-gray-300">
            Welcome to the administration panel.
          </p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Panel;
