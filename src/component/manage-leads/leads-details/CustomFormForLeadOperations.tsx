import Select from "react-select";
import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker } from "antd";
import QuillTextEditor from "../../../util/custom/QuillTextEditor";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { convertTo24HourFormat } from "../../../util/actions/extractDateAndTime";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../store";
import moment from "moment";
import { onGetSelectedOptionForTask, uiSliceAction } from "../../../store/ui/ui-slice";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

interface SelectedOptionType {
  value: string | any;
  label: string;
}

interface Option {
  value: string;
  label: string;
}

interface FormInputType {
  name: string;
  label: string;
  type: string;
  isrequired?: boolean;
  subInputs?: Array<{ name: string; type: string }>;
}

interface FormType {
  validationSchema: any;
  initialValues: Record<string, any>;
  formInputForcreate: FormInputType[];
  selectedOption?: SelectedOptionType;
  organizerOptions?: SelectedOptionType;
  getOptionsForSelect?: (name: string) => Array<SelectedOptionType> | null;
  // onAddLeadTaskHandler: (e: any) => void;
  onAction: any;
  isMode?: string;
}

// type FormValues = {
//   [key: string]: any;
// };

const CustomFormForLeadOperations: React.FC<FormType> = ({ initialValues, validationSchema, formInputForcreate, organizerOptions, getOptionsForSelect, onAction, isMode }) => {
  // console.log("initialValues= ", initialValues);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option | null | any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { responseForTaskType } = useSelector((state: RootState) => state.getTaskType);
  const { getHeaderTabIconsName } = useSelector((state: RootState) => state.ui);
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null); // State to track the last selected date
  // console.log("getHeaderTabIconsName", getHeaderTabIconsName);
  // console.log("initial Values :", initialValues);
  // console.log("file Name:", fileName);
  const disabledDate = (current: any) => {
    const today = dayjs(); // Get today's date
    // Disable any date before today, any previously selected date, and any date before the last selected date
    if (lastSelectedDate) {
      return current.isBefore(dayjs(lastSelectedDate), "day") || current.isSame(dayjs(lastSelectedDate), "day") || current.isBefore(today, "day");
    }
    return current.isBefore(today, "day"); // If no date selected yet, just disable previous dates
  };
  useEffect(() => {
    if (getHeaderTabIconsName === "taskEdit") {
      console.log(initialValues.coreTaskTypeName);
      setSelectedOption({ value: initialValues?.coreTaskTypeId, label: initialValues?.coreTaskTypeName });
      store.dispatch(onGetSelectedOptionForTask({ value: initialValues?.coreTaskTypeId, label: initialValues?.coreTaskTypeName }));
    }
  }, [getHeaderTabIconsName === "taskEdit" ? initialValues : "", getHeaderTabIconsName]);

  useEffect(() => {
    setSelectedOption(null);
  }, [getHeaderTabIconsName]);

  // console.log("getHeaderTabIconsName", getHeaderTabIconsName);
  return (
    <>
      {getHeaderTabIconsName !== "Note" && getHeaderTabIconsName !== "Upload Docs" && getHeaderTabIconsName !== "NotesEdit" && (
        <Select
          options={responseForTaskType || []}
          value={selectedOption || ""}
          onChange={(selected) => {
            setSelectedOption(selected);
            store.dispatch(onGetSelectedOptionForTask(selected));
            setLastSelectedDate(null)
          }

          }

          defaultValue={isMode === "updateTask" ? initialValues.coreTaskTypeId : ""}
          isDisabled={getHeaderTabIconsName === "taskEdit"}
        />
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          if (isButtonDisabled) return; // Prevent submission if already disabled
          setIsButtonDisabled(true); // Disable the button on first click

          try {
            await onAction(values, actions); // Simulate API call
          } catch (error) {
            console.error("Error during submission:", error);
          } finally {
            // Re-enable the button after a delay
            setTimeout(() => setIsButtonDisabled(false), 2000); // Re-enable after 2 seconds
            setFileName(null);
          }
        }}
      >
        {({ values, setFieldValue, resetForm, setErrors }) => {
          useEffect(() => {
            resetForm({ values: initialValues });
            store.dispatch(uiSliceAction.onResetFormikInitialValues(resetForm));
          }, [initialValues, resetForm, setFieldValue]);

          // console.log("values", values);
          dayjs.extend(customParseFormat);

          return (
            <Form>
              {(selectedOption || getHeaderTabIconsName === "Note" || getHeaderTabIconsName === "Upload Docs" || getHeaderTabIconsName === "NotesEdit") &&
                formInputForcreate.map((d, index) => (
                  <div key={index}>
                    {d.type === "select" ? (
                      <div className="mt-2">
                        <label htmlFor={d.name} className="flex font-medium pb-1">
                          {d.label}
                          {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1">*</span> : ""}:
                        </label>
                        <Field name={d.name}>
                          {({ form }: any) => {
                            // Find the selected option based on form value
                            const selectedOption: any = getOptionsForSelect?.(d.name)?.find((option) => option.value === form.values[d.name]);

                            return (
                              <Select
                                options={getOptionsForSelect?.(d.name) || []}
                                value={d.name === "organizer" ? organizerOptions : selectedOption || ""} // Ensure selectedOption is bound to the value
                                onChange={
                                  (selectedOption) => form.setFieldValue(d.name, selectedOption?.value) // Update Formik value when an option is selected
                                }
                                styles={{
                                  control: (base, state) => ({
                                    ...base,
                                    cursor:
                                      d.name === "organizer" ||
                                        d.name === "salesrpDetailsId" ||
                                        d.name === "leadCaptureId" ||
                                        (d.name === "coreDocAttachmentTypeId" && getHeaderTabIconsName === "Note")
                                        ? "not-allowed"
                                        : "pointer",
                                    backgroundColor:
                                      d.name === "organizer" ||
                                        d.name === "salesrpDetailsId" ||
                                        d.name === "leadCaptureId" ||
                                        (d.name === "coreDocAttachmentTypeId" && getHeaderTabIconsName === "Note")
                                        ? "#f9f9f9"
                                        : base.backgroundColor,
                                    borderColor: state.isFocused ? "#4a90e2" : base.borderColor,
                                    "&:hover": { borderColor: state.isFocused ? "#4a90e2" : base.borderColor },
                                  }),
                                  option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "#4a90e2" : state.isFocused ? "#eaf4fe" : "white",
                                    color: state.isSelected ? "white" : "black",
                                    "&:hover": { backgroundColor: "#eaf4fe", color: "black" },
                                  }),
                                }}
                                isDisabled={
                                  d.name === "organizer" ||
                                  d.name === "salesrpDetailsId" ||
                                  d.name === "leadCaptureId" ||
                                  (d.name === "coreDocAttachmentTypeId" && getHeaderTabIconsName === "Note") ||
                                  getHeaderTabIconsName === "NotesEdit"
                                }
                              />
                            );
                          }}
                        </Field>
                        <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                      </div>
                    ) : d.type === "texteditor" ? (
                      <>
                        <Field
                          name={d.name}
                          component={QuillTextEditor}
                          markup={values[d.name] || ""}
                          onChange={(value: any) => {
                            setFieldValue(d.name, value); // Optionally update form value
                          }}
                          maxLimit={80}
                        />

                        <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                      </>
                    ) : d.type === "file" ? (
                      <div>
                        <label className="cursor-pointer w-full  border border-gray-300 py-2 mt-5 flex justify-center items-center text-blue-500 font-medium  " htmlFor={d.name}>
                          Add Attachment
                        </label>
                        <input
                          type="file"
                          name={d.name}
                          id={d.name}
                          onChange={(event) => {
                            const file: any = event.currentTarget.files?.[0];
                            if (file) {
                              if (file.type === "video/mp4") {
                                // Set error message for the specific field
                                setErrors({ [d.name]: "MP4 files are not allowed." });
                                setFieldValue(d.name, null); // Reset the field value
                                setFileName(""); // Clear any previous file name
                              } else {
                                // Valid file upload
                                setFieldValue(d.name, file);
                                setFileName(file.name);
                              }
                            }
                          }}
                          className="hidden mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                        {initialValues[d.name]?.name && !fileName && (
                          <div className="mt-2 text-blue-600 font-semibold">
                            Existing File: {initialValues[d.name].name}
                          </div>
                        )}
                        {fileName && (
                          <div className="mt-2 text-green-600 font-semibold">
                            File Uploaded: {fileName}
                          </div>
                        )}
                        <ErrorMessage
                          name={d.name}
                          component="div"
                          render={(msg) => (
                            <div className="text-red-500 text-sm font-medium">{msg}</div>
                          )}
                        />

                      </div>
                    ) : d.type === "textarea" ? (
                      <div className="mt-2">
                        <label htmlFor={d.name} className="flex font-medium pb-1">
                          {d.label}
                          {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1">*</span> : ""}:
                        </label>
                        <Field
                          as="textarea"
                          name={d.name}
                          className="w-full border border-gray-200  px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                          rows={4}
                        />
                        <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                      </div>
                    ) : d.subInputs && d.subInputs.length > 0 ? (
                      <div className="mt-2">
                        <label className="flex font-medium pb-1">
                          {d.label}
                          {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1">*</span> : ""}:
                        </label>
                        <div className="flex gap-x-4">
                          {d.subInputs.map((subInput: any, subIndex: any) => (
                            <div key={subIndex} className="mb-2">
                              {subInput.type === "date" && (
                                <Field name={d.name}>
                                  {({ form }: any) => {
                                    if (!form) return null;

                                    return (
                                      <DatePicker
                                        value={values[subInput.name] ? moment(values[subInput.name]) : null} // Pre-fill using moment
                                        disabledDate={disabledDate}
                                        getPopupContainer={(triggerNode: any) => {
                                          return triggerNode.parentNode;
                                        }}
                                        onChange={(_, dateString) => {
                                          form.setFieldValue(subInput.name, dateString);
                                          // @ts-ignore
                                          setLastSelectedDate(dateString); // Update last selected date
                                        }}
                                      />
                                    );
                                  }}
                                </Field>
                              )}
                              {subInput.type === "time" && (
                                <Field name={d.name}>
                                  {({ form }: any) => {
                                    if (!form) return null;

                                    return (
                                      <TimePicker
                                        value={
                                          values[subInput.name]
                                            ? dayjs(values[subInput.name], "HH:mm") // Parse the time using dayjs
                                            : null
                                        }
                                        getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
                                        use12Hours
                                        format="h:mm A"
                                        onChange={(_, timeString) => form.setFieldValue(subInput.name, convertTo24HourFormat(timeString))}
                                      />
                                    );
                                  }}
                                </Field>
                              )}
                              <ErrorMessage name={subInput.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <label htmlFor={d.name} className="flex font-medium pb-1">
                          {d.label}
                          {d.isrequired ? <span className="text-red-500 font-semibold text-xl ml-1">*</span> : ""}:
                        </label>
                        <Field
                          name={d.name}
                          type={d.type}
                          value={values[d.name] || ""} // Fallback to an empty string
                          className="w-full border border-gray-200 px-2 py-1 outline-none focus:border-gray-400 focus:bg-gray-100 rounded-md"
                        />
                        <ErrorMessage name={d.name} component="div" render={(msg) => <div className="text-red-500 text-sm font-medium">{msg}</div>} />
                      </div>
                    )}
                  </div>
                ))}
              <div className="flex justify-end mt-5">
                {(selectedOption || isMode === "Notes") && (
                  <button
                    className={`bg-blue-500 px-4 py-2 text-white rounded-md ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    type="submit"
                    disabled={isButtonDisabled}
                  >
                    {isButtonDisabled ? "Processing..." : "Save & Close"}
                  </button>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default CustomFormForLeadOperations;
