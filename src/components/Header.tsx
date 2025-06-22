import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { pathname } = useLocation();

  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/calculators/fd-vs-debt', label: 'FD vs Debt' },
    // add more links here later
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">FinPlanner</Link>
        <nav className="space-x-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`text-gray-600 hover:text-blue-600 ${
                pathname === to ? 'font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
