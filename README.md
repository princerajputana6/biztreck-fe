# BizTreck - Business Management Platform

A comprehensive business management platform built with React, Redux Toolkit, and Tailwind CSS.

## Features

### 🚀 **Authentication System**
- User registration and login
- Password reset functionality
- Protected routes
- Redux state management for auth

### 📊 **Dashboard**
- Overview of business metrics
- Quick action buttons
- Recent activity feed
- Project status visualization
- Revenue overview

### 🔧 **Redux Integration**
- Complete Redux Toolkit setup
- Authentication state management
- Project data management
- Async thunks for API calls
- Mock data for demonstration

### 🎨 **Modern UI Components**
- Responsive design with Tailwind CSS
- Reusable UI components (Button, Input, Card, Modal, Table)
- Beautiful landing page
- Professional dashboard layout

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd biztreck-fe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Application Flow

### 1. **Landing Page** (`/`)
- Welcome page with feature overview
- Navigation to signup/login
- Call-to-action buttons

### 2. **Authentication**
- **Signup** (`/signup`): Create new account
- **Login** (`/login`): Sign in to existing account
- **Forgot Password** (`/forgot-password`): Reset password
- **Demo** (`/demo`): Interactive demo without signing up

### 3. **Dashboard** (`/dashboard`)
- Main application interface
- Protected route (requires authentication)
- Overview of business metrics
- Redux example component

### 4. **Other Features**
- Project management
- Process automation
- Pipeline management
- Team collaboration
- Analytics and reporting

## Redux Store Structure

### Auth Slice
- User authentication state
- Login/logout actions
- Loading and error states

### Project Slice
- Project data management
- Async thunks for API calls
- Mock data for demonstration

## Component Architecture

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── common/         # Shared components (ReduxExample)
│   ├── dashboard/      # Dashboard components
│   ├── layout/         # Layout components (Header, Sidebar)
│   └── ui/            # Reusable UI components
├── pages/              # Page components
├── routes/             # Routing configuration
├── store/              # Redux store and slices
└── utils/              # Utility functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Technology Stack

- **Frontend**: React 19, Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Linting**: ESLint

## Mock Data

The application currently uses mock data for demonstration purposes:
- Mock authentication (no real API calls)
- Mock project data
- Simulated network delays

## Customization

### Adding Real API Integration
1. Replace mock API calls in auth and project slices
2. Update API endpoints in the fetch calls
3. Handle real authentication tokens

### Styling
- Modify Tailwind CSS classes
- Update color scheme in `tailwind.config.js`
- Customize component styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

**Note**: This is a demonstration application. For production use, implement proper security measures, real API integration, and comprehensive testing.
