import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, MessagesSquare } from "lucide-react";
const Header = () => {
  return <header className="border-b border-gray-800 py-4 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              <Link to="/" className="text-gray-50">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              <Link to="/panel" className="text-gray-50">
                Panel
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-white hover:bg-gray-800">
              
            </Button>
          </div>
        </div>
      </div>
    </header>;
};
export default Header;