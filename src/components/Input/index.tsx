import classNames from "classnames";
import {
  FieldError,
  FieldPath,
  UseControllerProps,
  useController,
} from "react-hook-form";

const Input: React.FC<
  UseControllerProps<FormProps> & { placeholder: string; label: string }
> = ({ placeholder, label, ...props }) => {
  const { field, fieldState } = useController(props);

  return (
    <div className="flex flex-col gap-2">
      <Label forHTML={field.name} text={label} error={fieldState.error} />
      <input
        onChange={field.onChange}
        value={field.value as any}
        onBlur={field.onBlur}
        name={field.name}
        placeholder={placeholder}
        id={field.name}
        className={classNames("border p-3 rounded-lg  focus:outline-none", {
          "border-strawberry-red focus:border-strawberry-red":
            fieldState.invalid,
          "focus:border-black": !fieldState.invalid,
        })}
      />
    </div>
  );
};

const Label: React.FC<{
  forHTML: FieldPath<FormProps>;
  text: string;
  error: FieldError | undefined;
}> = ({ forHTML, text, error }) => {
  return (
    <label htmlFor={forHTML} className="text-marine-blue font-medium flex">
      {text}
      {error && (
        <span className="ml-auto text-strawberry-red">{error.message}</span>
      )}
    </label>
  );
};

export default Input;
