// src/components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between px-6 py-4 border-b">
      <Link className="font-serif text-2xl" to="/">GigFlow</Link>
      <div className="space-x-4 font-mono">
        <Link to="/gigs">Gigs</Link>
        <Link to="/create">Post Job</Link>
      </div>
    </nav>
  );
}
