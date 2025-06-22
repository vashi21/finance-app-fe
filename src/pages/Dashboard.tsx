import React from 'react';
import { useNavigate }                  from 'react-router-dom';
import { Calculator, Home, PieChart, Award } from 'lucide-react';
import Layout                           from '../components/Layout';
import styles                           from './Dashboard.module.css';

const tools = [
  { title: 'FD vs Debt',    icon: Calculator, path: '/calculators/fd-vs-debt', desc: 'Compare FD vs debt funds' },
  { title: 'Buy vs Rent',   icon: Home,       path: '/calculators/buy-vs-rent',    desc: 'Buy a home or keep renting?' },
  { title: 'Fund Selector', icon: PieChart,   path: '/funds/selector',             desc: 'Pick funds by profile' },
  { title: 'Goals Planner', icon: Award,      path: '/goals',                      desc: 'Track your savings goals' },
];

export default function Dashboard() {
  const nav = useNavigate();
  return (
    <Layout>
      <div className={styles.grid}>
        {tools.map(({ title, icon: Icon, path, desc }) => (
          <div key={path} className={styles.card} onClick={() => nav(path)}>
            <Icon className={styles.icon} />
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{desc}</p>
            <button className={styles.openBtn} onClick={() => nav(path)}>
              Open
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}
