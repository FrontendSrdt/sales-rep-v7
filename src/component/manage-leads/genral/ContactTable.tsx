import { Field, FieldArray, useField } from "formik";
import React, { useEffect, useState } from "react";
import { uiSliceAction } from "../../../store/ui/ui-slice";
import store from "../../../store";
import { useParams } from "react-router-dom";

interface TypeFor {
  values: {
    contact:
      | Array<{
          contactName: string;
          contactRelation: string;
          contactNumber: string;
          primary: boolean;
        }>
      | any;
  };
  isEditing?: boolean;
}

interface ContactFieldProps {
  name: string;
  idx?: number;
  type: string;
}

const ContactField: React.FC<ContactFieldProps> = ({ name, idx, type }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <Field
        {...field}
        type={type}
        readOnly={idx === 0 ? true : false}
        className={`w-full border px-2 outline-none focus:bg-gray-100   ${idx === 0 ? "cursor-not-allowed" : ""} ${
          meta.error && meta.touched ? "border-red-500" : "border-gray-200"
        }`}
      />
    </div>
  );
};

const ContactTable: React.FC<TypeFor> = ({ values, isEditing }) => {
  const [isEnableForContactField, setIsEnableForContactField] = useState(false);
  // boolean state isEnableForcontactField is taken so that no fields can be added if the previous fields are empty
  const { contact } = values;
  // console.log(contact);

  // array.some method returns the boolean true and false
  useEffect(() => {
    const hasEmptyFields = contact.some((_: any, idx: number) => contact[idx].contactName === "" || contact[idx].contactRelation === "" || contact[idx].contactNumber === "");

    setIsEnableForContactField(hasEmptyFields);
  }, [contact]);

  const handlePrimaryChange = (index: number, arrayHelpers: any) => {
    // Update the primary field in the Formik array
    arrayHelpers.form.setFieldValue(`contact[${index}].primary`, true);
    // Set the other contacts to not be primary
    contact.forEach((_: any, idx: number) => {
      if (idx !== index) {
        arrayHelpers.form.setFieldValue(`contact[${idx}].primary`, false);
      }
    });
    store.dispatch(uiSliceAction.onGetLeadsPrimaryNumberHandler(contact[index].contactNumber));
  };

  const { leadCaptureId } = useParams();

  return (
    <FieldArray
      name="contact"
      render={(arrayHelpers) => (
        <div className="contact__head-section w-full">
          <table className="w-full" border={2}>
            <thead>
              <tr>
                <th className="border">Contact Name</th>
                <th className="border">Relation</th>
                <th className="border">Contact Number</th>
                <th className="border">Primary</th>
                {isEditing && <th className="border">Action</th>}
              </tr>
            </thead>
            <tbody>
              {contact.map((_: any, idx: number) => (
                <tr key={idx}>
                  <td className="px-2 border">
                    <ContactField name={`contact[${idx}].contactName`} type="text" idx={idx} />
                  </td>
                  <td className="px-2 border">
                    <ContactField name={`contact[${idx}].contactRelation`} type="text" idx={idx} />
                  </td>
                  <td className="px-2 border">
                    <ContactField name={`contact[${idx}].contactNumber`} idx={idx} type="text" />
                  </td>
                  <td className="px-2 border text-center">
                    <Field
                      name={`contact[${idx}].primary`}
                      type="radio"
                      checked={contact[idx].primary}
                      onChange={() => handlePrimaryChange(idx, arrayHelpers)}
                      className="cursor-pointer"
                      disabled={!isEditing}
                    />
                  </td>
                  {isEditing && (
                    <td className="px-2 border text-center">
                      {idx === 0 ? (
                        <button
                          type="button"
                          disabled={!isEditing}
                          onClick={() => {
                            if (!isEnableForContactField) {
                              arrayHelpers.push({
                                leadCaptureId: leadCaptureId,
                                contactName: "",
                                contactRelation: "",
                                contactNumber: "",
                                primary: false,
                              });
                            }
                          }}
                          className="bg-blue-500 text-white px-3 py-[6px] text-sm font-semibold rounded-md"
                        >
                          +
                        </button>
                      ) : (
                        <button
                          disabled={!isEditing}
                          type="button"
                          onClick={() => arrayHelpers.remove(idx)}
                          className="bg-red-500 text-white px-3 py-[6px] text-sm font-semibold rounded-md"
                        >
                          -
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default ContactTable;
