import classNames from "classnames";

const steps = ["YOUR INFO", "SELECT PLAN", "ADD-ONS", "SUMMARY"];

interface Props {
  currentStep: number;
}
const Sidebar: React.FC<Props> = ({ currentStep }) => {
  return (
    <div className="col-span-1 bg-sidebar-mobile md:bg-sidebar-desktop bg-no-repeat bg-cover px-5 py-10 rounded-lg">
      <div className="grid grid-flow-col grid-cols-1 grid-rows-4 gap-5">
        {steps.map((step, index) => {
          let stepNumber = index + 1;
          return (
            <div
              key={`step-${index}`}
              className="flex flex-row gap-5 items-center"
            >
              <span
                className={classNames(
                  "flex items-center justify-center rounded-full font-bold w-[30px] h-[30px]",
                  {
                    "border-2 border-white text-white": currentStep !== index,
                    "bg-pastel-blue text-marine-blue": currentStep === index,
                  }
                )}
              >
                {stepNumber}
              </span>
              <div className="flex flex-col gap-1 text-white">
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
