import { cn } from "../../lib/utils";

interface Props {
  title: string;
  description: string;
  center?: boolean;
}

const StepInfo: React.FC<Props> = ({ description, title, center }) => {
  return (
    <div
      className={cn("mb-10 flex flex-col gap-2", {
        "items-center justify-center gap-5": center,
      })}
    >
      <h1 className="font-bold text-3xl text-marine-blue">{title}</h1>
      <p
        className={cn("font-normal text-cool-gray", {
          "text-center text-lg": center,
        })}
      >
        {description}
      </p>
    </div>
  );
};

export default StepInfo;
