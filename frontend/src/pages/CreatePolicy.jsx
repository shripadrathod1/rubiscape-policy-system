import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { policyService } from '../services/policyService';
import { useToast } from '../hooks/useToast';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyForm from '../forms/PolicyForm';
import Button from '../components/ui/Button';

export default function CreatePolicy() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      await policyService.create(formData);
      addToast('Policy created successfully!', 'success');
      navigate('/policies');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate(-1)} />
          <div>
            <h2 className="text-xl font-bold text-slate-100">Create Policy</h2>
            <p className="text-sm text-slate-500 mt-0.5">Define a new governance rule for your platform</p>
          </div>
        </div>
        <PolicyForm onSubmit={handleSubmit} loading={loading} submitLabel="Create Policy" />
      </div>
    </PageWrapper>
  );
}
