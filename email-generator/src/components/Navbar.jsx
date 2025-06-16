import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "underline font-bold" : "";

  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4 justify-center">
      <Link to="/" className={`${isActive("/")} hover:underline`}>
        Email Oluşturma
      </Link>
      <Link
        to="/email-tespiti"
        className={`${isActive("/email-tespiti")} hover:underline`}
      >
        Email Tespiti
      </Link>
    </nav>
  );
};

export default Navbar;
