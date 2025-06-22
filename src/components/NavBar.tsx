import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Home, ChevronLeft, LogOut } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar({ showBack = false }: { showBack?: boolean }) {
  const nav = useNavigate();
  const tools = [
    { path: '/calculators/fd-vs-debt', label: 'FD vs Debt' },
    { path: '/calculators/buy-vs-rent', label: 'Buy vs Rent' },
    { path: '/funds/selector', label: 'Fund Selector' },
    { path: '/goals', label: 'Goals Planner' },
  ];

  return (
    <header className={styles.nav}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        {showBack && (
          <button onClick={() => nav(-1)} className={styles.toolBtn}>
            <ChevronLeft size={24} color="var(--fg)" />
          </button>
        )}
        <Link to="/dashboard" className={styles.brand}>
          <Home className={styles.brandIcon} />
          <span style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--fg)' }}>
            FinPlanner
          </span>
        </Link>
      </div>

      <nav className={styles.navTools}>
        {tools.map(t => (
          <button key={t.path} onClick={() => nav(t.path)} className={styles.toolBtn}>
            {t.label}
          </button>
        ))}
        <button
          onClick={() => { localStorage.removeItem('token'); nav('/login'); }}
          className={`${styles.toolBtn} ${styles.logoutBtn}`}
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </header>
  );
}
