import React, { useState } from 'react';
import {
  Mail,
  Phone,
  Lock,
  Briefcase,
  Check,
  X,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/utils/cn';
import toast from 'react-hot-toast';
import DeveloperForm from './DeveloperForm';
import ManagerForm from './ManagerForm';
import ClientForm from './ClientForm';
import AdditionalInfoForm from './AdditionalInfoForm';
import ReviewForm from './ReviewForm';

interface ComprehensiveUserFormProps {
  onSubmit: (userData: any) => Promise<void>;
  onCancel: () => void;
}

const ComprehensiveUserForm: React.FC<ComprehensiveUserFormProps> = ({ onSubmit, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state with all PSA fields
  const [formData, setFormData] = useState({
    // Basic Information
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    role: 'client' as 'developer' | 'manager' | 'client',
    avatar: '',
    
    // Developer Profile
    developerProfile: {
      employeeId: '',
      department: '',
      designation: '',
      experienceLevel: '',
      totalExperience: 0,
      hourlyRate: 0,
      currency: 'USD',
      salaryType: '',
      primarySkills: [] as string[],
      secondarySkills: [] as string[],
      workingHours: '',
      timeZone: '',
      availability: {
        hoursPerWeek: 40,
        workingDays: [] as string[],
        preferredWorkingHours: { start: '09:00', end: '17:00' }
      },
      portfolioUrl: '',
      githubProfile: '',
      linkedinProfile: '',
      resumeUrl: '',
      bio: '',
      languages: [] as Array<{language: string, proficiency: string}>,
      emergencyContact: { name: '', relationship: '', phone: '', email: '' }
    },
    
    // Manager Profile
    managerProfile: {
      employeeId: '',
      department: '',
      designation: '',
      managementLevel: '',
      totalExperience: 0,
      managementExperience: 0,
      teamSize: 0,
      managementAreas: [] as string[],
      maxConcurrentProjects: 5,
      technicalSkills: [] as string[],
      managementSkills: [] as string[],
      budgetAuthority: 0,
      costCenter: '',
      workingHours: '',
      timeZone: '',
      bio: '',
      linkedinProfile: '',
      emergencyContact: { name: '', relationship: '', phone: '', email: '' }
    },
    
    // Client Profile
    clientProfile: {
      companyName: '',
      industry: '',
      companySize: '',
      website: '',
      designation: '',
      workPhone: '',
      alternatePhone: '',
      address: { street: '', city: '', state: '', zipCode: '', country: '' },
      clientType: '',
      clientSource: '',
      clientPriority: 'Medium',
      billingAddress: { 
        street: '', city: '', state: '', zipCode: '', country: '', 
        sameAsCompanyAddress: true 
      },
      paymentTerms: '',
      preferredCurrency: 'USD',
      budgetRange: { min: 0, max: 0, currency: 'USD' },
      projectTypes: [] as string[],
      communicationPreferences: {
        preferredMethods: [] as string[],
        preferredTimes: [] as string[],
        frequency: 'Weekly'
      },
      relationshipStatus: 'Prospect',
      notes: '',
      tags: [] as string[]
    }
  });

  const steps = [
    { number: 1, title: 'Basic Information', description: 'Email, password, name, and role selection' },
    { number: 2, title: 'Role-Specific Details', description: 'Complete profile and additional information' },
    { number: 3, title: 'Review & Submit', description: 'Review all information and submit' }
  ];

  const validateStep = (step: number) => {
    const errors: string[] = [];
    
    if (step === 1) {
      if (!formData.email) errors.push('Email is required');
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.push('Invalid email format');
      if (!formData.password || formData.password.length < 8) errors.push('Password must be at least 8 characters');
      if (!formData.firstName) errors.push('First name is required');
      if (!formData.lastName) errors.push('Last name is required');
      if (!formData.phone) errors.push('Phone is required');
    } else if (step === 2) {
      if (formData.role === 'developer') {
        const dev = formData.developerProfile;
        if (!dev.employeeId) errors.push('Employee ID is required');
        if (!dev.department) errors.push('Department is required');
        if (!dev.designation) errors.push('Designation is required');
        if (!dev.experienceLevel) errors.push('Experience level is required');
        if (dev.totalExperience < 0) errors.push('Total experience must be positive');
        if (dev.hourlyRate <= 0) errors.push('Hourly rate is required');
        if (!dev.salaryType) errors.push('Salary type is required');
        if (dev.primarySkills.length === 0) errors.push('At least one primary skill is required');
        if (!dev.workingHours) errors.push('Working hours is required');
        if (!dev.timeZone) errors.push('Time zone is required');
        // Emergency contact validation for developer
        if (!dev.emergencyContact.name) errors.push('Emergency contact name is required');
        if (!dev.emergencyContact.phone) errors.push('Emergency contact phone is required');
      } else if (formData.role === 'manager') {
        const mgr = formData.managerProfile;
        if (!mgr.employeeId) errors.push('Employee ID is required');
        if (!mgr.department) errors.push('Department is required');
        if (!mgr.designation) errors.push('Designation is required');
        if (!mgr.managementLevel) errors.push('Management level is required');
        if (mgr.totalExperience < 0) errors.push('Total experience must be positive');
        if (mgr.managementExperience < 0) errors.push('Management experience must be positive');
        if (mgr.teamSize < 0) errors.push('Team size must be positive');
        if (mgr.managementAreas.length === 0) errors.push('At least one management area is required');
        if (mgr.budgetAuthority <= 0) errors.push('Budget authority is required');
        if (!mgr.costCenter) errors.push('Cost center is required');
        if (!mgr.workingHours) errors.push('Working hours is required');
        // Emergency contact validation for manager
        if (!mgr.emergencyContact.name) errors.push('Emergency contact name is required');
        if (!mgr.emergencyContact.phone) errors.push('Emergency contact phone is required');
      } else if (formData.role === 'client') {
        const client = formData.clientProfile;
        if (!client.companyName) errors.push('Company name is required');
        if (!client.industry) errors.push('Industry is required');
        if (!client.companySize) errors.push('Company size is required');
        if (!client.designation) errors.push('Designation is required');
        if (!client.address.street) errors.push('Street address is required');
        if (!client.address.city) errors.push('City is required');
        if (!client.address.state) errors.push('State is required');
        if (!client.address.zipCode) errors.push('Zip code is required');
        if (!client.address.country) errors.push('Country is required');
        if (!client.clientType) errors.push('Client type is required');
        if (!client.clientSource) errors.push('Client source is required');
        if (!client.paymentTerms) errors.push('Payment terms is required');
      }
    }
    
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      toast.error(errors[0]);
      return;
    }
    setCurrentStep(prev => Math.min(3, prev + 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    // Final validation
    const allErrors = [1, 2].flatMap(step => validateStep(step));
    if (allErrors.length > 0) {
      toast.error(allErrors[0]);
      return;
    }

    setIsSubmitting(true);
    try {
      const userData: any = {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        profile: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          avatar: formData.avatar
        }
      };

      // Add role-specific profile data
      if (formData.role === 'developer') {
        userData.developerProfile = formData.developerProfile;
      } else if (formData.role === 'manager') {
        userData.managerProfile = formData.managerProfile;
      } else if (formData.role === 'client') {
        userData.clientProfile = formData.clientProfile;
      }

      await onSubmit(userData);
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions for array management
  const addToArray = (path: string, value: string) => {
    if (!value.trim()) return;
    
    const pathParts = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      
      const finalKey = pathParts[pathParts.length - 1];
      if (!current[finalKey]) current[finalKey] = [];
      current[finalKey] = [...current[finalKey], value.trim()];
      
      return newData;
    });
  };

  const removeFromArray = (path: string, index: number) => {
    const pathParts = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      for (let i = 0; i < pathParts.length - 1; i++) {
        current = current[pathParts[i]];
      }
      
      const finalKey = pathParts[pathParts.length - 1];
      current[finalKey] = current[finalKey].filter((_: any, i: number) => i !== index);
      
      return newData;
    });
  };

  const toggleArrayItem = (path: string, item: string) => {
    const pathParts = path.split('.');
    setFormData(prev => {
      const newData = { ...prev };
      let current: any = newData;
      
      // Navigate to the parent object, creating nested objects if they don't exist
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      const finalKey = pathParts[pathParts.length - 1];
      if (!current[finalKey]) current[finalKey] = [];
      
      const currentArray = current[finalKey];
      
      if (currentArray.includes(item)) {
        current[finalKey] = currentArray.filter((i: string) => i !== item);
      } else {
        current[finalKey] = [...currentArray, item];
      }
      
      return newData;
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-4 mx-auto p-5 border max-w-5xl shadow-lg rounded-md bg-white mb-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Create New User</h3>
            <p className="text-gray-600 mt-1">Complete PSA user profile setup</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2',
                  currentStep >= step.number
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-gray-300 text-gray-500'
                )}>
                  {currentStep > step.number ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={cn(
                    'text-sm font-medium',
                    currentStep >= step.number ? 'text-indigo-600' : 'text-gray-500'
                  )}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={cn(
                    'flex-1 h-0.5 mx-4',
                    currentStep > step.number ? 'bg-indigo-600' : 'bg-gray-300'
                  )} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-[600px] max-h-[70vh] overflow-y-auto">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="input w-full"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="user@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="h-4 w-4 inline mr-1" />
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="input w-full pr-10"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Minimum 8 characters"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="John"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    required
                    className="input w-full"
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Doe"
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
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Role *
                  </label>
                  <select
                    required
                    className="input w-full"
                    value={formData.role}
                    onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                  >
                    <option value="client">Client</option>
                    <option value="developer">Developer</option>
                    <option value="manager">Manager</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Role-Specific Details & Additional Information */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <h4 className="text-lg font-semibold text-gray-900 border-b pb-2">Complete Profile Details</h4>
              
              {/* Role-Specific Section */}
              <div>
                {formData.role === 'developer' && (
                  <DeveloperForm 
                    data={formData.developerProfile}
                    onChange={(data) => setFormData(prev => ({ ...prev, developerProfile: data }))}
                    onAddSkill={(skill) => addToArray('developerProfile.primarySkills', skill)}
                    onRemoveSkill={(index) => removeFromArray('developerProfile.primarySkills', index)}
                    onToggleWorkingDay={(day) => toggleArrayItem('developerProfile.availability.workingDays', day)}
                  />
                )}

                {formData.role === 'manager' && (
                  <ManagerForm 
                    data={formData.managerProfile}
                    onChange={(data) => setFormData(prev => ({ ...prev, managerProfile: data }))}
                    onToggleManagementArea={(area) => toggleArrayItem('managerProfile.managementAreas', area)}
                    onAddSkill={(skill: string, type: 'technical' | 'management') => addToArray(`managerProfile.${type}Skills`, skill)}
                    onRemoveSkill={(index: number, type: 'technical' | 'management') => removeFromArray(`managerProfile.${type}Skills`, index)}
                  />
                )}

                {formData.role === 'client' && (
                  <ClientForm 
                    data={formData.clientProfile}
                    onChange={(data) => setFormData(prev => ({ ...prev, clientProfile: data }))}
                  />
                )}
              </div>

              {/* Additional Information Section */}
              <div className="border-t pt-6">
                
                <AdditionalInfoForm 
                  role={formData.role}
                  developerData={formData.developerProfile}
                  managerData={formData.managerProfile}
                  clientData={formData.clientProfile}
                  onDeveloperChange={(data) => setFormData(prev => ({ ...prev, developerProfile: data }))}
                  onManagerChange={(data) => setFormData(prev => ({ ...prev, managerProfile: data }))}
                  onClientChange={(data) => setFormData(prev => ({ ...prev, clientProfile: data }))}
                />
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <ReviewForm 
              formData={formData}
              onEdit={(step) => setCurrentStep(step)}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={cn(
              'btn-outline btn-md flex items-center',
              currentStep === 1 && 'opacity-50 cursor-not-allowed'
            )}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </button>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline btn-md"
            >
              Cancel
            </button>
            
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn-primary btn-md flex items-center"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="btn-primary btn-md flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Create User
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveUserForm;
