import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { AboutPage } from '../pages/AboutPage';
import { LessonPage } from '../pages/lesson_page/LessonPage';
import { LessonTwoPage } from '../pages/lesson_page/LessonTwoPage';
import { LoginPage } from '../pages/login_page/LoginPage';
import { WelcomePage } from '../pages/welcome_page/WelcomePage';
import { RegisterPage } from "../pages/login_page/RegisterPage";
import { ProposalPage } from "../pages/proposal_page/ProposalPage";
import { PrivateRoute } from "../components/routing/PrivateRoute";
import { PublicRoute } from "../components/routing/PublicRoute";

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
        path: 'login',
        element: <PublicRoute><LoginPage /></PublicRoute>,
      },
      {
        path: 'Register',
        element: <PublicRoute><RegisterPage /></PublicRoute>,
      },
      {
        path: 'lesson',
        element: <LessonPage />,
      },
      {
        path: 'lesson-2',
        element: <LessonTwoPage />,
      },
      {
        path: 'o-stronie',
        element: <AboutPage />,
      },
      {
        path: 'propozycja',
        element: <PrivateRoute><ProposalPage /></PrivateRoute>,
      },
    ],
  },
]);
