import classNames from "classnames";

const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

interface Props {
  currentStep: number;
}
const Sidebar: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="md:col-span-1 bg-sidebar-mobile md:bg-sidebar-desktop bg-no-repeat bg-cover md:px-5 md:py-10 md:rounded-lg md:w-[250px] md:h-auto h-[200px]">
      <div className="flex flex-row justify-center mt-5 md:grid md:grid-flow-col md:grid-cols-1 md:grid-rows-4 gap-5 md:mt-0">
        {steps.map((step, index) => {
          let stepNumber = index + 1;
          return (
            <div
              key={`step-${index}`}
              className="flex flex-row gap-5 items-center"
            >
              <span
                className={classNames(
                  "flex items-center justify-center rounded-full font-bold md:w-[30px] md:h-[30px] w-[50px] h-[50px]",
                  {
                    "border-2 border-white text-white": currentStep !== index,
                    "bg-pastel-blue text-marine-blue": currentStep === index,
                  }
                )}
              >
                {stepNumber}
              </span>
              <div className="hidden md:flex flex-col gap-1 text-white">
                <span>STEP {stepNumber}</span>
                <span className="font-bold">{step}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
