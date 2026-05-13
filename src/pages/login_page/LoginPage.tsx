import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './auth.css';

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="auth-page">
            <div className="auth-card">
                <div className="auth-icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <rect x="2" y="4" width="24" height="16" rx="1" stroke="#a60036" strokeWidth="1.8" fill="none"/>
                        <path d="M8 20v4M20 20v4M5 24h18" stroke="#a60036" strokeWidth="1.8" strokeLinecap="round"/>
                        <path d="M7 10l3 3-3 3" stroke="#a60036" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="13" y1="16" x2="19" y2="16" stroke="#a60036" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                </div>

                <h1 className="auth-title">Zaloguj się</h1>
                <p className="auth-subtitle">Kontynuuj naukę systemów wbudowanych.</p>

                <div className="auth-form">
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="login-email">Email</label>
                        <div className="auth-input-wrap">
                            <input
                                id="login-email"
                                className="auth-input"
                                type="email"
                                placeholder="twoj@email.pl"
                                autoComplete="email"
                            />
                            <span className="auth-toggle" style={{ pointerEvents: 'none' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="1.2" stroke="#94a3b8" strokeWidth="1.3"/>
                  <path d="M1.5 4.5L8 9l6.5-4.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              </span>
                        </div>
                    </div>

                    <div className="auth-field">
                        <div className="auth-label-row">
                            <label className="auth-label" htmlFor="login-password">Hasło</label>
                            <a href="#" className="auth-forgot">Zapomniałeś hasła?</a>
                        </div>
                        <div className="auth-input-wrap">
                            <input
                                id="login-password"
                                className="auth-input"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                            />
                            <button
                                className="auth-toggle"
                                type="button"
                                onClick={() => setShowPassword(v => !v)}
                                aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                            >
                                {showPassword ? (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="#94a3b8" strokeWidth="1.3"/>
                                        <circle cx="8" cy="8" r="2" stroke="#94a3b8" strokeWidth="1.3"/>
                                        <line x1="3" y1="3" x2="13" y2="13" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/>
                                    </svg>
                                ) : (
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5S1 8 1 8z" stroke="#94a3b8" strokeWidth="1.3"/>
                                        <circle cx="8" cy="8" r="2" stroke="#94a3b8" strokeWidth="1.3"/>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button className="auth-submit" type="button">
                        Zaloguj się
                    </button>
                </div>

                <hr className="auth-divider" />

                <p className="auth-switch">
                    Nie masz konta?{' '}
                    <NavLink to="/register" className="auth-link">
                        Zarejestruj się
                    </NavLink>
                </p>
            </div>
        </section>
    );
}