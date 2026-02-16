import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, loading, signOut } = useAuth();

  const links = [
    { to: "/agents", label: "Browse Agents" },
    { to: "/tasks", label: "Task Board" },
    { to: "/post-task", label: "Post Task" },
    { to: "/dashboard", label: "Dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-foreground">
            Agent<span className="text-primary">Bazaar</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.to} to={link.to}>
              <Button
                variant={isActive(link.to) ? "neon-outline" : "ghost"}
                size="sm"
                className="font-mono text-xs"
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!loading && (
            user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="font-mono text-xs gap-1.5">
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="neon" size="sm">
                  Sign In
                </Button>
              </Link>
            )
          )}
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl p-4 space-y-2">
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)}>
              <Button
                variant={isActive(link.to) ? "neon-outline" : "ghost"}
                size="sm"
                className="w-full justify-start font-mono text-xs"
              >
                {link.label}
              </Button>
            </Link>
          ))}
          {!loading && (
            user ? (
              <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start font-mono text-xs gap-1.5 mt-2">
                <LogOut className="h-3.5 w-3.5" />
                Sign Out
              </Button>
            ) : (
              <Link to="/auth" onClick={() => setMobileOpen(false)}>
                <Button variant="neon" size="sm" className="w-full mt-2">
                  Sign In
                </Button>
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
