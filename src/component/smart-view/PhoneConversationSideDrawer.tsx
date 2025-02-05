// import React, { useRef } from "react";
// import { Formik, Form, Field } from "formik";
// import { FaTimes } from "react-icons/fa";
// import * as Yup from "yup";
// import { PhoneConversationFormData } from "../../data/smart-view/phone-conversation/PhoneConversationData";
// import { formatDate, formatTime } from "../../util/custom/smartView/FormatDate";
// import store, { RootState } from "../../store";
// import { uiSliceAction } from "../../store/ui/ui-slice";
// import { useSelector } from "react-redux";
// import useClickOutside from "../../hooks/useClickOutside";

// // Define the data structure for selectedData
// interface PhoneConversationData {
//   activityType: string;
//   leadName: string;
//   notes: string;
//   outcomes: string;
//   nextFollowUp: string;
//   owner: string;
//   activityDateTime: string;
// }

// interface EditSideDrawerProps {
//   selectedData: PhoneConversationData;
// }
// type PhoneConversationFormValues = {
//   activityType: string;
//   leadName: string;
//   notes: string;
//   outcomes: string;
//   nextFollowUp: string;
//   owner: string;
//   activityDateTime: string;
//   activityDate: string;
//   activityTime: string;
//   [key: string]: any;
// };
// const EditSchema = Yup.object().shape({
//   leadName: Yup.string().required("Lead name is required"),
//   notes: Yup.string().required("Notes are required"),
//   activityDate: Yup.date().required("Activity date is required"),
// });

// const SideDrawerForPhoneConversation: React.FC<EditSideDrawerProps> = ({ selectedData }) => {
//   console.log("SelectedData ---", selectedData);
//   const initialValuesForPhoneConversationEdit = {
//     activityType: "", // or set a default
//     leadName: selectedData.leadName,
//     notes: selectedData.notes,
//     outcomes: "", // or set a default
//     nextFollowUp: "", // or set a default
//     owner: selectedData.owner, // or set a default
//     activityDateTime: selectedData.activityDateTime,
//     activityDate: formatDate(selectedData.activityDateTime.split(" ")[0]), // Get only the date
//     activityTime: formatTime(selectedData.activityDateTime.split(" ")[1]), // Get only the time
//   };
//   const refClose = useRef<HTMLDivElement | null>(null);
//   const { isDrawerOpen } = useSelector((state: RootState) => state.ui);
//   // console.log("Initial values :::", initialValuesForPhoneConversationEdit);
//   const handleSubmit = (values: any) => {
//     console.log("Form Submitted: ", values);
//     store.dispatch(uiSliceAction.onDrawrCloseHandler());
//   };

//   const onCLoseHandlerFun = () => {
//     store.dispatch(uiSliceAction.onDrawrCloseHandler());
//   };
//   useClickOutside([refClose], [onCLoseHandlerFun]);
//   return (
//     <>
//       {isDrawerOpen && <div className="overlay bg-black bg-opacity-55  fixed top-0 left-0 w-full h-screen z-50"></div>}
//       <div
//         ref={refClose}
//         className={`w-full ${
//           isDrawerOpen ? "translate-x-0" : "translate-x-full"
//         }  tansition-all duration-1000  md:max-w-[500px] lg:max-w-[700px] border-2 bg-white shadow-md fixed top-0 left-auto right-0 min-h-screen z-50`}
//       >
//         <div className="bg-stone-100 py-5 px-5 ">
//           <div className="flex relative ">
//             <h2 className="text-lg font-bold">Edit </h2>
//             {isDrawerOpen && (
//               <div className="absolute left-[-4rem] cursor-pointer bg-[#272727] text-white rounded-[50%]  p-1">
//                 <FaTimes className=" " onClick={() => store.dispatch(uiSliceAction.onDrawrCloseHandler())} />
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="p-5   overflow-y-auto">
//           <Formik<PhoneConversationFormValues> initialValues={initialValuesForPhoneConversationEdit} validationSchema={EditSchema} onSubmit={handleSubmit}>
//             {({ values, errors, touched }) => (
//               <Form className="flex flex-wrap">
//                 {PhoneConversationFormData.map((field, index) => {
//                   return (
//                     <div key={index} className={`mb-4 ${index < 3 ? "w-full" : "w-full md:w-1/2"}`}>
//                       <div>
//                         {field.type === "select" ? (
//                           <div>
//                             <label className="block text-sm font-medium mb-2">{field.label}</label>
//                             <Field as="select" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded">
//                               {field.options?.map((option, idx) => (
//                                 <option key={idx} value={option.name}>
//                                   {option.label}
//                                 </option>
//                               ))}
//                             </Field>
//                           </div>
//                         ) : field.type === "textarea" ? (
//                           <div>
//                             <label className="block text-sm font-medium mb-2">{field.label}</label>
//                             <Field as="textarea" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded" />
//                           </div>
//                         ) : field.type === "dateTime" ? (
//                           <div className="ml-3">
//                             <label className="block text-sm font-medium mb-2">{field.label}</label>

