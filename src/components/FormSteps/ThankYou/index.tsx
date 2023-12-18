import thankYouIcon from "../../../assets/icon-thank-you.svg";
import { cn } from "../../../lib/utils";
import StepInfo from "../../StepInfo";
const ThankYouStep: React.FC = () => {
  return (
    <section
      className={cn(
        "flex flex-col items-center justify-center  md:h-[500px]",
        {}
      )}
    >
      <img src={thankYouIcon} alt="thank you" className="mb-10" />
      <StepInfo
        center
        title="Thank you!"
        description="Thanks for confiring your subscription! We hope you have fun using our platform. If you ever need support, please feel to email us at support@loremgaming.com"
      />
    </section>
  );
};

export default ThankYouStep;
