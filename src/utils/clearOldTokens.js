// Utility to clear old tokens that might have signature mismatches
export const clearOldTokens = () => {
  console.log('🧹 Clearing old tokens to fix signature mismatch');
  
  // Clear from localStorage
  localStorage.removeItem('token');
  
  // Clear from sessionStorage if exists
  sessionStorage.removeItem('token');
  
  // Clear any other auth-related storage
  localStorage.removeItem('user');
  localStorage.removeItem('userRole');
  
  console.log('✅ All old tokens cleared');
};

// Auto-clear on import if there's a signature error
const token = localStorage.getItem('token');
if (token) {
  try {
    // Try to decode the token
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token check - payload exists:', !!payload);
  } catch (error) {
    console.log('🚨 Invalid token detected, auto-clearing');
    clearOldTokens();
  }
}
