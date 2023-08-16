import { SubmitHandler } from "react-hook-form";
import { IUpdateFormData } from "../../types";
import { useUpdateUserMutation } from "../../store";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import DynamicForm from "../form";
import { inputsProperties } from "./mock";

export default function UserProfile() {
  const navigate = useNavigate();

  const [updateUser, { isLoading, isError, isSuccess }] =
    useUpdateUserMutation();

  const token = localStorage.getItem("token") as string;

  const onSubmit: SubmitHandler<IUpdateFormData> = async (formData) => {
    const userNewData = {
      user: formData?.user,
      email: formData?.email,
      image: formData?.image,
    };
    await updateUser({ formData: userNewData, token: token });
  };

  if (isSuccess) {
    navigate("/");
    navigate(0);
  }

  return (
    <DynamicForm
      inputsProperties={inputsProperties}
      onSubmit={onSubmit}
      formHeader="Edit Profile"
      loader={isLoading}
      loaderElement={<Spin size="large" />}
      error={isError}
      submitErrorText="Error updating profile"
      submitButtonText="Save"
      formStyle="user"
    />
  );
}
