import { Control, useFieldArray } from "react-hook-form";
import { cn } from "../../../lib/utils";
import StepInfo from "../../StepInfo";

interface Props {
  control: Control<FormProps, any>;
  step: number;
  billing: boolean;
}

const addonDescription = {
  "Online service": "Access to multiplayer games",
  "Larger storage": "Extra 1TB of cloud save",
  "Customizable profile": "Access to multiplayer games",
} as const;

const AddOnsStep: React.FC<Props> = ({ control, step, billing }) => {
  let { update, fields } = useFieldArray({ control, name: "addons" });

  return (
    <section className={cn("block", { hidden: step != 2 })}>
      <StepInfo
        title="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />
      <div className="flex flex-col gap-5">
        {fields.map((addon, index) => {
          return (
            <div
              key={`addon-${index}`}
              className={cn(
                "flex flex-row gap-5 items-center border-2 p-5 rounded-lg",
                {
                  "border-purplish-blue bg-purplish-blue/5": addon.selected,
                }
              )}
            >
              <input
                type="checkbox"
                checked={fields[index].selected}
                onChange={(e) => {
                  update(index, { ...addon, selected: e.target.checked });
                }}
              />
              <div>
                <h3 className="font-bold">{addon.type}</h3>
                <span>
                  {
                    addonDescription[
                      addon.type as keyof typeof addonDescription
                    ]
                  }
                </span>
              </div>
              <span className="ml-auto font-semibold text-purplish-blue/80">
                +${billing ? addon.price * 10 : addon.price}
                {billing ? "/yr" : "/mo"}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AddOnsStep;
