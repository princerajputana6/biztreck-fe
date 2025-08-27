import React, { useState } from 'react';
import { DollarSign, Users, Target, Plus, Trash2 } from 'lucide-react';

interface ManagerFormProps {
  data: any;
  onChange: (data: any) => void;
  onToggleManagementArea: (area: string) => void;
  onAddSkill: (skill: string, type: 'technical' | 'management') => void;
  onRemoveSkill: (index: number, type: 'technical' | 'management') => void;
}

const ManagerForm: React.FC<ManagerFormProps> = ({ 
  data, 
  onChange, 
  onToggleManagementArea,
  onAddSkill,
  onRemoveSkill
}) => {
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newManagementSkill, setNewManagementSkill] = useState('');

  const managementAreas = [
    'Project Management', 
    'Team Management', 
    'Client Management', 
    'Resource Planning', 
    'Budget Management'
  ];

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim()) {
      onAddSkill(newTechnicalSkill, 'technical');
      setNewTechnicalSkill('');
    }
  };

  const handleAddManagementSkill = () => {
    if (newManagementSkill.trim()) {
      onAddSkill(newManagementSkill, 'management');
      setNewManagementSkill('');
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Manager Profile</h4>
      
      {/* Professional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.employeeId}
            onChange={(e) => onChange({ ...data, employeeId: e.target.value })}
            placeholder="MGR001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
          <select
            required
            className="input w-full"
            value={data.department}
            onChange={(e) => onChange({ ...data, department: e.target.value })}
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Product">Product</option>
            <option value="Operations">Operations</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Designation *</label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.designation}
            onChange={(e) => onChange({ ...data, designation: e.target.value })}
            placeholder="Project Manager"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Management Level *</label>
          <select
            required
            className="input w-full"
            value={data.managementLevel}
            onChange={(e) => onChange({ ...data, managementLevel: e.target.value })}
          >
            <option value="">Select Level</option>
            <option value="Team Lead">Team Lead</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Senior Manager">Senior Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (Years) *</label>
          <input
            type="number"
            required
            min="0"
            max="50"
            className="input w-full"
            value={data.totalExperience}
            onChange={(e) => onChange({ ...data, totalExperience: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Management Experience (Years) *</label>
          <input
            type="number"
            required
            min="0"
            max="50"
            className="input w-full"
            value={data.managementExperience}
            onChange={(e) => onChange({ ...data, managementExperience: parseInt(e.target.value) || 0 })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="h-4 w-4 inline mr-1" />
            Team Size *
          </label>
          <input
            type="number"
            required
            min="0"
            className="input w-full"
            value={data.teamSize}
            onChange={(e) => onChange({ ...data, teamSize: parseInt(e.target.value) || 0 })}
            placeholder="Number of direct reports"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Projects</label>
          <input
            type="number"
            min="1"
            className="input w-full"
            value={data.maxConcurrentProjects}
            onChange={(e) => onChange({ ...data, maxConcurrentProjects: parseInt(e.target.value) || 5 })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Budget Authority *
          </label>
          <input
            type="number"
            required
            min="0"
            className="input w-full"
            value={data.budgetAuthority}
            onChange={(e) => onChange({ ...data, budgetAuthority: parseFloat(e.target.value) || 0 })}
            placeholder="Maximum budget approval amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cost Center *</label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.costCenter}
            onChange={(e) => onChange({ ...data, costCenter: e.target.value })}
            placeholder="CC-ENG-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours *</label>
          <select
            required
            className="input w-full"
            value={data.workingHours}
            onChange={(e) => onChange({ ...data, workingHours: e.target.value })}
          >
            <option value="">Select Hours</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <input
            type="text"
            className="input w-full"
            value={data.timeZone}
            onChange={(e) => onChange({ ...data, timeZone: e.target.value })}
            placeholder="America/New_York"
          />
        </div>
      </div>

      {/* Management Areas */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Target className="h-4 w-4 inline mr-1" />
          Management Areas * (Select at least one)
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {managementAreas.map(area => (
            <label key={area} className="flex items-center">
              <input
                type="checkbox"
                checked={data.managementAreas?.includes(area) || false}
                onChange={() => onToggleManagementArea(area)}
                className="mr-2"
              />
              <span className="text-sm">{area}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
        <div className="flex mb-2">
          <input
            type="text"
            className="input flex-1 rounded-r-none"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="Add technical skill"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTechnicalSkill()}
          />
          <button
            type="button"
            onClick={handleAddTechnicalSkill}
            className="btn-primary rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.technicalSkills.map((skill: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(index, 'technical')}
                className="ml-2 text-blue-600 hover:text-blue-800"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Management Skills */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Management Skills</label>
        <div className="flex mb-2">
          <input
            type="text"
            className="input flex-1 rounded-r-none"
            value={newManagementSkill}
            onChange={(e) => setNewManagementSkill(e.target.value)}
            placeholder="Add management skill (e.g., Team Leadership, Agile/Scrum)"
            onKeyPress={(e) => e.key === 'Enter' && handleAddManagementSkill()}
          />
          <button
            type="button"
            onClick={handleAddManagementSkill}
            className="btn-primary rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.managementSkills.map((skill: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(index, 'management')}
                className="ml-2 text-green-600 hover:text-green-800"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
          <input
            type="url"
            className="input w-full"
            value={data.linkedinProfile}
            onChange={(e) => onChange({ ...data, linkedinProfile: e.target.value })}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          className="input w-full h-24"
          maxLength={500}
          value={data.bio}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
          placeholder="Brief professional bio (max 500 characters)"
        />
        <p className="text-xs text-gray-500 mt-1">{data.bio.length}/500 characters</p>
      </div>
    </div>
  );
};

export default ManagerForm;
