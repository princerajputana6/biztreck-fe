import React, { useState } from 'react';
import { DollarSign, Plus, Trash2, Code, Clock, Globe } from 'lucide-react';

interface DeveloperFormProps {
  data: any;
  onChange: (data: any) => void;
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (index: number) => void;
  onToggleWorkingDay: (day: string) => void;
}

const DeveloperForm: React.FC<DeveloperFormProps> = ({ 
  data, 
  onChange, 
  onAddSkill, 
  onRemoveSkill, 
  onToggleWorkingDay 
}) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddSkill(newSkill);
      setNewSkill('');
    }
  };

  const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Developer Profile</h4>
      
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
            placeholder="DEV001"
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
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Mobile">Mobile</option>
            <option value="DevOps">DevOps</option>
            <option value="QA">QA</option>
            <option value="UI/UX">UI/UX</option>
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
            placeholder="Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
          <select
            required
            className="input w-full"
            value={data.experienceLevel}
            onChange={(e) => onChange({ ...data, experienceLevel: e.target.value })}
          >
            <option value="">Select Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
            <option value="Principal">Principal</option>
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Hourly Rate *
          </label>
          <div className="flex">
            <input
              type="number"
              required
              min="1"
              className="input flex-1 rounded-r-none"
              value={data.hourlyRate}
              onChange={(e) => onChange({ ...data, hourlyRate: parseFloat(e.target.value) || 0 })}
            />
            <select
              className="input rounded-l-none border-l-0 w-20"
              value={data.currency}
              onChange={(e) => onChange({ ...data, currency: e.target.value })}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Salary Type *</label>
          <select
            required
            className="input w-full"
            value={data.salaryType}
            onChange={(e) => onChange({ ...data, salaryType: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Hourly">Hourly</option>
            <option value="Fixed">Fixed</option>
            <option value="Contract">Contract</option>
          </select>
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
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Globe className="h-4 w-4 inline mr-1" />
            Time Zone *
          </label>
          <input
            type="text"
            required
            className="input w-full"
            value={data.timeZone}
            onChange={(e) => onChange({ ...data, timeZone: e.target.value })}
            placeholder="America/New_York"
          />
        </div>
      </div>

      {/* Skills Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Code className="h-4 w-4 inline mr-1" />
          Primary Skills * (At least one required)
        </label>
        <div className="flex mb-2">
          <input
            type="text"
            className="input flex-1 rounded-r-none"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill (e.g., React, Node.js)"
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button
            type="button"
            onClick={handleAddSkill}
            className="btn-primary rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {data.primarySkills.map((skill: string, index: number) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemoveSkill(index)}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Clock className="h-4 w-4 inline mr-1" />
          Working Days *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {workingDays.map(day => (
            <label key={day} className="flex items-center">
              <input
                type="checkbox"
                checked={data.availability?.workingDays?.includes(day) || false}
                onChange={() => onToggleWorkingDay(day)}
                className="mr-2"
              />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hours per Week</label>
          <input
            type="number"
            min="1"
            max="168"
            className="input w-full"
            value={data.availability.hoursPerWeek}
            onChange={(e) => onChange({
              ...data,
              availability: {
                ...data.availability,
                hoursPerWeek: parseInt(e.target.value) || 40
              }
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Start Time</label>
          <input
            type="time"
            className="input w-full"
            value={data.availability.preferredWorkingHours.start}
            onChange={(e) => onChange({
              ...data,
              availability: {
                ...data.availability,
                preferredWorkingHours: {
                  ...data.availability.preferredWorkingHours,
                  start: e.target.value
                }
              }
            })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred End Time</label>
          <input
            type="time"
            className="input w-full"
            value={data.availability.preferredWorkingHours.end}
            onChange={(e) => onChange({
              ...data,
              availability: {
                ...data.availability,
                preferredWorkingHours: {
                  ...data.availability.preferredWorkingHours,
                  end: e.target.value
                }
              }
            })}
          />
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
          <input
            type="url"
            className="input w-full"
            value={data.portfolioUrl}
            onChange={(e) => onChange({ ...data, portfolioUrl: e.target.value })}
            placeholder="https://portfolio.example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
          <input
            type="url"
            className="input w-full"
            value={data.githubProfile}
            onChange={(e) => onChange({ ...data, githubProfile: e.target.value })}
            placeholder="https://github.com/username"
          />
        </div>

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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Resume URL</label>
          <input
            type="url"
            className="input w-full"
            value={data.resumeUrl}
            onChange={(e) => onChange({ ...data, resumeUrl: e.target.value })}
            placeholder="https://resume.example.com"
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

export default DeveloperForm;
