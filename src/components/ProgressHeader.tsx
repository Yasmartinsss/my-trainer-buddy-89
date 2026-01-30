import { Dumbbell, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProgressHeaderProps {
  completedCount: number;
  progressPercentage: number;
  onReset: () => void;
}

export const ProgressHeader = ({ completedCount, progressPercentage, onReset }: ProgressHeaderProps) => {
  return (
    <div className="fade-in">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl gradient-success glow-success">
            <Dumbbell className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Meu Treino</h1>
            <p className="text-muted-foreground text-sm">Semana atual</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onReset}
          className="text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>

      <div className="bg-card rounded-xl p-4 mb-6 border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Progresso da semana</span>
          <span className="text-sm font-bold text-primary">{completedCount}/7 dias</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {completedCount === 7 && (
          <p className="text-primary text-sm font-medium mt-3 text-center">
            🎉 Semana completa! Parabéns!
          </p>
        )}
      </div>
    </div>
  );
};
