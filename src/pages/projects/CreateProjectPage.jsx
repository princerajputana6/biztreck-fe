import React from 'react';
import Input from '../../components/ui/Input';
import projectService from '../../services/api/projectService';

const CreateProjectPage = () => {
  // Multi-step form state and handlers
  const [step, setStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Example initial form state (expand as needed for your fields)
  const [form, setForm] = React.useState({
    name: '',
    description: '',
    progress: '',
    dueDate: '',
    members: '', // comma-separated string for now
    phase: '',
    budget: '',
    status: 'active',
    priority: 'medium',
  });

  // Example step content (customize for your real steps)
  const steps = [
    {
      label: 'Step 1',
      content: (
        <div className="space-y-4">
          <Input
            label="Project Name"
            placeholder="Project Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            fullWidth
          />
          <Input
            label="Description"
            placeholder="Description"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            as="textarea"
            rows={3}
            fullWidth
          />
          <Input
            label="Progress (%)"
            type="number"
            placeholder="Progress"
            value={form.progress}
            onChange={e => setForm(f => ({ ...f, progress: e.target.value }))}
            min={0}
            max={100}
            fullWidth
          />
          <Input
            label="Due Date"
            type="date"
            value={form.dueDate}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
            fullWidth
          />
          <Input
            label="Members (comma separated)"
            placeholder="e.g. John, Jane, Mike"
            value={form.members}
            onChange={e => setForm(f => ({ ...f, members: e.target.value }))}
            fullWidth
          />
        </div>
      )
    },
    {
      label: 'Step 2',
      content: (
        <div className="space-y-4">
          <Input
            label="Phase"
            placeholder="Phase"
            value={form.phase}
            onChange={e => setForm(f => ({ ...f, phase: e.target.value }))}
            fullWidth
          />
          <Input
            label="Budget"
            type="number"
            placeholder="Budget"
            value={form.budget}
            onChange={e => setForm(f => ({ ...f, budget: e.target.value }))}
            fullWidth
          />
          <Input
            label="Status"
            placeholder="Status"
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            fullWidth
          />
          <Input
            label="Priority"
            placeholder="Priority"
            value={form.priority}
            onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}
            fullWidth
          />
        </div>
      )
    },
  ]; // End of steps array. Only two steps should be present.
// (Remove all code after this line up to the next section)


  const handleNext = (e) => {
    e.preventDefault();
    setStep(s => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(s => Math.max(s - 1, 0));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Prepare payload for backend (parse members to array, progress/budget to number)
      const payload = {
        ...form,
        members: form.members.split(',').map(m => m.trim()).filter(Boolean),
        progress: Number(form.progress) || 0,
        budget: Number(form.budget) || 0,
      };
      
      console.log('Sending payload:', payload); // Debug log
      
      const response = await projectService.createProject(payload);
      console.log('Project created successfully:', response);
      
      setSuccess(true);
      
      // Reset form after successful creation
      setForm({
        name: '',
        description: '',
        progress: '',
        dueDate: '',
        members: '',
        phase: '',
        budget: '',
        status: 'active',
        priority: 'medium',
      });
      setStep(0);
      
    } catch (err) {
      console.error('Error creating project:', err);
      setError(err.message || 'An error occurred while creating the project');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
        <p className="text-gray-600 mt-1">Start a new business project</p>
      </div>
      <div className="bg-white rounded-lg shadow p-8 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 mb-4">
            {steps.map((s, i) => (
              <div key={i} className={`flex-1 text-center py-2 rounded ${i === step ? 'bg-blue-100 font-bold' : 'bg-gray-100'}`}>
                {s.label}
              </div>
            ))}
          </div>
          <div>{steps[step].content}</div>
          <div className="flex justify-between mt-6">
            <button type="button" className="btn" onClick={handleBack} disabled={step === 0}>
              Back
            </button>
            {step < steps.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? 'Saving...' : 'Create Project'}
              </button>
            )}
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
          {success && <div className="text-green-600 mt-2">Project created successfully!</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
