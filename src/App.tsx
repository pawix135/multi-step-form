import { FormProvider, useForm } from "react-hook-form";
import Sidebar from "./components/Sidebar";
import InfoStep from "./components/FormSteps/Info";
import { useEffect, useState, useTransition } from "react";
import SelectPlanStep from "./components/FormSteps/Plan";
import { cn } from "./lib/utils";
import AddOnsStep from "./components/FormSteps/AddOns";
import SummaryStep from "./components/FormSteps/Summary";
import ThankYouStep from "./components/FormSteps/ThankYou";

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

let defaultFormValues: FormProps = {
  plan: { billing: false, price: 9, type: "arcade" },
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
  const [showThankYou, setShowThankYou] = useState<boolean>(false);

  const submit = (values: FormProps) => {
    console.log(values);
    startTransition(() => {
      setShowThankYou(true);
    });
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
    <main className="grid md:place-items-center md:h-screen h-full ">
      <div className="grid md:grid-flow-col md:grid-cols-4 md:grid-rows-1 rounded-lg md:p-5 gap-2 md:bg-white max-w-[1200px]">
        <Sidebar currentStep={step} />
        <div className="md:col-span-3 md:py-10 md:px-16 -mt-[100px] bg-white mx-5 py-10 px-5 rounded-lg md:mx-0 md:-mt-0 shadow-lg md:shadow-none">
          {!showThankYou && (
            <FormProvider {...methods}>
              <form className={cn({ "md:h-[400px]": step < 4 })}>
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
          )}
          {showThankYou && <ThankYouStep />}
          {!showThankYou && (
            <div className="md:flex flex-row mt-[100px] hidden">
              {step > 0 && step < 4 && (
                <button
                  onClick={handleBack}
                  type="button"
                  className="text-cool-gray font-semibold hover:text-marine-blue"
                >
                  Go Back
                </button>
              )}
              {step >= 0 && step < 3 && (
                <button
                  className={cn(
                    "ml-auto bg-marine-blue text-white py-3 px-6 rounded-lg hover:bg-marine-blue/90",
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
                  className="ml-auto bg-purplish-blue text-white py-3 px-6 rounded-lg hover:bg-purplish-blue/90"
                  onClick={methods.handleSubmit(submit)}
                >
                  Confirm
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {!showThankYou && (
        <div className="flex flex-row absolute left-0 bottom-0 bg-white py-5 w-full px-5 md:hidden">
          {step > 0 && step < 4 && (
            <button
              onClick={handleBack}
              type="button"
              className="text-cool-gray font-semibold hover:text-marine-blue"
            >
              Go Back
            </button>
          )}
          {step >= 0 && step < 3 && (
            <button
              className={cn(
                "ml-auto bg-marine-blue text-white py-3 px-6 rounded-lg hover:bg-marine-blue/90",
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
              className="ml-auto bg-purplish-blue text-white py-3 px-6 rounded-lg hover:bg-purplish-blue/90"
              onClick={methods.handleSubmit(submit)}
            >
              Confirm
            </button>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
