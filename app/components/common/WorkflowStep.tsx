import { Success } from "@public/icons";

interface WorkflowStepProps {
  name: string;
  duration: string;
  icon?: React.ReactNode;
}

export function WorkflowStep({ name, duration, icon }: WorkflowStepProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white px-4 py-3 text-sm text-(--color-text) shadow-sm gap-2">
      <div className="flex items-center gap-2">
        {icon || <div className="w-4 h-4 rounded bg-gray-200" />}
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>{duration}</span>
        <Success />
      </div>
    </div>
  );
}
