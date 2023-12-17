interface Props {
  title: string;
  description: string;
}

const StepInfo: React.FC<Props> = ({ description, title }) => {
  return (
    <div className="mb-10 flex flex-col gap-2">
      <h1 className="font-bold text-3xl text-marine-blue">{title}</h1>
      <p className="font-normal text-cool-gray">{description}</p>
    </div>
  );
};

export default StepInfo;
