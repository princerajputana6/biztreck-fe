import React from 'react';
import RoleBasedDashboard from '../../components/dashboards/RoleBasedDashboard';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Role-Based Dashboard Content */}
      <RoleBasedDashboard />
    </div>
  );
};

export default DashboardPage;
