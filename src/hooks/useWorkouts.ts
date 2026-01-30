import { useState, useEffect } from 'react';
import { DayWorkout, Exercise, DAYS_OF_WEEK } from '@/types/workout';

const STORAGE_KEY = 'workout-tracker-data';

const generateId = () => Math.random().toString(36).substring(2, 9);

const getDefaultWorkouts = (): DayWorkout[] => {
  return [
    {
      id: generateId(),
      dayOfWeek: 0,
      dayName: 'Segunda',
      exercises: [
        { id: generateId(), name: 'Goblet Squat', sets: '3', reps: '15' },
        { id: generateId(), name: 'Leg Press Horizontal', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Mesa Flexora', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Cadeira Extensora', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Panturrilha em Pé Máquina', sets: '4', reps: '15' },
        { id: generateId(), name: 'Cadeira Abdutora', sets: '3', reps: '15' },
        { id: generateId(), name: 'Prancha', sets: '3', reps: '20-40seg' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 1,
      dayName: 'Terça',
      exercises: [
        { id: generateId(), name: 'Supino Máquina', sets: '3', reps: '15' },
        { id: generateId(), name: 'Puxada na Frente Triângulo', sets: '3', reps: '15' },
        { id: generateId(), name: 'Remada Baixa Máquina', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Desenvolvimento Máquina', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Elevação Lateral', sets: '3', reps: '15' },
        { id: generateId(), name: 'Bíceps Máquina Articulada', sets: '3', reps: '15' },
        { id: generateId(), name: 'Tríceps Máquina', sets: '3', reps: '15' },
        { id: generateId(), name: 'Bike Indoor', sets: '', reps: '', notes: 'Cardio' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 2,
      dayName: 'Quarta',
      exercises: [
        { id: generateId(), name: 'Caminhada/Corrida', sets: '', reps: '', notes: 'Cardio' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 3,
      dayName: 'Quinta',
      exercises: [
        { id: generateId(), name: 'Levantamento Terra com KTB', sets: '3', reps: '10-12' },
        { id: generateId(), name: 'Afundo', sets: '3', reps: '10-12' },
        { id: generateId(), name: 'Cadeira Flexora', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Step Up Baixo', sets: '3', reps: '10-12', notes: 'Sem halter, de preferência' },
        { id: generateId(), name: 'Panturrilha Sentado', sets: '3', reps: '15' },
        { id: generateId(), name: 'Cadeira Adutora', sets: '3', reps: '15' },
        { id: generateId(), name: 'Abdominal Infra Paralela', sets: '3', reps: '10', notes: 'Joelhos flexionados' },
        { id: generateId(), name: 'Bike Indoor', sets: '', reps: '', notes: 'Cardio' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 4,
      dayName: 'Sexta',
      exercises: [
        { id: generateId(), name: 'Puxada Máquina', sets: '3', reps: '15' },
        { id: generateId(), name: 'Voador Máquina', sets: '3', reps: '15' },
        { id: generateId(), name: 'Remada Articulada', sets: '3', reps: '15' },
        { id: generateId(), name: 'Flexão com Joelhos Apoiados', sets: '3', reps: '12-15' },
        { id: generateId(), name: 'Facepull', sets: '3', reps: '15' },
        { id: generateId(), name: 'Bíceps na Polia Barra Reta', sets: '3', reps: '15' },
        { id: generateId(), name: 'Tríceps na Polia', sets: '3', reps: '15' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 5,
      dayName: 'Sábado',
      exercises: [
        { id: generateId(), name: 'Bike Indoor', sets: '', reps: '', notes: 'Cardio' },
      ],
      isCompleted: false,
      isRestDay: false,
    },
    {
      id: generateId(),
      dayOfWeek: 6,
      dayName: 'Domingo',
      exercises: [],
      isCompleted: false,
      isRestDay: true,
    },
  ];
};

const getInitialWorkouts = (): DayWorkout[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Check if it has exercises (not empty template)
    const hasExercises = parsed.some((day: DayWorkout) => day.exercises.length > 0 || day.isRestDay);
    if (hasExercises) {
      return parsed;
    }
  }
  
  return getDefaultWorkouts();
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

  // Count only workout days (not rest days) as completed
  const workoutDays = workouts.filter(d => !d.isRestDay);
  const completedWorkoutDays = workoutDays.filter(d => d.isCompleted).length;
  const totalWorkoutDays = workoutDays.length;
  const progressPercentage = totalWorkoutDays > 0 ? (completedWorkoutDays / totalWorkoutDays) * 100 : 0;

  return {
    workouts,
    toggleDayCompletion,
    toggleRestDay,
    addExercise,
    updateExercise,
    removeExercise,
    resetWeek,
    completedCount: completedWorkoutDays,
    totalWorkoutDays,
    progressPercentage,
  };
};
