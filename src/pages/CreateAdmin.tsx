import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  UserPlus,
  ArrowLeft,
  Mail,
  User,
  Phone,
  Building2,
  Shield,
  Send,
  Eye,
  EyeOff
} from 'lucide-react';
import { superAdminService, CreateAdminData, Organization } from '@/services/superAdminService';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

const createAdminSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .when('sendWelcome', {
      is: false,
      then: (schema) => schema.required('Password is required when not sending welcome email'),
      otherwise: (schema) => schema.optional()
    })
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  profile: yup.object({
    firstName: yup
      .string()
      .required('First name is required')
      .max(50, 'First name cannot exceed 50 characters'),
    lastName: yup
      .string()
      .required('Last name is required')
      .max(50, 'Last name cannot exceed 50 characters'),
    phone: yup
      .string()
      .optional()
      .matches(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  }),
  organization: yup
    .string()
    .optional(),
  permissions: yup
    .array()
    .of(yup.string())
    .optional(),
  sendWelcome: yup
    .boolean()
    .default(true),
});

type FormData = yup.InferType<typeof createAdminSchema>;

const availablePermissions = [
  { id: 'users.read', label: 'View Users', description: 'Can view user lists and profiles' },
  { id: 'users.write', label: 'Manage Users', description: 'Can create and edit users' },
  { id: 'projects.read', label: 'View Projects', description: 'Can view project information' },
  { id: 'projects.write', label: 'Manage Projects', description: 'Can create and edit projects' },
  { id: 'projects.delete', label: 'Delete Projects', description: 'Can delete projects' },
  { id: 'analytics.read', label: 'View Analytics', description: 'Can access analytics and reports' },
  { id: 'settings.read', label: 'View Settings', description: 'Can view system settings' },
];

const CreateAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [showCustomPassword, setShowCustomPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createAdminSchema),
    defaultValues: {
      sendWelcome: true,
      permissions: ['users.read', 'projects.read', 'analytics.read'],
    },
  });

  const watchSendWelcome = watch('sendWelcome');
  const watchPermissions = watch('permissions') || [];

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await superAdminService.getOrganizations({
          limit: 100,
          sortBy: 'name',
          sortOrder: 'asc'
        });
        setOrganizations(response.data.docs);
      } catch (error: any) {
        toast.error('Failed to load organizations');
      } finally {
        setLoadingOrgs(false);
      }
    };

    fetchOrganizations();
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      
      // Transform form data to match CreateAdminData interface
      const adminData: CreateAdminData = {
        email: data.email,
        password: data.password,
        profile: data.profile,
        permissions: data.permissions?.filter(Boolean) as string[],
        sendWelcome: data.sendWelcome,
      };
      
      const response = await superAdminService.createAdmin(adminData);
      
      if (!data.sendWelcome && response.data.tempPassword) {
        setGeneratedPassword(response.data.tempPassword);
        setShowPassword(true);
      } else {
        toast.success(response.message);
        navigate('/super-admin/admins');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create admin');
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (permissionId: string) => {
    const currentPermissions = watchPermissions;
    const updatedPermissions = currentPermissions.includes(permissionId)
      ? currentPermissions.filter(p => p !== permissionId)
      : [...currentPermissions, permissionId];
    
    setValue('permissions', updatedPermissions);
  };

  if (loadingOrgs) {
    return <LoadingSpinner className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/super-admin/admins"
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Admins
            </Link>
            <div className="h-6 border-l border-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <UserPlus className="h-8 w-8 mr-3 text-indigo-600" />
                Create New Admin
              </h1>
              <p className="mt-1 text-gray-600">
                Add a new administrator to the system
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="label">
                  Email Address *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className={`input pl-10 ${
                      errors.email ? 'border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="admin@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 error-text">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password {!watchSendWelcome && '*'}
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Shield className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type="password"
                    id="password"
                    className={`input pl-10 ${
                      errors.password ? 'border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder={watchSendWelcome ? "Auto-generated" : "Enter password"}
                    disabled={watchSendWelcome}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 error-text">{errors.password.message}</p>
                )}
                {watchSendWelcome && (
                  <p className="mt-1 text-sm text-gray-500">
                    Password will be auto-generated and sent via email
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="organization" className="label">
                  Organization Strength
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="input pl-10 bg-gray-50 text-gray-600">
                    {organizations.length} Organizations Available
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  You can assign this admin to any organization after creation
                </p>
              </div>

              <div>
                <label htmlFor="firstName" className="label">
                  First Name *
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('profile.firstName')}
                    type="text"
                    id="firstName"
                    className={`input pl-10 ${
                      errors.profile?.firstName ? 'border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="John"
                  />
                </div>
                {errors.profile?.firstName && (
                  <p className="mt-1 error-text">{errors.profile.firstName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="label">
                  Last Name *
                </label>
                <div className="mt-1">
                  <input
                    {...register('profile.lastName')}
                    type="text"
                    id="lastName"
                    className={`input ${
                      errors.profile?.lastName ? 'border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="Doe"
                  />
                </div>
                {errors.profile?.lastName && (
                  <p className="mt-1 error-text">{errors.profile.lastName.message}</p>
                )}
              </div>

              <div className="">
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('profile.phone')}
                    type="tel"
                    id="phone"
                    className={`input pl-10 ${
                      errors.profile?.phone ? 'border-error-500 focus:ring-error-500' : ''
                    }`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.profile?.phone && (
                  <p className="mt-1 error-text">{errors.profile.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-indigo-600" />
              Permissions
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePermissions.map((permission) => (
                <div
                  key={permission.id}
                  className="relative flex items-start p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id={permission.id}
                      checked={watchPermissions.includes(permission.id)}
                      onChange={() => handlePermissionToggle(permission.id)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor={permission.id} className="font-medium text-gray-700 cursor-pointer">
                      {permission.label}
                    </label>
                    <p className="text-gray-500">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
              <Send className="h-5 w-5 mr-2 text-indigo-600" />
              Password & Notification Settings
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  {...register('sendWelcome')}
                  type="checkbox"
                  id="sendWelcome"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="sendWelcome" className="ml-3 text-sm font-medium text-gray-700">
                  Send welcome email with auto-generated password
                </label>
              </div>
              
              {!watchSendWelcome && (
                <div className="ml-7 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Note:</strong> If you don't send a welcome email, you must provide a password manually.
                  </p>
                  <div className="text-sm text-yellow-700">
                    <p><strong>Password Requirements:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Minimum 8 characters</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one number</li>
                    </ul>
                  </div>
                </div>
              )}
              
              {watchSendWelcome && (
                <div className="ml-7 p-4 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800">
                    <strong>Auto-generation:</strong> A secure password will be automatically generated and sent to the admin's email address.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              to="/super-admin/admins"
              className="btn-outline btn-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary btn-md"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Creating...</span>
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Admin
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Password Display Modal */}
      {generatedPassword && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <UserPlus className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mt-4">Admin Created Successfully</h3>
              <div className="mt-4 px-7 py-3">
                <p className="text-sm text-gray-500 mb-4">
                  The admin account has been created. Here is the temporary password:
                </p>
                <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-md">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={generatedPassword}
                    readOnly
                    className="flex-1 bg-transparent border-none focus:outline-none text-center font-mono"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please share this password securely with the admin.
                </p>
              </div>
              <div className="flex items-center px-4 py-3">
                <button
                  onClick={() => {
                    setGeneratedPassword(null);
                    navigate('/super-admin/admins');
                  }}
                  className="btn-primary w-full btn-md"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAdmin;
