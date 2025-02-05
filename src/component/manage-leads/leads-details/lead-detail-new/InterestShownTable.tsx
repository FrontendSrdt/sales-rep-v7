import { Field, FieldArray, useField } from "formik";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../../store";
import { getApRowWiseByCareerId } from "../../../../store/lead-attribute-update/get-academicProgramRowWise-byCareerId-slice";
import { getCityRowWiseByStateId } from "../../../../store/lead-attribute-update/get-CityRowWise-byStateId-slice";

interface TypeFor {
  values: {
    interest:
      | Array<{
          academicCareerId: string;
          academicProgramId: string;
          currentCoreStateId: string;
          currentCoreCityId: string;
          leadSourceId: string;
          active: boolean;
        }>
      | any;
  };
  isEditing?: boolean;
  setIsRowAdded: (e: any) => void;
  isRowAdded: boolean;
}

interface InterestFieldProps {
  name: string;
  idx?: number;
  type: string;
  options: any;
  onGetSelectedId?: (e: any, f: any) => void;
  isReadOnly: boolean;
}

const InterestField: React.FC<InterestFieldProps> = ({ name, idx, type, options, onGetSelectedId, isReadOnly }) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (id: any, idx: number) => {
    helpers.setValue(id);
    onGetSelectedId && onGetSelectedId(id, idx);
  };

  return (
    <div>
      {type === "select" ? (
        <Field
          {...field}
          as="select"
          disabled={idx === 0 || isReadOnly ? true : false}
          className={`w-full border px-2 outline-none focus:bg-gray-100 ${idx === 0 ? "cursor-not-allowed" : ""} ${
            meta.error && meta.touched ? "border-red-500" : "border-gray-200"
          }`}
          onChange={(e: any) => handleChange(e.target.value, idx!)}
        >
          <option value="">Select an option</option>
          {options.map((item: any, index: number) => (
            <option value={item.id} key={index}>
              {item.name}
            </option>
          ))}
        </Field>
      ) : (
        type === "radio" && (
          <Field
            {...field}
            type={type}
            isReadOnly={true}
            className={`w-full border px-2 outline-none focus:bg-gray-100 ${idx === 0 ? "cursor-not-allowed" : ""} ${
              meta.error && meta.touched ? "border-red-500" : "border-gray-200"
            }`}
          />
        )
      )}
    </div>
  );
};

