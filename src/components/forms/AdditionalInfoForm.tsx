import React from 'react';
import { Phone, Mail, User } from 'lucide-react';

interface AdditionalInfoFormProps {
  role: 'developer' | 'manager' | 'client';
  developerData: any;
  managerData: any;
  clientData: any;
  onDeveloperChange: (data: any) => void;
  onManagerChange: (data: any) => void;
  onClientChange: (data: any) => void;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({
  role,
  developerData,
  managerData,
  clientData,
  onDeveloperChange,
  onManagerChange,
  onClientChange
}) => {
  if (role === 'developer') {
    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Emergency Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Contact Name *
            </label>
            <input
              type="text"
              required
              className="input w-full"
              value={developerData.emergencyContact.name}
              onChange={(e) => onDeveloperChange({
                ...developerData,
                emergencyContact: { ...developerData.emergencyContact, name: e.target.value }
              })}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              className="input w-full"
              value={developerData.emergencyContact.relationship}
              onChange={(e) => onDeveloperChange({
                ...developerData,
                emergencyContact: { ...developerData.emergencyContact, relationship: e.target.value }
              })}
              placeholder="Spouse, Parent, Sibling"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              className="input w-full"
              value={developerData.emergencyContact.phone}
              onChange={(e) => onDeveloperChange({
                ...developerData,
                emergencyContact: { ...developerData.emergencyContact, phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              className="input w-full"
              value={developerData.emergencyContact.email}
              onChange={(e) => onDeveloperChange({
                ...developerData,
                emergencyContact: { ...developerData.emergencyContact, email: e.target.value }
              })}
              placeholder="contact@example.com"
            />
          </div>
        </div>
      </div>
    );
  }

  if (role === 'manager') {
    return (
      <div className="space-y-6">
        <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Emergency Contact Information</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="h-4 w-4 inline mr-1" />
              Contact Name *
            </label>
            <input
              type="text"
              required
              className="input w-full"
              value={managerData.emergencyContact.name}
              onChange={(e) => onManagerChange({
                ...managerData,
                emergencyContact: { ...managerData.emergencyContact, name: e.target.value }
              })}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              className="input w-full"
              value={managerData.emergencyContact.relationship}
              onChange={(e) => onManagerChange({
                ...managerData,
                emergencyContact: { ...managerData.emergencyContact, relationship: e.target.value }
              })}
              placeholder="Spouse, Parent, Sibling"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="h-4 w-4 inline mr-1" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              className="input w-full"
              value={managerData.emergencyContact.phone}
              onChange={(e) => onManagerChange({
                ...managerData,
                emergencyContact: { ...managerData.emergencyContact, phone: e.target.value }
              })}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              className="input w-full"
              value={managerData.emergencyContact.email}
              onChange={(e) => onManagerChange({
                ...managerData,
                emergencyContact: { ...managerData.emergencyContact, email: e.target.value }
              })}
              placeholder="contact@example.com"
            />
          </div>
        </div>
      </div>
    );
  }

  // Client role - no additional info required
  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h4>
      
      <div className="text-center py-8">
        <div className="text-gray-500">
          <User className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No additional information required for client profiles.</p>
          <p className="text-sm mt-2">You can proceed to review and submit the form.</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
