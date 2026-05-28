import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { policyService } from '../services/policyService';
import { usePolicy } from '../hooks/usePolicy';
import { useToast } from '../hooks/useToast';
import PageWrapper from '../components/layout/PageWrapper';
import PolicyForm from '../forms/PolicyForm';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';

export default function EditPolicy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { policy, loading: fetching, error } = usePolicy(id);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await policyService.update(id, formData);
      addToast('Policy updated successfully!', 'success');
      navigate(`/policies/${id}`);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (fetching) return <Loader size="lg" className="mt-24" />;
  if (error || !policy)
    return (
      <div className="text-center mt-24">
        <p className="text-rose-400 text-sm mb-4">{error ?? 'Policy not found'}</p>
        <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate('/policies')}>
          Back to list
        </Button>
      </div>
    );

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" icon={ArrowLeft} onClick={() => navigate(-1)} />
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-slate-100">Edit Policy</h2>
            <p className="text-sm text-slate-500 mt-0.5 truncate">{policy.name}</p>
          </div>
        </div>
        <PolicyForm
          initialData={policy}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Save Changes"
        />
      </div>
    </PageWrapper>
  );
}
