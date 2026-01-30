import { Check, Moon } from 'lucide-react';
import { DayWorkout, DAYS_OF_WEEK } from '@/types/workout';
import { ExerciseItem } from './ExerciseItem';
import { AddExerciseForm } from './AddExerciseForm';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface DayCardProps {
  workout: DayWorkout;
  isToday: boolean;
  onToggleComplete: () => void;
  onToggleRestDay: () => void;
  onAddExercise: (exercise: { name: string; sets?: string; reps?: string }) => void;
  onRemoveExercise: (exerciseId: string) => void;
}

export const DayCard = ({
  workout,
  isToday,
  onToggleComplete,
  onToggleRestDay,
  onAddExercise,
  onRemoveExercise,
}: DayCardProps) => {
  const dayInfo = DAYS_OF_WEEK[workout.dayOfWeek];
  const hasExercises = workout.exercises.length > 0;
  const canComplete = hasExercises || workout.isRestDay;

  return (
    <div
      className={cn(
        'bg-card rounded-xl p-4 border transition-all duration-300 card-hover fade-in',
        workout.isCompleted && 'border-primary/50 glow-success',
        isToday && !workout.isCompleted && 'border-primary/30',
        !workout.isCompleted && !isToday && 'border-border'
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm transition-all',
              workout.isCompleted
                ? 'gradient-success text-primary-foreground'
                : isToday
                ? 'bg-primary/20 text-primary'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {workout.isCompleted ? (
              <Check className="w-6 h-6 check-animation" />
            ) : (
              dayInfo.short
            )}
          </div>
          <div>
            <h3 className="font-semibold">{dayInfo.name}</h3>
            <p className="text-xs text-muted-foreground">
              {workout.isRestDay
                ? 'Dia de descanso'
                : workout.exercises.length > 0
                ? `${workout.exercises.length} exercício${workout.exercises.length > 1 ? 's' : ''}`
                : 'Sem treino definido'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleRestDay}
            className={cn(
              'h-9 w-9',
              workout.isRestDay ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Moon className="w-4 h-4" />
          </Button>

          {canComplete && (
            <Button
              variant={workout.isCompleted ? 'default' : 'outline'}
              size="sm"
              onClick={onToggleComplete}
              className={cn(
                'min-w-[80px]',
                workout.isCompleted && 'gradient-success border-0'
              )}
            >
              {workout.isCompleted ? 'Feito!' : 'Concluir'}
            </Button>
          )}
        </div>
      </div>

      {!workout.isRestDay && (
        <div className="space-y-2">
          {workout.exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onRemove={() => onRemoveExercise(exercise.id)}
            />
          ))}
          <AddExerciseForm onAdd={onAddExercise} />
        </div>
      )}

      {workout.isRestDay && (
        <div className="flex items-center justify-center py-6 text-muted-foreground">
          <Moon className="w-5 h-5 mr-2" />
          <span className="text-sm">Dia de descanso</span>
        </div>
      )}
    </div>
  );
};
