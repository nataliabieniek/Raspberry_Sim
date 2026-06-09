import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useAuth } from '../../auth/AuthContext';

const menuItems = [
  { to: '/', label: 'Home' },
  {
    label: 'Lekcje',
    submenu: [
      { to: '/lesson', label: 'Lekcja 1' },
      { to: '/lesson-2', label: 'Lekcja 2' },
    ],
  },
  { to: '/propozycja', label: 'Dodaj lekcje' },
];

export function MainMenu() {
  const { user } = useAuth();
  const nav = useNavigate();

  async function handleLogout() {
    await signOut(auth);
    nav('/');
  }

  return (
    <div className="global-header-shell">
      <header className="global-header">
        <div className="header-brand-block">
          <p className="brand-title">Learn Raspberry</p>
        </div>

        <div className="header-center-nav-wrap">
          <nav className="nav-links" aria-label="Nawigacja glowna">
            {menuItems.map((item) => {
              if (item.submenu) {
                return (
                  <div key={item.label} className="nav-link-dropdown">
                    <button className="nav-link nav-link-dropdown-toggle">
                      {item.label}
                    </button>
                    <div className="nav-dropdown-menu">
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.to}
                          to={sub.to}
                          className="nav-dropdown-item"
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="header-actions">
          {user ? (
            <button className="header-cta" onClick={handleLogout}>
              Wyloguj się
            </button>
          ) : (
            <NavLink to="/login" className="header-cta">
              Zaloguj się
            </NavLink>
          )}
        </div>
      </header>
    </div>
  );
}
