import { useState, useEffect } from 'react';
import { DayWorkout, Exercise, DAYS_OF_WEEK } from '@/types/workout';

const STORAGE_KEY = 'workout-tracker-data';

const generateId = () => Math.random().toString(36).substring(2, 9);

const getInitialWorkouts = (): DayWorkout[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  return DAYS_OF_WEEK.map(day => ({
    id: generateId(),
    dayOfWeek: day.id,
    dayName: day.name,
    exercises: [],
    isCompleted: false,
    isRestDay: false,
  }));
};

export const useWorkouts = () => {
  const [workouts, setWorkouts] = useState<DayWorkout[]>(getInitialWorkouts);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  const toggleDayCompletion = (dayId: string) => {
    setWorkouts(prev =>
      prev.map(day =>
        day.id === dayId ? { ...day, isCompleted: !day.isCompleted } : day
      )
    );
  };

  const toggleRestDay = (dayId: string) => {
    setWorkouts(prev =>
      prev.map(day =>
        day.id === dayId ? { ...day, isRestDay: !day.isRestDay, exercises: [] } : day
      )
    );
  };

  const addExercise = (dayId: string, exercise: Omit<Exercise, 'id'>) => {
    setWorkouts(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, exercises: [...day.exercises, { ...exercise, id: generateId() }] }
          : day
      )
    );
  };

  const updateExercise = (dayId: string, exerciseId: string, updates: Partial<Exercise>) => {
    setWorkouts(prev =>
      prev.map(day =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, ...updates } : ex
              ),
            }
          : day
      )
    );
  };

  const removeExercise = (dayId: string, exerciseId: string) => {
    setWorkouts(prev =>
      prev.map(day =>
        day.id === dayId
          ? { ...day, exercises: day.exercises.filter(ex => ex.id !== exerciseId) }
          : day
      )
    );
  };

  const resetWeek = () => {
    setWorkouts(prev =>
      prev.map(day => ({ ...day, isCompleted: false }))
    );
  };

  const completedCount = workouts.filter(d => d.isCompleted || d.isRestDay).length;
  const progressPercentage = (completedCount / 7) * 100;

  return {
    workouts,
    toggleDayCompletion,
    toggleRestDay,
    addExercise,
    updateExercise,
    removeExercise,
    resetWeek,
    completedCount,
    progressPercentage,
  };
};
