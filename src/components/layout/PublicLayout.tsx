// components/layout/PublicLayout.jsx
import { Outlet } from "react-router-dom"; // Outlet is used to render child routes
import Footer from "@/components/Footer"; // Import the Footer component
const PublicLayout = () => {
  return (
    <div className="public-layout">
      {/* Header for the public layout */}
    

      <div className="public-content">
        <Outlet /> {/* Render public page content here */}
      </div>
     <Footer/>
      {/* Footer for the public layout */}
    
    </div>
  );
};

export default PublicLayout;
