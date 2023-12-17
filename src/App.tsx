import { FormProvider, useForm } from "react-hook-form";
import Sidebar from "./components/Sidebar";
import InfoStep from "./components/FormSteps/Info";
import { useEffect, useState, useTransition } from "react";
import SelectPlanStep from "./components/FormSteps/Plan";
import { cn } from "./lib/utils";
import AddOnsStep from "./components/FormSteps/AddOns";
import SummaryStep from "./components/FormSteps/Summary";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

let defaultFormValues: FormProps = {
  plan: { billing: false, price: 19, type: "arcade" },
  addons: [
    { price: 1, type: "Online service", selected: false },
    { price: 2, type: "Larger storage", selected: false },
    { price: 2, type: "Customizable profile", selected: false },
  ],
  email: "",
  name: "",
  phone: "",
};

function App() {
  let methods = useForm<FormProps>({
    mode: "onChange",
    defaultValues: defaultFormValues,
  });
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<number>(0);
  const submit = (values: FormProps) => {
    console.log(values);
  };

  const handleStep = async () => {
    let checkErrors = await methods.trigger();

    if (!checkErrors) {
      console.log(methods.formState.errors);
      return;
    }
    startTransition(() => {
      setStep(clamp(step + 1, 0, 3));
    });
  };

  const handleBack = () => {
    startTransition(() => {
      setStep(clamp(step - 1, 0, 3));
    });
  };

  const goBackToPlan = () => {
    startTransition(() => {
      setStep(1);
    });
  };

  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  return (
    <main className="grid place-items-center h-screen bg-light-blue">
      <div className="grid grid-flow-col grid-cols-4 grid-rows-1 w-[1200px] bg-white rounded-lg p-5">
        <Sidebar currentStep={step} />
        <div className="col-span-3 py-10 px-16">
          <FormProvider {...methods}>
            <form className="h-[400px]">
              <InfoStep control={methods.control} step={step} />
              <SelectPlanStep control={methods.control} step={step} />
              <AddOnsStep
                control={methods.control}
                step={step}
                billing={methods.getValues().plan.billing}
              />
              <SummaryStep step={step} goBackToPlan={goBackToPlan} />
            </form>
          </FormProvider>
          <div className="flex flex-row mt-[100px]">
            {step > 0 && (
              <button
                onClick={handleBack}
                type="button"
                className="text-light-gray font-semibold"
              >
                Go Back
              </button>
            )}
            {step >= 0 && step < 3 && (
              <button
                className={cn(
                  "ml-auto bg-marine-blue text-white py-3 px-6 rounded-lg ",
                  {
                    "opacity-50 cursor-not-allowed":
                      Object.values(methods.formState.errors).length > 0,
                  }
                )}
                disabled={Object.values(methods.formState.errors).length > 0}
                onClick={handleStep}
              >
                Next step
              </button>
            )}
            {step === 3 && (
              <button
                className="ml-auto"
                onClick={methods.handleSubmit(submit)}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
