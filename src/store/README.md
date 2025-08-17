# Redux Store Setup

This project uses Redux Toolkit for state management. Here's how to use it:

## Store Structure

```
src/store/
├── index.js          # Main store configuration
├── hooks.js          # Typed Redux hooks
├── slices/           # Redux slices
│   ├── index.js      # Slice exports
│   ├── authSlice.js  # Authentication state
│   └── projectSlice.js # Project management state
└── README.md         # This file
```

## Available Slices

### Auth Slice
- **State**: `user`, `isAuthenticated`, `isLoading`, `error`
- **Actions**: `loginStart`, `loginSuccess`, `loginFailure`, `logout`, `clearError`

### Project Slice
- **State**: `projects`, `currentProject`, `isLoading`, `error`
- **Actions**: `setCurrentProject`, `addProject`, `updateProject`, `deleteProject`, `clearError`
- **Async Actions**: `fetchProjects`

## Usage Examples

### In Components

```jsx
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginStart, loginSuccess } from '../store/slices/authSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(loginStart());
    // Your login logic here
    dispatch(loginSuccess(userData));
  };

  return (
    <div>
      {isAuthenticated ? `Welcome, ${user.name}!` : 'Please login'}
    </div>
  );
};
```

### Adding New Slices

1. Create a new slice file in `src/store/slices/`
2. Export it from `src/store/slices/index.js`
3. Add it to the store in `src/store/index.js`

```jsx
// src/store/slices/newSlice.js
import { createSlice } from '@reduxjs/toolkit';

const newSlice = createSlice({
  name: 'new',
  initialState: {},
  reducers: {},
});

export const { actions } = newSlice.actions;
export default newSlice.reducer;
```

## Best Practices

1. **Use the typed hooks**: `useAppDispatch` and `useAppSelector`
2. **Keep slices focused**: Each slice should handle one domain of your app
3. **Use async thunks**: For API calls and complex async logic
4. **Normalize state**: For complex data structures
5. **Avoid nested state**: Keep state flat for better performance

## DevTools

Redux DevTools are automatically configured. Install the browser extension to debug your Redux state and actions.

