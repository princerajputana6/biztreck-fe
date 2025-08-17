import React from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './utils/clearOldTokens'; // Auto-clear invalid tokens
import './index.css';

// Make store available globally for API client
window.store = store;

const AppContent = () => {
  const { error } = useNavigation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (error) {
      navigate('/login');
    }
  }, [error, navigate]);

  return <AppRoutes />;
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
