import React from 'react';
import NavBar from './NavBar';

export default function Layout({ children, back }: {
  children: React.ReactNode;
  back?: boolean;
}) {
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100%' }}>
      <NavBar showBack={back} />
      <main style={{ flexGrow: 1, padding:'1rem', backgroundColor:'var(--bg)' }}>
        {children}
      </main>
    </div>
  );
}
