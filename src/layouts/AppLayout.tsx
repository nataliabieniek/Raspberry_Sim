import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppFooter } from '../components/footer/AppFooter';
import { MainMenu } from '../components/navigation/MainMenu';
import { trackPageView } from '../firebase';

export function AppLayout() {
  const { pathname } = useLocation();
  const isLessonRoute = pathname.startsWith('/lesson');

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <div className="app-shell">
      <MainMenu />
      <main className={isLessonRoute ? 'page-content page-content-wide' : 'page-content'}>
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
