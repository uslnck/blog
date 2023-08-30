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
  id: string;
  type: string;
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
  inputStyle: string;
}

export interface ITagsProps {
  register?: boolean | UseFormRegister<FieldValues>;
  rhfName?: string;
  id: string;
  type: string;
  autoComplete?: string;
  defaultValues?: { id: number; value: string }[];
  rhfRequiredMessage?: string;
  rhfPatternValue?: RegExp;
  rhfPatternMessage?: string;
  errors?: FieldErrors<FieldValues>;
  validateWith?: string;
  tagsHandler?: (tags: { id: number; value: string }[]) => void;
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
  tagsHandler?: (tags: { id: number; value: string }[]) => void;
}

export interface IBorderedButtonProps {
  onClick?: () => void;
  text: string;
  lineHeight?: string;
  color: string;
  borderColor?: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  position?: string;
  fontSize?: string;
  width?: string;
  linkTo?: string;
  linkState?: object;
}

export interface IArticleListProps {
  articles: IArticleProps[];
  isFetching: boolean;
}

export interface ILikeProps {
  handleLike: () => Promise<void>;
  likeLoading: boolean;
  unlikeLoading: boolean;
  articleFavorited: boolean;
  articleFavoritesCount: number;
}

export interface IArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
  id: number;
}

export interface IArticleOutletProps {
  articles: IArticleProps[];
}
