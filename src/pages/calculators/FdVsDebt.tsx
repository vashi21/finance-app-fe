import React, { useState } from 'react';
import Layout from '../../components/Layout';
import api    from '../../api/apiClient';
import styles from './FdVsDebt.module.css';

interface FormData { principal:number; fdRate:number; tenureYears:number; fundReturnRate:number; }
interface ResultData { fdReturns:number; fundReturns:number; recommendation:string; }

export default function FdVsDebt() {
  const [form,   setForm]   = useState<FormData>({principal:0,fdRate:0,tenureYears:0,fundReturnRate:0});
  const [result,setResult]  = useState<ResultData|null>(null);
  const [loading,setLoading]= useState(false);
  const [error, setError]   = useState<string|null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f=>({ ...f, [name]: parseFloat(value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await api.post<ResultData>('/calculators/fd-vs-debt', form);
      setResult(res.data);
    } catch {
      setError('Calculation failed');
    } finally { setLoading(false); }
  };

  return (
    <Layout back>
      <div className={styles.container}>
        <h1 className={styles.heading}>FD vs Debt Fund</h1>

        <form onSubmit={handleSubmit}>
          {(['principal','fdRate','tenureYears','fundReturnRate'] as const).map(name => (
            <div key={name} className={styles.formGroup}>
              <label className={styles.label}>{name.replace(/([A-Z])/g,' $1')}</label>
              <input
                name={name}
                type="number"
                step="any"
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          ))}

          <button type="submit" disabled={loading} className={styles.calcBtn}>
            {loading ? 'Calculating…' : 'Calculate'}
          </button>
        </form>

        {error && <div className={styles.error}>{error}</div>}

        {result && (
          <div className={styles.results}>
            <p>FD Value: ₹{result.fdReturns.toFixed(2)}</p>
            <p>Debt Fund Value: ₹{result.fundReturns.toFixed(2)}</p>
            <p>Recommendation: {result.recommendation}</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
