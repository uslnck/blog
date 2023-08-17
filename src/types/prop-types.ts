import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
} from "react-hook-form";

export interface IInputsProps {
  labelContent: string;
  register?: boolean | UseFormRegister<FieldValues>;
  rhfName?: string;
  id?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  rhfRequiredMessage?: string;
  rhfMinLengthValue?: number;
  rhfMinLengthMessage?: string;
  rhfMaxLengthValue?: number;
  rhfMaxLengthMessage?: string;
  rhfPatternValue?: RegExp;
  rhfPatternMessage?: string;
  errors?: FieldErrors<FieldValues>;
  validateWith?: string;
  inputStyle?: string;
}

export interface ITagsProps {
  register?: boolean | UseFormRegister<FieldValues>;
  rhfName?: string;
  id?: string;
  type?: string;
  autoComplete?: string;
  defaultValue?: string;
  rhfPatternValue?: RegExp;
  rhfPatternMessage?: string;
  errors?: FieldErrors<FieldValues>;
  validateWith?: string;
  inputStyle?: string;
  tagsHandler?: (tags: { id: number }[]) => void;
}

export interface DynamicFormProps {
  formHeader: string;
  inputsProperties: IInputsProps[];
  onSubmit: SubmitHandler<FieldValues>;
  loader: boolean;
  loaderElement: React.ReactNode;
  error: boolean;
  submitErrorText: string;
  submitButtonText: string;
  formStyle: string;
  tagsProperties?: ITagsProps[];
  tagsHandler?: (tags: { id: number }[]) => void;
}
