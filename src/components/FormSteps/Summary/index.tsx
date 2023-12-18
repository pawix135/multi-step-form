import { useFormContext } from "react-hook-form";
import StepInfo from "../../StepInfo";
import { cn } from "../../../lib/utils";
import { useMemo } from "react";

interface Props {
  step: number;
  goBackToPlan: () => void;
}
const SummaryStep: React.FC<Props> = ({ step, goBackToPlan }) => {
  let { getValues } = useFormContext<FormProps>();

  let values = getValues();

  let calculateTotal = useMemo((): number => {
    let addonsTotal = values.addons
      .filter((addon) => addon.selected)
      .reduce((prev, curr) => prev + curr.price, 0);
    if (values.plan.billing) {
      addonsTotal *= 10;
    }

    let planTotal = values.plan.price;
    return addonsTotal + planTotal;
  }, [values.addons, values.plan.billing]);

  let slugPlanType = useMemo(() => {
    return values.plan.billing ? "yr" : "mo";
  }, [values.plan.billing]);

  return (
    <section className={cn("block", { hidden: step != 3 })}>
      <StepInfo
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className="bg-magnolia p-5 flex flex-col gap-5 rounded-lg">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="capitalize font-bold text-marine-blue">
              {values.plan.type} ({values.plan.billing ? "Yearly" : "Monthly"})
            </h3>
            <button
              type="button"
              className="underline font-normal text-cool-gray hover:text-purplish-blue"
              onClick={goBackToPlan}
            >
              Change
            </button>
          </div>
          <span className="text-marine-blue font-bold">
            ${values.plan.price}/{slugPlanType}
          </span>
        </div>
        <hr />
        <div className="flex flex-col gap-3">
          {values.addons
            .filter((addon) => addon.selected)
            .map((addon, index) => {
              let calcPrice = values.plan.billing
                ? addon.price * 10
                : addon.price;
              return (
                <div
                  key={`addon-total-${index}`}
                  className="flex flex-row justify-between"
                >
                  <span className="text-cool-gray/50 font-semibold">
                    {addon.type}
                  </span>
                  <span className="font-semibold text-marine-blue/70">
                    +{calcPrice}/${slugPlanType}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
      <p className="flex flex-row justify-between font-semibold mt-5 text-cool-gray/50 pl-5">
        Total (per {values.plan.billing ? "year" : "month"})
        <span className="font-bold text-xl text-purplish-blue">
          +{calculateTotal}/{slugPlanType}
        </span>
      </p>
    </section>
  );
};

export default SummaryStep;
