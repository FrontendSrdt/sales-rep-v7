import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
interface PasswordFormType {
  fields: any;
  initialValues: any;
  validationSchema: any;
  onSubmit: (e: any) => void;
}

export const PasswordForm: React.FC<PasswordFormType> = ({ fields, initialValues, validationSchema, onSubmit }) => {
  return (
    <div className="w-full mt-5 md:mt-3">
      <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-2 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black  text-center">UPDATE PASSWORD</h3>
        </div>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {() => (
            <Form className="w-full flex flex-col gap-3 px-4 py-3">
              {/* Map over fields to render password and confirmPassword */}
              {fields.map((field: any) => (
                <div key={field.name} className="w-full flex flex-col gap-1">
                  <label htmlFor={field.name} className="text-gray-600 font-medium mb-0.5 text-sm">
                    {field.labelName}
                  </label>
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    placeholder={field.labelName}
                    className="border rounded-md p-2 focus:outline-none focus:ring-1 bg-gray-50 focus:ring-blue-600"
                  />
                  <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm mt-2" />
                </div>
              ))}

              {/* Submit Button */}
              <div className="w-full">
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                  Update Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
