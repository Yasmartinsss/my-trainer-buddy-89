import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddExerciseFormProps {
  onAdd: (exercise: { name: string; sets?: string; reps?: string; notes?: string }) => void;
}

export const AddExerciseForm = ({ onAdd }: AddExerciseFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({
      name: name.trim(),
      sets: sets.trim() || undefined,
      reps: reps.trim() || undefined,
    });

    setName('');
    setSets('');
    setReps('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="w-full justify-start text-muted-foreground hover:text-foreground"
      >
        <Plus className="w-4 h-4 mr-2" />
        Adicionar exercício
      </Button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 fade-in">
      <Input
        placeholder="Nome do exercício"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
        className="bg-muted border-border"
      />
      <div className="flex gap-2">
        <Input
          placeholder="Séries"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
          className="bg-muted border-border"
        />
        <Input
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
          className="bg-muted border-border"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" size="sm" className="flex-1">
          Adicionar
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
