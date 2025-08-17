import React from 'react';

const SocialButton = ({ provider, icon: Icon, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  >
    {Icon && <Icon className="h-5 w-5 mr-3" />}
    Continue with {provider}
  </button>
);

export default SocialButton;
