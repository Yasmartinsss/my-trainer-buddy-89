import { Trash2 } from 'lucide-react';
import { Exercise } from '@/types/workout';
import { Button } from '@/components/ui/button';

interface ExerciseItemProps {
  exercise: Exercise;
  onRemove: () => void;
}

export const ExerciseItem = ({ exercise, onRemove }: ExerciseItemProps) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-lg group">
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{exercise.name}</p>
        {(exercise.sets || exercise.reps) && (
          <p className="text-xs text-muted-foreground">
            {exercise.sets && `${exercise.sets} séries`}
            {exercise.sets && exercise.reps && ' • '}
            {exercise.reps && `${exercise.reps} reps`}
          </p>
        )}
        {exercise.notes && (
          <p className="text-xs text-muted-foreground italic mt-1">{exercise.notes}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};
