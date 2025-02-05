import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../../store";
import { packageDealByLeadCaptureId } from "../../../../../store/package-deal/get-package-deal-by-programId-leadCaptureId-slice";

const ReCalculateInput: React.FC = () => {
  const { leadAdditionalDetailsDataById } = useSelector((state: RootState) => state.getLeadAdditionalDetailsDataById);
  console.log(leadAdditionalDetailsDataById.academicProgramId);
  const initialValues = {
    reCalculatedFee: "",
  };

  const validationSchema = Yup.object({
    reCalculatedFee: Yup.string().required("Fee is required"),
  });

  const { leadCaptureId } = useParams();
  console.log(leadCaptureId);

  const handleSubmit = (values: any) => {
    const payload = {
      programId: leadAdditionalDetailsDataById.academicProgramId,
      leadCaptureId: leadCaptureId,
      feeAmount: values.reCalculatedFee,
    };

    store.dispatch(packageDealByLeadCaptureId(payload));
  };

  return (
    <div className="p-4 max-w-md mx-auto border rounded-md shadow-md">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="mb-4">
            <label htmlFor="reCalculatedFee" className="block text-sm font-medium text-gray-700">
              Package Deal Offer
            </label>
            <Field
              type="text"
              name="reCalculatedFee"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <ErrorMessage name="reCalculatedFee" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Calculate Fees
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReCalculateInput;