const InterestShownTable: React.FC<TypeFor> = ({ values, isEditing, setIsRowAdded, isRowAdded }) => {
  const { responseForAcademicCareer } = useSelector((state: RootState) => state.getAllAcademicCareer);
  const { responseForState } = useSelector((state: RootState) => state.getAllStatesData);
  const { responseForLeadSource } = useSelector((state: RootState) => state.getAllLeadSource);
  const { CityRowWiseDataByStateId } = useSelector((state: RootState) => state.getCityRowWiseByStateId);
  const { AcademicProgramRowWiseDataByCareerId } = useSelector((state: RootState) => state.getAcademicProgramRowWiseByCareerId);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);

  const sizeOfInterest = Object.keys(responseOfLeadEnquiryDetailsById).length;

  const { interest } = values;

  const getAcademicProgramByCareerId = (careerId: string, index: number) => {
    // console.log(careerId);
    if (careerId !== "" && careerId !== null) {
      store.dispatch(getApRowWiseByCareerId({ careerId, index }));
    }
  };

  const getCityByStateId = (stateId: any, index: number) => {
    // console.log(stateId);
    if (stateId !== "" && stateId !== null) {
      store.dispatch(getCityRowWiseByStateId({ stateId: stateId, index }));
    }
  };

  const handlePrimaryChange = (index: number, arrayHelpers: any) => {
    // Update the primary field in the Formik array
    arrayHelpers.form.setFieldValue(`interest[${index}].active`, true);
    // Set the other contacts to not be primary
    interest.forEach((_: any, idx: number) => {
      if (idx !== index) {
        arrayHelpers.form.setFieldValue(`interest[${idx}].active`, false);
      }
    });
  };

  // console.log(isEnableForInterestField);

  const { leadCaptureId } = useParams();

  return (
    <FieldArray
      name="interest"
      render={(arrayHelpers) => (
        <div className="contact__head-section w-full">
          <table className="w-full" border={2}>
            <thead>
              <tr>
                <th className="border">Academic Career</th>
                <th className="border">Academic Program</th>
                <th className="border">State</th>
                <th className="border">City</th>
                <th className="border">Lead Source</th>
                <th className="border">Active</th>
                {isEditing && <th className="border">Action</th>}
              </tr>
            </thead>
            <tbody>
              {interest.map((_: any, idx: number) => {
                // console.log(AcademicProgramRowWiseDataByCareerId[idx]);
                return (
                  <tr key={idx}>
                    <td className="px-2 border">
                      <InterestField
                        name={`interest[${idx}].academicCareerId`}
                        type="select"
                        idx={idx}
                        options={responseForAcademicCareer}
                        onGetSelectedId={getAcademicProgramByCareerId}
                        isReadOnly={idx > sizeOfInterest - 1 && isEditing ? false : true}
                      />
                    </td>
                    <td className="px-2 border">
                      <InterestField
                        name={`interest[${idx}].academicProgramId`}
                        type="select"
                        idx={idx}
                        options={AcademicProgramRowWiseDataByCareerId[idx] || []}
                        isReadOnly={idx > sizeOfInterest - 1 && isEditing ? false : true}
                      />
                    </td>
                    <td className="px-2 border">
                      <InterestField
                        name={`interest[${idx}].currentCoreStateId`}
                        idx={idx}
                        type="select"
                        options={responseForState}
                        onGetSelectedId={getCityByStateId}
                        isReadOnly={idx > sizeOfInterest - 1 && isEditing ? false : true}
                      />
                    </td>
                    <td className="px-2 border">
                      <InterestField
                        name={`interest[${idx}].currentCoreCityId`}
                        idx={idx}
                        type="select"
                        options={CityRowWiseDataByStateId[idx] || []}
                        isReadOnly={idx > sizeOfInterest - 1 && isEditing ? false : true}
                      />
                    </td>
                    <td className="px-2 border">
                      <InterestField
                        name={`interest[${idx}].leadSourceId`}
                        idx={idx}
                        type="select"
                        options={responseForLeadSource}
                        isReadOnly={idx > sizeOfInterest - 1 && isEditing ? false : true}
                      />
                    </td>
                    <td className="px-2 border text-center">
                      <Field
                        name={`interest[${idx}].active`}
                        type="radio"
                        checked={interest[idx].active}
                        onChange={() => handlePrimaryChange(idx, arrayHelpers)}
                        className="cursor-pointer"
                        isReadOnly={!isEditing}
                      />
                    </td>
                    {isEditing && (
                      <td className="px-2 border text-center">
                        {idx === 0 ? (
                          <button
                            type="button"
                            disabled={!isEditing}
                            onClick={() => {
                              if (!isRowAdded) {
                                arrayHelpers.push({
                                  leadCaptureId: leadCaptureId,
                                  academicCareerId: "",
                                  academicProgramId: "",
                                  currentCoreStateId: "",
                                  currentCoreCityId: "",
                                  leadSourceId: "",
                                  active: false,
                                });
                                setIsRowAdded(true);
                              }
                            }}
                            className={`${
                              isRowAdded ? "bg-opacity-50 cursor-not-allowed" : "cursor-pointer"
                            } bg-blue-500 text-white px-3 py-[6px] text-sm font-semibold rounded-md`}
                          >
                            +
                          </button>
                        ) : (
                          isRowAdded &&
                          idx >= sizeOfInterest && (
                            <button
                              // disabled={}
                              type="button"
                              onClick={() => {
                                arrayHelpers.remove(idx);
                                setIsRowAdded(false);
                              }}
                              className={` text-white px-3 py-[6px] text-sm font-semibold rounded-md bg-red-500`}
                            >
                              -
                            </button>
                          )
                        )}
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    />
  );
};

export default InterestShownTable;
