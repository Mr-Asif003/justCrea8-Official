// components/layout/PublicLayout.jsx
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes
import Footer from "../Footer";
const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Header for the public layout */}
      <header className="public-header">
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/home">Home</a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
          </ul>
        </nav>
      </header>

      <div className="public-content">
        <Outlet /> {/* Render public page content here */}
      </div>
     <Footer/>
      {/* Footer for the public layout */}
    
    </div>
  );
};

export default PublicLayout;
