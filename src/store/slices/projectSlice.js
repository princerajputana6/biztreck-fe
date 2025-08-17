import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching projects
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      // Mock API call for demonstration - replace with actual API call
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock project data
      const mockProjects = [
        { id: 1, name: 'Project Alpha', status: 'In Progress', progress: 65, dueDate: '2024-02-15' },
        { id: 2, name: 'Project Beta', status: 'Completed', progress: 100, dueDate: '2024-01-30' },
        { id: 3, name: 'Project Gamma', status: 'Planning', progress: 25, dueDate: '2024-03-01' },
        { id: 4, name: 'Project Delta', status: 'In Progress', progress: 80, dueDate: '2024-02-28' },
        { id: 5, name: 'Project Epsilon', status: 'On Hold', progress: 40, dueDate: '2024-03-15' },
      ];
      
      return mockProjects;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const index = state.projects.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.projects[index] = action.payload;
      }
    },
    deleteProject: (state, action) => {
      state.projects = state.projects.filter(p => p.id !== action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { 
  setCurrentProject, 
  addProject, 
  updateProject, 
  deleteProject, 
  clearError 
} = projectSlice.actions;

export default projectSlice.reducer;
