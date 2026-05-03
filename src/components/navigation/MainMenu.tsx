import { NavLink } from 'react-router-dom';

const menuItems = [
  { to: '/', label: 'Powitanie' },
  { to: '/edukacja', label: 'Glowna edukacyjna' },
  { to: '/o-stronie', label: 'O stronie' },
];

export function MainMenu() {
  return (
    <header className="main-menu">
      <div>
        <p className="brand-title">REST Edu App</p>
        <p className="brand-subtitle">Szkielet aplikacji z miejscem pod kolejne moduly</p>
      </div>
      <nav className="nav-links" aria-label="Nawigacja glowna">
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
