import React from 'react';

const getStrength = (password) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const PasswordStrengthIndicator = ({ password }) => {
  if (!password) return null;
  const score = getStrength(password);
  const strength = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][score - 1] || 'Very Weak';
  const colors = ['bg-red-400', 'bg-yellow-400', 'bg-yellow-500', 'bg-green-400', 'bg-green-600'];

  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded bg-gray-200">
        <div className={`h-2 rounded ${colors[score - 1] || 'bg-red-400'}`} style={{ width: `${score * 20}%` }} />
      </div>
      <div className="text-xs mt-1 text-gray-600">{strength}</div>
    </div>
  );
};

export default PasswordStrengthIndicator;
