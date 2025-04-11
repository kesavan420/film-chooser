
import React from 'react';
import { Button } from '@/components/ui/button';
import PreferenceForm from '@/components/PreferenceForm';
import { UserPreference } from '@/types';

interface PersonalizationFormProps {
  onSubmit: (preferences: UserPreference) => void;
  onClose: () => void;
}

const PersonalizationForm: React.FC<PersonalizationFormProps> = ({ onSubmit, onClose }) => {
  return (
    <div className="bg-card p-6 rounded-lg shadow-lg border border-border animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Preferences</h2>
        <Button 
          variant="ghost" 
          onClick={onClose}
          size="sm"
        >
          Close
        </Button>
      </div>
      <PreferenceForm onSubmit={onSubmit} />
    </div>
  );
};

export default PersonalizationForm;
