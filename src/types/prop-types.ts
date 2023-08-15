import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

export interface IInputProps {
  labelContent: string;
  register?: boolean | UseFormRegister<FieldValues>;
  rhfName?: string;
  id?: string;
  type?: string;
  autoComplete?: string;
  rhfRequiredMessage?: string;
  rhfMinLengthValue?: number;
  rhfMinLengthMessage?: string;
  rhfMaxLengthValue?: number;
  rhfMaxLengthMessage?: string;
  rhfPatternValue?: RegExp;
  rhfPatternMessage?: string;
  errors?: FieldErrors<FieldValues>;
  validateWith?: string;
}

export interface DynamicFormProps {
  formHeader: string;
  inputsProperties: IInputProps[];
  onSubmit: SubmitHandler<FieldValues>;
  loader: boolean;
  loaderElement: React.ReactNode;
  error: boolean;
  submitErrorText: string;
  submitButtonText: string;
}
