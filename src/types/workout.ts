export interface Exercise {
  id: string;
  name: string;
  sets?: string;
  reps?: string;
  notes?: string;
}

export interface DayWorkout {
  id: string;
  dayOfWeek: number;
  dayName: string;
  exercises: Exercise[];
  isCompleted: boolean;
  isRestDay: boolean;
}

export const DAYS_OF_WEEK = [
  { id: 0, name: 'Segunda', short: 'SEG' },
  { id: 1, name: 'Terça', short: 'TER' },
  { id: 2, name: 'Quarta', short: 'QUA' },
  { id: 3, name: 'Quinta', short: 'QUI' },
  { id: 4, name: 'Sexta', short: 'SEX' },
  { id: 5, name: 'Sábado', short: 'SAB' },
  { id: 6, name: 'Domingo', short: 'DOM' },
];
