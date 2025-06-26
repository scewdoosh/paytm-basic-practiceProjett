// components/BottomWarning.jsx
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for navigation

export const BottomWarning = ({ label, buttonText, to }) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>
        {label}
      </div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {buttonText}
      </Link>
    </div>
  );
};