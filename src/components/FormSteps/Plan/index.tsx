import { Control, UseControllerProps, useController } from "react-hook-form";
import StepInfo from "../../StepInfo";
import { Switch } from "../../Switch";
import iconArcade from "../../../assets/icon-arcade.svg";
import iconAdvanced from "../../../assets/icon-advanced.svg";
import iconPro from "../../../assets/icon-pro.svg";
import { cn } from "../../../lib/utils";

interface Props {
  control: Control<FormProps, any>;
  step: number;
}

const prices = {
  arcade: 9,
  advanced: 12,
  pro: 15,
};

const SelectPlanStep: React.FC<Props> = ({ control, step }) => {
  let { field: plan } = useController<FormProps, "plan">({
    control,
    name: "plan",
  });

  const changePlan = (type: "arcade" | "pro" | "advanced", price: number) => {
    plan.onChange({
      ...plan.value,
      type,
      price: plan.value.billing ? price * 10 : price,
    });
  };

  return (
    <section className={cn("block", { hidden: step != 1 })}>
      <StepInfo
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <div className="grid grid-flow-row grid-cols-3 grid-rows-1 gap-10">
        <button
          className={cn(
            "flex flex-col border-2 hover:border-purplish-blue/50 hover:border-2 hover:bg-purplish-blue/10-gray p-5 rounded-xl",
            {
              "bg-purplish-blue/10 border-purplish-blue/50":
                plan.value.type == "arcade",
            }
          )}
          type="button"
          onClick={() => changePlan("arcade", 9)}
        >
          <img src={iconArcade} alt="" />
          <h3 className="mt-16 font-bold text-">Arcade</h3>
          <span className="text-cool-gray">
            {plan.value.billing === false
              ? `$${prices["arcade"]}/mo`
              : `$${prices["arcade"] * 10}/yr`}
          </span>
        </button>
        <button
          className={cn(
            "flex flex-col border-2 hover:border-purplish-blue/50 hover:border-2 hover:bg-purplish-blue/10 p-5 rounded-xl",
            {
              "bg-purplish-blue/10 border-purplish-blue/50":
                plan.value.type == "advanced",
            }
          )}
          type="button"
          onClick={() => changePlan("advanced", 12)}
        >
          <img src={iconAdvanced} alt="" />
          <h3 className="mt-16 font-bold text-">Advanced</h3>
          <span className="text-cool-gray">
            {plan.value.billing === false
              ? `$${prices["advanced"]}/mo`
              : `$${prices["advanced"] * 10}/yr`}
          </span>
        </button>
        <button
          className={cn(
            "flex flex-col border-2 hover:border-purplish-blue/50 hover:border-2 hover:bg-purplish-blue/10 p-5 rounded-xl",
            {
              "bg-purplish-blue/10 border-purplish-blue/50":
                plan.value.type == "pro",
            }
          )}
          type="button"
          onClick={() => changePlan("pro", prices["pro"])}
        >
          <img src={iconPro} alt="" />
          <h3 className="mt-16 font-bold text-">Pro</h3>
          <span className="text-cool-gray">
            {plan.value.billing === false
              ? `$${prices["pro"]}/mo`
              : `$${prices["pro"] * 10}/yr`}
          </span>
        </button>
      </div>
      <div className="flex flex-row gap-5 items-center bg-magnolia justify-center py-4 mt-10">
        <span
          className={cn({
            "font-bold text-purplish-blue": !plan.value.billing,
            "text-cool-gray": plan.value.billing,
          })}
        >
          Monthly
        </span>
        <Switch
          checked={plan.value.billing}
          onCheckedChange={(value) => {
            plan.onChange({
              ...plan.value,
              billing: value,
              price: value
                ? prices[plan.value.type as keyof typeof prices] * 10
                : prices[plan.value.type as keyof typeof prices],
            });
          }}
        />
        <span
          className={cn({
            "font-bold  text-purplish-blue": plan.value.billing,
            "text-cool-gray": !plan.value.billing,
          })}
        >
          Yearly
        </span>
      </div>
    </section>
  );
};

export default SelectPlanStep;
