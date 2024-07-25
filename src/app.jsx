/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
      </ThemeProvider>
    </AuthProvider>
  );
}
