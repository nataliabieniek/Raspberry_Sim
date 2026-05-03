import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AboutPage } from '../pages/AboutPage';
import { EducationPage } from '../pages/EducationPage';
import { WelcomePage } from '../pages/WelcomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <WelcomePage />,
      },
      {
        path: 'edukacja',
        element: <EducationPage />,
      },
      {
        path: 'o-stronie',
        element: <AboutPage />,
      },
    ],
  },
]);
