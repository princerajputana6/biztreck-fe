import React from 'react';
import { Building2, MapPin, DollarSign, Phone, Globe } from 'lucide-react';

interface ClientFormProps {
  data: any;
  onChange: (data: any) => void;
}

const ClientForm: React.FC<ClientFormProps> = ({ 
  data, 
  onChange
}) => {

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Client Profile</h4>
      
      {/* Company Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Building2 className="h-4 w-4 inline mr-1" />
            Company Name *
          </label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.companyName}
            onChange={(e) => onChange({ ...data, companyName: e.target.value })}
            placeholder="Acme Corporation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <select
            required
            className="input w-full"
            value={data.industry}
            onChange={(e) => onChange({ ...data, industry: e.target.value })}
          >
            <option value="">Select Industry</option>
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Retail">Retail</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
          <select
            required
            className="input w-full"
            value={data.companySize}
            onChange={(e) => onChange({ ...data, companySize: e.target.value })}
          >
            <option value="">Select Size</option>
            <option value="Startup (1-10)">Startup (1-10)</option>
            <option value="Small (11-50)">Small (11-50)</option>
            <option value="Medium (51-200)">Medium (51-200)</option>
            <option value="Large (201-1000)">Large (201-1000)</option>
            <option value="Enterprise (1000+)">Enterprise (1000+)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="h-4 w-4 inline mr-1" />
            Website
          </label>
          <input
            type="url"
            className="input w-full"
            value={data.website}
            onChange={(e) => onChange({ ...data, website: e.target.value })}
            placeholder="https://company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Designation *</label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.designation}
            onChange={(e) => onChange({ ...data, designation: e.target.value })}
            placeholder="CTO, Product Manager, Business Owner"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="h-4 w-4 inline mr-1" />
            Work Phone
          </label>
          <input
            type="tel"
            className="input w-full"
            value={data.workPhone}
            onChange={(e) => onChange({ ...data, workPhone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Alternate Phone</label>
          <input
            type="tel"
            className="input w-full"
            value={data.alternatePhone}
            onChange={(e) => onChange({ ...data, alternatePhone: e.target.value })}
            placeholder="+1 (555) 987-6543"
          />
        </div>
      </div>

      {/* Address Information */}
      <div>
        <h5 className="text-md font-medium text-gray-900 mb-4">
          <MapPin className="h-4 w-4 inline mr-1" />
          Company Address *
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
            <input
              type="text"
              required
              className="input w-full"
              value={data.address.street}
              onChange={(e) => onChange({
                ...data,
                address: { ...data.address, street: e.target.value }
              })}
              placeholder="123 Main Street"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              required
              className="input w-full"
              value={data.address.city}
              onChange={(e) => onChange({
                ...data,
                address: { ...data.address, city: e.target.value }
              })}
              placeholder="New York"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              type="text"
              required
              className="input w-full"
              value={data.address.state}
              onChange={(e) => onChange({
                ...data,
                address: { ...data.address, state: e.target.value }
              })}
              placeholder="NY"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code *</label>
            <input
              type="text"
              required
              className="input w-full"
              value={data.address.zipCode}
              onChange={(e) => onChange({
                ...data,
                address: { ...data.address, zipCode: e.target.value }
              })}
              placeholder="10001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
            <input
              type="text"
              required
              className="input w-full"
              value={data.address.country}
              onChange={(e) => onChange({
                ...data,
                address: { ...data.address, country: e.target.value }
              })}
              placeholder="United States"
            />
          </div>
        </div>
      </div>

      {/* Business Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Type *</label>
          <select
            required
            className="input w-full"
            value={data.clientType}
            onChange={(e) => onChange({ ...data, clientType: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Direct Client">Direct Client</option>
            <option value="Agency">Agency</option>
            <option value="Referral">Referral</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Source *</label>
          <select
            required
            className="input w-full"
            value={data.clientSource}
            onChange={(e) => onChange({ ...data, clientSource: e.target.value })}
          >
            <option value="">Select Source</option>
            <option value="Website">Website</option>
            <option value="Referral">Referral</option>
            <option value="Social Media">Social Media</option>
            <option value="Advertisement">Advertisement</option>
            <option value="Cold Outreach">Cold Outreach</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Client Priority</label>
          <select
            className="input w-full"
            value={data.clientPriority}
            onChange={(e) => onChange({ ...data, clientPriority: e.target.value })}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Terms *</label>
          <select
            required
            className="input w-full"
            value={data.paymentTerms}
            onChange={(e) => onChange({ ...data, paymentTerms: e.target.value })}
          >
            <option value="">Select Terms</option>
            <option value="Net 15">Net 15</option>
            <option value="Net 30">Net 30</option>
            <option value="Net 45">Net 45</option>
            <option value="Net 60">Net 60</option>
            <option value="Immediate">Immediate</option>
            <option value="Custom">Custom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Currency</label>
          <select
            className="input w-full"
            value={data.preferredCurrency}
            onChange={(e) => onChange({ ...data, preferredCurrency: e.target.value })}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="INR">INR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      {/* Budget Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <DollarSign className="h-4 w-4 inline mr-1" />
          Budget Range
        </label>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="number"
              min="0"
              className="input w-full"
              placeholder="Min"
              value={data.budgetRange.min}
              onChange={(e) => onChange({
                ...data,
                budgetRange: { ...data.budgetRange, min: parseFloat(e.target.value) || 0 }
              })}
            />
          </div>
          <div>
            <input
              type="number"
              min="0"
              className="input w-full"
              placeholder="Max"
              value={data.budgetRange.max}
              onChange={(e) => onChange({
                ...data,
                budgetRange: { ...data.budgetRange, max: parseFloat(e.target.value) || 0 }
              })}
            />
          </div>
          <div>
            <select
              className="input w-full"
              value={data.budgetRange.currency}
              onChange={(e) => onChange({
                ...data,
                budgetRange: { ...data.budgetRange, currency: e.target.value }
              })}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>
      </div>



      {/* Additional Information */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          className="input w-full h-24"
          maxLength={1000}
          value={data.notes}
          onChange={(e) => onChange({ ...data, notes: e.target.value })}
          placeholder="Additional notes about the client (max 1000 characters)"
        />
        <p className="text-xs text-gray-500 mt-1">{data.notes.length}/1000 characters</p>
      </div>
    </div>
  );
};

export default ClientForm;
