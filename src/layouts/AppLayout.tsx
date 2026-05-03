import { Outlet } from 'react-router-dom';
import { AppFooter } from '../components/footer/AppFooter';
import { MainMenu } from '../components/navigation/MainMenu';

export function AppLayout() {
  return (
    <div className="app-shell">
      <MainMenu />
      <main className="page-content">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
