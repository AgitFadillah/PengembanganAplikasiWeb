import React from 'react';
import Header from '../../components/Header/Header';
import { useBooks } from '../../context/BookContext';
import './Stats.css';

function Stats() {
  const { stats } = useBooks();

  const statusOptions = {
    owned: 'Milik',
    reading: 'Sedang Dibaca',
    purchased: 'Ingin Dibeli',
  };

  return (
    <div className="stats-page">
      <Header
        title="Statistik Buku"
        description="Ikhtisar koleksi buku Anda"
      />
      <main className="container">
        <div className="stats-grid">
          <div className="stat-card total">
            <h3>Total Buku</h3>
            <p className="stat-number">{stats.total}</p>
          </div>

          <div className="stat-card owned">
            <h3>Buku yang Dimiliki</h3>
            <p className="stat-number">{stats.owned}</p>
          </div>

          <div className="stat-card reading">
            <h3>Sedang Dibaca</h3>
            <p className="stat-number">{stats.reading}</p>
          </div>

          <div className="stat-card purchased">
            <h3>Ingin Dibeli</h3>
            <p className="stat-number">{stats.purchased}</p>
          </div>
        </div>

        {stats.total > 0 && (
          <div className="progress-section">
            <h3>Persentase Buku yang Sedang Dibaca</h3>
            <div className="progress-bar">
              {(() => {
                const pct = stats.completionRate.toFixed(0);
                const color =
                  pct <= 33
                    ? '#ef4444'
                    : pct <= 66
                    ? '#f59e0b'
                    : '#10b981';
                return (
                  <>
                    <div
                      className="progress-fill"
                      style={{ width: `${pct}%`, backgroundColor: color }}
                    />
                    <span className="progress-label">{pct}%</span>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {stats.total === 0 && (
          <p className="empty-state">Belum ada buku dalam koleksi.</p>
        )}
      </main>
    </div>
  );
}

export default Stats;