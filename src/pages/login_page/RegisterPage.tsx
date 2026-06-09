import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';
import './auth.css';

function passwordStrength(p: string): 0 | 1 | 2 | 3 | 4 {
    let s = 0;
    if (p.length >= 8)          s++;
    if (/[A-Z]/.test(p))        s++;
    if (/[0-9]/.test(p))        s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s as 0 | 1 | 2 | 3 | 4;
}

function inputClass(dirty: boolean, valid: boolean, value: string) {
    if (!dirty || value === '') return 'auth-input';
    return `auth-input ${valid ? 'auth-input--valid' : 'auth-input--invalid'}`;
}

const IconOk = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="#1D9E75" strokeWidth="1.4"/>
        <path d="M5 8l2 2 4-4" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const IconErr = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="#E24B4A" strokeWidth="1.4"/>
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#E24B4A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
);

const IconCircle = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="7" stroke="#94a3b8" strokeWidth="1.4"/>
    </svg>
);

const STRENGTH_LABELS = ['', 'Słabe', 'Średnie', 'Silne', 'Bardzo silne'];
const STRENGTH_COLORS = ['', '#E24B4A', '#EF9F27', '#1D9E75', '#1D9E75'];
const STRENGTH_WIDTHS = ['0%', '25%', '55%', '80%', '100%'];

export function RegisterPage() {
    const [name,      setName]      = useState('');
    const [email,     setEmail]     = useState('');
    const [password,  setPassword]  = useState('');
    const [password2, setPassword2] = useState('');

    const [dirtyName,   setDirtyName]   = useState(false);
    const [dirtyEmail,  setDirtyEmail]  = useState(false);
    const [dirtyPass,   setDirtyPass]   = useState(false);
    const [dirtyPass2,  setDirtyPass2]  = useState(false);

    const [busy, setBusy] = useState(false);
    const [err,  setErr]  = useState('');
    const nav = useNavigate();

    const nameValid  = name.trim().length >= 2;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const passReqs   = {
        len:   password.length >= 8,
        upper: /[A-Z]/.test(password),
        num:   /[0-9]/.test(password),
        spec:  /[^A-Za-z0-9]/.test(password),
    };
    const passValid  = password.length >= 6;
    const pass2Valid = password.length > 0 && password === password2;
    const strength   = passwordStrength(password);
    const canSubmit  = nameValid && emailValid && passValid && pass2Valid && !busy;

    async function handleRegister() {
        setErr('');
        setBusy(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            if (name.trim()) {
                await updateProfile(cred.user, { displayName: name.trim() });
            }
            nav('/propozycja');
        } catch (e) {
            setErr(e instanceof Error ? e.message : String(e));
        } finally {
            setBusy(false);
        }
    }

    return (
        <section className="auth-page">
            <div className="auth-card auth-card--register">
                <h1 className="auth-title">Zarejestruj się</h1>
                <p className="auth-subtitle">
                    Dołącz do społeczności i zacznij<br />naukę systemów wbudowanych
                </p>

                <div className="auth-form">

                    {/* Imię i nazwisko */}
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-name">Imię i nazwisko</label>
                        <div className="auth-input-wrap">
                            <input
                                id="reg-name"
                                className={inputClass(dirtyName, nameValid, name)}
                                type="text"
                                placeholder="Jan Kowalski"
                                autoComplete="name"
                                value={name}
                                onChange={e => { setName(e.target.value); setDirtyName(true); }}
                            />
                            {dirtyName && name !== '' && (
                                <span className="auth-toggle" style={{ pointerEvents: 'none' }}>
                                    {nameValid ? <IconOk /> : <IconErr />}
                                </span>
                            )}
                        </div>
                        {dirtyName && name !== '' && !nameValid && (
                            <span className="auth-hint auth-hint--err">Podaj co najmniej 2 znaki</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-email">Email</label>
                        <div className="auth-input-wrap">
                            <input
                                id="reg-email"
                                className={inputClass(dirtyEmail, emailValid, email)}
                                type="email"
                                placeholder="twoj@email.pl"
                                autoComplete="email"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setDirtyEmail(true); }}
                            />
                            {dirtyEmail && email !== '' && (
                                <span className="auth-toggle" style={{ pointerEvents: 'none' }}>
                                    {emailValid ? <IconOk /> : <IconErr />}
                                </span>
                            )}
                        </div>
                        {dirtyEmail && email !== '' && !emailValid && (
                            <span className="auth-hint auth-hint--err">Nieprawidłowy format adresu email</span>
                        )}
                    </div>

                    {/* Hasło */}
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-password">Hasło</label>
                        <div className="auth-input-wrap">
                            <input
                                id="reg-password"
                                className={inputClass(dirtyPass, passValid, password)}
                                type="password"
                                placeholder="min. 6 znaków"
                                autoComplete="new-password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setDirtyPass(true); }}
                            />
                            {dirtyPass && password !== '' && (
                                <span className="auth-toggle" style={{ pointerEvents: 'none' }}>
                                    {passValid ? <IconOk /> : <IconErr />}
                                </span>
                            )}
                        </div>

                        {dirtyPass && password !== '' && (
                            <>
                                <div className="auth-strength-bar">
                                    <div
                                        className="auth-strength-fill"
                                        style={{
                                            width: STRENGTH_WIDTHS[strength],
                                            background: STRENGTH_COLORS[strength],
                                        }}
                                    />
                                </div>
                                <span
                                    className="auth-strength-label"
                                    style={{ color: STRENGTH_COLORS[strength] }}
                                >
                                    {STRENGTH_LABELS[strength]}
                                </span>
                                <ul className="auth-req-list">
                                    {([
                                        [passReqs.len,   'Min. 8 znaków'],
                                        [passReqs.upper, 'Duża litera'],
                                        [passReqs.num,   'Cyfra'],
                                        [passReqs.spec,  'Znak specjalny (!@#$...)'],
                                    ] as [boolean, string][]).map(([met, label]) => (
                                        <li key={label} className={`auth-req ${met ? 'auth-req--met' : ''}`}>
                                            {met ? <IconOk /> : <IconCircle />}
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    {/* Powtórz hasło */}
                    <div className="auth-field">
                        <label className="auth-label" htmlFor="reg-password2">Powtórz hasło</label>
                        <div className="auth-input-wrap">
                            <input
                                id="reg-password2"
                                className={inputClass(dirtyPass2, pass2Valid, password2)}
                                type="password"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                value={password2}
                                onChange={e => { setPassword2(e.target.value); setDirtyPass2(true); }}
                            />
                            {dirtyPass2 && password2 !== '' && (
                                <span className="auth-toggle" style={{ pointerEvents: 'none' }}>
                                    {pass2Valid ? <IconOk /> : <IconErr />}
                                </span>
                            )}
                        </div>
                        {dirtyPass2 && password2 !== '' && (
                            <span className={`auth-hint ${pass2Valid ? 'auth-hint--ok' : 'auth-hint--err'}`}>
                                {pass2Valid ? 'Hasła są zgodne' : 'Hasła nie są identyczne'}
                            </span>
                        )}
                    </div>

                    {err && <p className="auth-error">{err}</p>}

                    <button
                        className="auth-submit"
                        type="button"
                        disabled={!canSubmit}
                        onClick={handleRegister}
                    >
                        {busy ? 'Tworzenie konta...' : 'Zarejestruj się'}
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
