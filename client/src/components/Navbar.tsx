import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-neutral-500/90 backdrop-blur-md border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-serif text-2xl tracking-wide text-white hover:text-neutral-200 transition-colors"
        >
          GigFlow
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-3">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `
              px-4 py-2 rounded-lg text-sm font-mono
              transition-all duration-200
              ${
                isActive
                  ? "bg-white text-neutral-900"
                  : "text-white hover:bg-white/20 hover:text-white"
              }
              `
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/create"
            className={({ isActive }) =>
              `
              px-4 py-2 rounded-lg text-sm font-mono
              transition-all duration-200
              ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "bg-white text-neutral-900 hover:bg-neutral-900 hover:text-white"
              }
              `
            }
          >
            Post Job
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
