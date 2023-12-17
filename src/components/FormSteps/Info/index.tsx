import { Control, Controller, FieldPath, useController } from "react-hook-form";
import Input from "../../Input";
import StepInfo from "../../StepInfo";
import { cn } from "../../../lib/utils";

interface Props {
  control: Control<FormProps, any>;
  step: number;
}
const InfoStep: React.FC<Props> = ({ control, step }) => {
  return (
    <section className={cn("block", { hidden: step != 0 })}>
      <StepInfo
        title="Personal info"
        description="Please provide your name, email address, and phone number."
      />
      <div className="flex flex-col gap-5">
        <Input
          name="name"
          label="Name"
          placeholder="e.g. Stephen King"
          control={control}
          rules={{
            required: { message: "This field is required!", value: true },
          }}
        />
        <Input
          name="email"
          label="Address Email"
          placeholder="e.g. stephenking@lorem.com"
          control={control}
          rules={{
            required: { message: "This field is required!", value: true },
          }}
        />
        <Input
          name="phone"
          label="Phone Number"
          placeholder="e.g. +1 234 567 890"
          control={control}
          rules={{
            required: { message: "This field is required!", value: true },
          }}
        />
      </div>
    </section>
  );
};

export default InfoStep;
