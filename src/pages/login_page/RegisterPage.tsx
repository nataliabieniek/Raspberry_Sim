import { NavLink } from 'react-router-dom';
import './auth.css';

export function RegisterPage() {
    return (
        <section className="auth-page">
            <div className="auth-card auth-card--register">
                <h1 className="auth-title">Zarejestruj się</h1>
                <p className="auth-subtitle">
                    Dołącz do społeczności i zacznij<br />naukę systemów wbudowanych
                </p>

                <div className="auth-form">
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-name">Imię i nazwisko</label>
                        <input
                            id="reg-name"
                            className="auth-input"
                            type="text"
                            placeholder="Jan Kowalski"
                            autoComplete="name"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-email">Email</label>
                        <input
                            id="reg-email"
                            className="auth-input"
                            type="email"
                            placeholder="twoj@email.pl"
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-password">Hasło</label>
                        <input
                            id="reg-password"
                            className="auth-input"
                            type="password"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-password2">Powtórz hasło</label>
                        <input
                            id="reg-password2"
                            className="auth-input"
                            type="password"
                            autoComplete="new-password"
                        />
                    </div>

                    <button className="auth-submit" type="button">
                        Zarejestruj się
                    </button>
                </div>

                <hr className="auth-divider" />

                <p className="auth-switch">
                    Masz już konto?{' '}
                    <NavLink to="/login" className="auth-link">
                        Zaloguj się
                    </NavLink>
                </p>
            </div>
        </section>
    );
}