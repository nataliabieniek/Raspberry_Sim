import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../firebase';
import './auth.css';

export function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState('');
    const nav = useNavigate();

    async function handleGoogle() {
        setErr('');
        setBusy(true);
        try {
            await signInWithPopup(auth, googleProvider);
            nav('/propozycja');
        } catch (e) {
            setErr(e instanceof Error ? e.message : String(e));
        } finally {
            setBusy(false);
        }
    }

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

                {err && <p className="auth-error">{err}</p>}

                <hr className="auth-divider" />

                <button
                    className="btn-google"
                    type="button"
                    disabled={busy}
                    onClick={handleGoogle}
                    aria-label="Zaloguj się przez Google"
                >
                    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
                        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
                        <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
                        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
                    </svg>
                    {busy ? 'Logowanie...' : 'Kontynuuj z Google'}
                </button>

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