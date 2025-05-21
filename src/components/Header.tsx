
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, Discord } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              <Link to="/panel">
                Panel
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Discord className="mr-2 h-4 w-4" />
                Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
