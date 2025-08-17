import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginStart, loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';
import { fetchProjects } from '../../store/slices/projectSlice';

const ReduxExample = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);
  const { projects, isLoading: projectsLoading } = useAppSelector((state) => state.projects);

  const handleLogin = () => {
    dispatch(loginStart());
    // Simulate API call
    setTimeout(() => {
      dispatch(loginSuccess({ id: 1, name: 'John Doe', email: 'john@example.com' }));
    }, 1000);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFetchProjects = () => {
    dispatch(fetchProjects());
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Redux Example</h2>
      
      {/* Auth Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Authentication</h3>
        <div className="space-y-2 mb-4">
          <p><strong>Status:</strong> {isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
          <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
          {user && <p><strong>User:</strong> {user.name} ({user.email})</p>}
          {error && <p className="text-red-600"><strong>Error:</strong> {error}</p>}
        </div>
        
        <div className="space-x-2">
          {!isAuthenticated ? (
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Projects Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Projects</h3>
        <div className="space-y-2 mb-4">
          <p><strong>Projects Count:</strong> {projects.length}</p>
          <p><strong>Loading:</strong> {projectsLoading ? 'Yes' : 'No'}</p>
        </div>
        
        <button
          onClick={handleFetchProjects}
          disabled={projectsLoading}
          className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          {projectsLoading ? 'Fetching...' : 'Fetch Projects'}
        </button>
      </div>
    </div>
  );
};

export default ReduxExample;
