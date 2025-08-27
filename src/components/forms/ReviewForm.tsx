import React from 'react';
import { Edit, User, Briefcase, Building2, Mail, Phone, DollarSign } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ReviewFormProps {
  formData: any;
  onEdit: (step: number) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ formData, onEdit }) => {
  const getRoleColor = (role: string) => {
    switch (role) {
      case 'developer':
        return 'bg-green-100 text-green-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Review & Submit</h4>
      
      {/* Basic Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-medium text-gray-900 flex items-center">
            <User className="h-4 w-4 mr-2" />
            Basic Information
          </h5>
          <button
            type="button"
            onClick={() => onEdit(1)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
          </div>
          <div>
            <span className="font-medium">Email:</span> {formData.email}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {formData.phone}
          </div>
          <div>
            <span className="font-medium">Role:</span>
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2',
              getRoleColor(formData.role)
            )}>
              {formData.role}
            </span>
          </div>
        </div>
      </div>

      {/* Role-Specific Information */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="font-medium text-gray-900 flex items-center">
            <Briefcase className="h-4 w-4 mr-2" />
            {formData.role === 'developer' ? 'Developer' : formData.role === 'manager' ? 'Manager' : 'Client'} Profile
          </h5>
          <button
            type="button"
            onClick={() => onEdit(2)}
            className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </button>
        </div>

        {formData.role === 'developer' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Employee ID:</span> {formData.developerProfile.employeeId}
            </div>
            <div>
              <span className="font-medium">Department:</span> {formData.developerProfile.department}
            </div>
            <div>
              <span className="font-medium">Designation:</span> {formData.developerProfile.designation}
            </div>
            <div>
              <span className="font-medium">Experience Level:</span> {formData.developerProfile.experienceLevel}
            </div>
            <div>
              <span className="font-medium">Total Experience:</span> {formData.developerProfile.totalExperience} years
            </div>
            <div>
              <span className="font-medium">Hourly Rate:</span> {formData.developerProfile.hourlyRate} {formData.developerProfile.currency}
            </div>
            <div>
              <span className="font-medium">Salary Type:</span> {formData.developerProfile.salaryType}
            </div>
            <div>
              <span className="font-medium">Working Hours:</span> {formData.developerProfile.workingHours}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Primary Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.developerProfile.primarySkills.map((skill: string, index: number) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-indigo-100 text-indigo-800">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {formData.role === 'manager' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Employee ID:</span> {formData.managerProfile.employeeId}
            </div>
            <div>
              <span className="font-medium">Department:</span> {formData.managerProfile.department}
            </div>
            <div>
              <span className="font-medium">Designation:</span> {formData.managerProfile.designation}
            </div>
            <div>
              <span className="font-medium">Management Level:</span> {formData.managerProfile.managementLevel}
            </div>
            <div>
              <span className="font-medium">Total Experience:</span> {formData.managerProfile.totalExperience} years
            </div>
            <div>
              <span className="font-medium">Management Experience:</span> {formData.managerProfile.managementExperience} years
            </div>
            <div>
              <span className="font-medium">Team Size:</span> {formData.managerProfile.teamSize}
            </div>
            <div>
              <span className="font-medium">Budget Authority:</span> ${formData.managerProfile.budgetAuthority}
            </div>
            <div>
              <span className="font-medium">Cost Center:</span> {formData.managerProfile.costCenter}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Management Areas:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {formData.managerProfile.managementAreas.map((area: string, index: number) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {formData.role === 'client' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Company:</span> {formData.clientProfile.companyName}
            </div>
            <div>
              <span className="font-medium">Industry:</span> {formData.clientProfile.industry}
            </div>
            <div>
              <span className="font-medium">Company Size:</span> {formData.clientProfile.companySize}
            </div>
            <div>
              <span className="font-medium">Designation:</span> {formData.clientProfile.designation}
            </div>
            <div>
              <span className="font-medium">Client Type:</span> {formData.clientProfile.clientType}
            </div>
            <div>
              <span className="font-medium">Client Source:</span> {formData.clientProfile.clientSource}
            </div>
            <div>
              <span className="font-medium">Payment Terms:</span> {formData.clientProfile.paymentTerms}
            </div>
            <div>
              <span className="font-medium">Priority:</span> {formData.clientProfile.clientPriority}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium">Address:</span> {formData.clientProfile.address.street}, {formData.clientProfile.address.city}, {formData.clientProfile.address.state} {formData.clientProfile.address.zipCode}, {formData.clientProfile.address.country}
            </div>
          </div>
        )}
      </div>

      {/* Emergency Contact (for Developer/Manager) */}
      {(formData.role === 'developer' || formData.role === 'manager') && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-medium text-gray-900 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Emergency Contact
            </h5>
            <button
              type="button"
              onClick={() => onEdit(3)}
              className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </button>
          </div>
          
          {formData.role === 'developer' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {formData.developerProfile.emergencyContact.name}
              </div>
              <div>
                <span className="font-medium">Relationship:</span> {formData.developerProfile.emergencyContact.relationship}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {formData.developerProfile.emergencyContact.phone}
              </div>
              <div>
                <span className="font-medium">Email:</span> {formData.developerProfile.emergencyContact.email}
              </div>
            </div>
          )}

          {formData.role === 'manager' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span> {formData.managerProfile.emergencyContact.name}
              </div>
              <div>
                <span className="font-medium">Relationship:</span> {formData.managerProfile.emergencyContact.relationship}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {formData.managerProfile.emergencyContact.phone}
              </div>
              <div>
                <span className="font-medium">Email:</span> {formData.managerProfile.emergencyContact.email}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
        <h5 className="font-medium text-indigo-900 mb-2">Ready to Submit</h5>
        <p className="text-sm text-indigo-700">
          Please review all the information above. Once you click "Create User", the account will be created and the user will be able to access the system.
        </p>
      </div>
    </div>
  );
};

export default ReviewForm;
