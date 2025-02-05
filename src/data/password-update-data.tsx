// password form
import * as Yup from "yup";
export const PasswordInputFields = [
  {
    id: 1,
    type: "password",
    labelName: "Current Password",
    name: "currentPassword",
  },
  {
    id: 2,
    type: "password",
    labelName: "New Password",
    name: "newPassword",
  },
  {
    id: 3,
    type: "password",
    labelName: "Confirm Password",
    name: "confirmPassword",
  },
];

export const passwordInitialValue = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const passwordValidation = Yup.object({
  currentPassword: Yup.string().required("Current Password is required"),

  newPassword: Yup.string().required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