//                             <div className="flex">
//                               {field.splits?.map((data, index) => {
//                                 return (
//                                   <div key={index}>
//                                     <Field
//                                       type={data.type}
//                                       name={data.name as keyof PhoneConversationFormValues}
//                                       className="border border-gray-300 p-2 w-full rounded"
//                                       value={values[data.name] || ""}
//                                     />
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </div>
//                         ) : null}
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded ">
//                   Save Changes
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SideDrawerForPhoneConversation;

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { PhoneConversationFormData } from "../../data/smart-view/phone-conversation/PhoneConversationData";
import { formatDate, formatTime } from "../../util/custom/smartView/FormatDate";
import store from "../../store";
import { uiSliceAction } from "../../store/ui/ui-slice";

// Define the data structure for selectedData
interface PhoneConversationData {
  activityType: string;
  leadName: string;
  notes: string;
  outcomes: string;
  nextFollowUp: string;
  owner: string;
  activityDateTime: string;
}

interface EditSideDrawerProps {
  selectedData: PhoneConversationData;
}
type PhoneConversationFormValues = {
  activityType: string;
  leadName: string;
  notes: string;
  outcomes: string;
  nextFollowUp: string;
  owner: string;
  activityDateTime: string;
  activityDate: string;
  activityTime: string;
  [key: string]: any;
};
const EditSchema = Yup.object().shape({
  leadName: Yup.string().required("Lead name is required"),
  notes: Yup.string().required("Notes are required"),
  activityDate: Yup.date().required("Activity date is required"),
});

const SideDrawerForPhoneConversation: React.FC<EditSideDrawerProps> = ({ selectedData }) => {
  const initialValuesForPhoneConversationEdit = {
    activityType: "", // or set a default
    leadName: selectedData.leadName,
    notes: selectedData.notes,
    outcomes: "", // or set a default
    nextFollowUp: "", // or set a default
    owner: selectedData.owner, // or set a default
    activityDateTime: selectedData.activityDateTime,
    activityDate: formatDate(selectedData.activityDateTime.split(" ")[0]), // Get only the date
    activityTime: formatTime(selectedData.activityDateTime.split(" ")[1]), // Get only the time
  };
  const handleSubmit = () => {
    store.dispatch(uiSliceAction.onDrawrCloseHandler());
  };

  return (
    <>
      <div className="p-5   overflow-y-auto">
        <Formik<PhoneConversationFormValues> initialValues={initialValuesForPhoneConversationEdit} validationSchema={EditSchema} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form className="flex flex-wrap">
              {PhoneConversationFormData.map((field, index) => {
                return (
                  <div key={index} className={`mb-4 ${index < 3 ? "w-full" : "w-full md:w-1/2"}`}>
                    <div>
                      {field.type === "select" ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">{field.label}</label>
                          <Field as="select" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded">
                            {field.options?.map((option, idx) => (
                              <option key={idx} value={option.name}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                        </div>
                      ) : field.type === "textarea" ? (
                        <div>
                          <label className="block text-sm font-medium mb-2">{field.label}</label>
                          <Field as="textarea" name={field.name as keyof PhoneConversationFormValues} className="w-full border border-gray-300 p-2 rounded" />
                        </div>
                      ) : field.type === "dateTime" ? (
                        <div className="ml-3">
                          <label className="block text-sm font-medium mb-2">{field.label}</label>

                          <div className="flex">
                            {field.splits?.map((data, index) => {
                              return (
                                <div key={index}>
                                  <Field
                                    type={data.type}
                                    name={data.name as keyof PhoneConversationFormValues}
                                    className="border border-gray-300 p-2 w-full rounded"
                                    value={values[data.name] || ""}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
              <button type="submit" className="bg-blue-500 text-white p-2 rounded ">
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default SideDrawerForPhoneConversation;
