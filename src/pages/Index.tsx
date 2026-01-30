import { useWorkouts } from '@/hooks/useWorkouts';
import { ProgressHeader } from '@/components/ProgressHeader';
import { DayCard } from '@/components/DayCard';

const Index = () => {
  const {
    workouts,
    toggleDayCompletion,
    toggleRestDay,
    addExercise,
    removeExercise,
    resetWeek,
    completedCount,
    progressPercentage,
  } = useWorkouts();

  // Get current day of week (0 = Sunday in JS, we need to convert to our format where 0 = Monday)
  const today = new Date().getDay();
  const todayIndex = today === 0 ? 6 : today - 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-lg mx-auto px-4 py-6 pb-20">
        <ProgressHeader
          completedCount={completedCount}
          progressPercentage={progressPercentage}
          onReset={resetWeek}
        />

        <div className="space-y-4">
          {workouts.map((workout) => (
            <DayCard
              key={workout.id}
              workout={workout}
              isToday={workout.dayOfWeek === todayIndex}
              onToggleComplete={() => toggleDayCompletion(workout.id)}
              onToggleRestDay={() => toggleRestDay(workout.id)}
              onAddExercise={(exercise) => addExercise(workout.id, exercise)}
              onRemoveExercise={(exerciseId) => removeExercise(workout.id, exerciseId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
