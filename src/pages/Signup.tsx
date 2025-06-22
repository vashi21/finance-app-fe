import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api                    from '../api/apiClient';
import styles                 from './Signup.module.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string|null>(null);
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post('/auth/register', { username, password });
      nav('/login');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sign Up</h1>
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.inputField}
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="password"
              className={styles.inputField}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn}>Sign Up</button>
        </form>

        <p className={styles.switchLink}>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}
