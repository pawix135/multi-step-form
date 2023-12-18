import { Control, useController } from "react-hook-form";
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

const plans: { img: string; billing: boolean; price: number; type: string }[] =
  [
    { billing: false, price: 9, type: "arcade", img: iconArcade },
    { billing: false, price: 12, type: "advanced", img: iconAdvanced },
    { billing: false, price: 15, type: "pro", img: iconPro },
  ];

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
      <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-flow-row md:grid-cols-3 md:grid-rows-1 gap-5 md:gap-10">
        {plans.map((p, i) => {
          return (
            <button
              key={`plan-${i}`}
              className={cn(
                "flex items-center md:items-start gap-5 md:gap-0 md:flex-col border-2 hover:border-purplish-blue/50 hover:border-2 hover:bg-purplish-blue/10-gray p-5 rounded-xl max-h-[100px] md:max-h-none",
                {
                  "bg-purplish-blue/10 border-purplish-blue/50":
                    plan.value.type == p.type,
                }
              )}
              type="button"
              onClick={() => changePlan(p.type as any, p.price)}
            >
              <img src={p.img} alt="" />
              <div className="flex flex-col">
                <h3 className="md:mt-16 font-bold capitalize text-left">
                  {p.type}
                </h3>
                <span className="text-cool-gray text-left">
                  {plan.value.billing === false
                    ? `$${p.price}/mo`
                    : `$${p.price * 10}/yr`}
                </span>
                {plan.value.billing && (
                  <span className="text-marine-blue">2 months free</span>
                )}
              </div>
            </button>
          );
        })}
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
