import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs"; // Use dayjs for date manipulation
import FeeDetails from "../FeeDetails";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { transformInstallmentTypePayload } from "../../../../../util/actions/transformInstallmentFormPayload";
import store, { RootState } from "../../../../../store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { lockLeadOffer } from "../../../../../store/offer-details/lead-offer-lock-slice";

type Installment = {
  id: number;
  dueDate: string;
  amount: number;
};
const validateInstallmentPayload = (payload: any) => {
  const errors: string[] = [];
  payload.forEach((detail: any, index: number) => {
    if (!detail.installmentDueDate) {
      errors.push(`Installment ${index + 1}: Due Date is required.`);
    }
    if (!detail.installmentAmount) {
      errors.push(`Installment ${index + 1}: Amount is required.`);
    }
  });
  return errors;
};

const InstallmentAndOfferAnalysisNew: React.FC = () => {
  console.log("component called");
  const { leadCaptureId } = useParams();
  const dispatch = store.dispatch;

  const [editingId, setEditingId] = useState<number | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [tempAmount, setTempAmount] = useState<number | null>(null);
  const [tempDate, setTempDate] = useState<string | null | any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [numberOfInstallment, setNumberOfInstallment] = useState<number>(0);
  console.log(numberOfInstallment);

  // const { FeeCalculationByProgramIdResponse } = useSelector((state: RootState) => state.getFeeCalculationByProgramIdResponse);
  const { FeeDetailsV2Response } = useSelector((state: RootState) => state.getFeeDetailsV2);
  const { leadApplicationStatusByLeadId } = useSelector((state: RootState) => state.getLeadApplicationStatusDataByLeadId);
  // const { findLeadScholarshipDetailsResponse } = useSelector((state: RootState) => state.findLeadScholarshipDetails);
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const { leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const shouldDisplayLockButton = leadApplicationStatusByLeadId?.[3]?.status === true && leadOfferHistoryByOfferIdResponse.status !== "validated" && numberOfInstallment !== 0;
  // const leadScholarshipDetailsId = findLeadScholarshipDetailsResponse.leadScholarshipDetailsId;
  const netFee = FeeDetailsV2Response?.courseFeeAfterDiscount;

  const { scholarshipData } = useSelector((state: RootState) => state.ui);
  const leadScholarshipDetailsId = "";

  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry.length > 0 ? activeEnquiry[0].leadEnquiryId : null;

  const [installments, setInstallments] = useState<Installment[]>([{ id: 1, dueDate: "", amount: netFee }]);
  // Track the last selected date (for comparing the next date selection)
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    if (numberOfInstallment > 0 && netFee > 0) {
      const today = new Date();

      const newInstallments = Array.from({ length: numberOfInstallment }, (_, index) => {
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + (15 + index * 30)); // First installment in 15 days, next every 30 days

        return {
          id: index + 1,
          dueDate: dueDate.toISOString().split("T")[0], // Format as 'YYYY-MM-DD'
          amount: Math.floor(netFee / numberOfInstallment), // Evenly split
        };
      });

      // Adjust the last installment to account for any rounding differences
      const totalAssigned = newInstallments.reduce((sum, inst) => sum + inst.amount, 0);
      const remainingAmount = netFee - totalAssigned;
      newInstallments[newInstallments.length - 1].amount += remainingAmount;

      setInstallments(newInstallments);
    } else {
      setInstallments([]); // Reset if numberOfInstallments is 0
    }
  }, [numberOfInstallment, netFee]);

  // Function to disable dates: previous dates and any previously selected dates
  const disabledDate = (current: any) => {
    const today = dayjs(); // Get today's date
    // Disable any date before today, any previously selected date, and any date before the last selected date
    if (lastSelectedDate) {
      return current.isBefore(dayjs(lastSelectedDate), "day") || current.isSame(dayjs(lastSelectedDate), "day") || current.isBefore(today, "day");
    }
    return current.isBefore(today, "day"); // If no date selected yet, just disable previous dates
  };

  const handleEditClick = (id: number) => {
    setEditingId(id);
    const installment = installments.find((inst) => inst.id === id);
    if (installment) {
      setTempAmount(installment.amount);
      setTempDate(installment.dueDate); // Ensure this is a valid date string
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setTempAmount(null);
    setTempDate(null);
  };

  const handleOk = () => {
    if (editingId === null || tempAmount === null || tempDate === null) return;

    // Find the current installment being edited
    const installmentToEdit = installments.find((inst) => inst.id === editingId);
    if (!installmentToEdit) return;

    console.log("installments.amount= ", installments);
    console.log("installmentToEdit.amount= ", installmentToEdit.amount);
    //@ts-ignore
    if (installments.amount === installmentToEdit.amount) {
      // console.log("installments.amount= ", installments.amount);
      alert("Kindly Update amount before process");
      return;
    }
    // Prevent editing to a value greater than the current amount
    if (tempAmount > installmentToEdit.amount) {
      alert("Amount cannot be greater than the current installment amount.");
      return;
    }

    // Update the installment if the amount is valid
    const updatedInstallments = installments.map((installment) => {
      if (installment.id === editingId) {
        return { ...installment, amount: tempAmount, dueDate: tempDate };
      }
      return installment;
    });

    const initialTotalAmount = installments.reduce((sum, inst) => sum + inst.amount, 0);
    const currentTotalAmount = updatedInstallments.reduce((sum, inst) => sum + inst.amount, 0);
    let remainingAmount = initialTotalAmount - currentTotalAmount;

    if (remainingAmount > 0) {
      const newInstallments: Installment[] = [];
      let nextId = installments.length + 1;

      while (remainingAmount > 0) {
        const newInstallmentAmount = Math.min(remainingAmount, netFee);
        newInstallments.push({
          id: nextId,
          dueDate: "",
          amount: newInstallmentAmount,
        });
        nextId++;
        remainingAmount -= newInstallmentAmount;
      }

      setInstallments([...updatedInstallments, ...newInstallments]);
    } else {
      setInstallments(updatedInstallments);
    }

    // Update the last selected date
    setLastSelectedDate(tempDate);

    setEditingId(null);
    setTempAmount(null);
    setTempDate(null);
  };

  const handleDelete = (id: number) => {
    const deletedInstallment = installments.find((inst) => inst.id === id);
    if (!deletedInstallment) return;

    const remainingAmount = deletedInstallment.amount;

    // Find the index of the deleted installment
    const deletedIndex = installments.findIndex((inst) => inst.id === id);

    // Remove the deleted installment from the array
    const updatedInstallments = installments.filter((inst) => inst.id !== id);

    // Add the deleted amount to the previous installment if possible
    if (deletedIndex > 0) {
      console.log("if");
      // Update the previous installment by adding the remaining amount
      //   updatedInstallments[deletedIndex - 1].amount += remainingAmount;
      updatedInstallments[deletedIndex - 1] = {
        ...updatedInstallments[deletedIndex - 1],
        amount: updatedInstallments[deletedIndex - 1].amount + remainingAmount,
        dueDate: "",
      };
    } else {
      console.log("else");
      // If it's the first installment, create a new installment to absorb the amount
      updatedInstallments.push({
        id: updatedInstallments.length + 1,
        dueDate: "",
        amount: remainingAmount,
      });
    }

    console.log("updatedInstallments= ", updatedInstallments);
    setInstallments(updatedInstallments);
  };

  // const handleLockOffer = () => {
  //     const leadFeeInstallmentDetails = installments.map((installment, index) => ({
  //         leadCaptureId: leadCaptureId,
  //         installmentSeq: index + 1, // Sequence number for installments
  //         installmentDueDate: installment.dueDate,
  //         installmentAmount: parseFloat(installment.amount.toFixed(2)), // Ensuring it's in decimal format
  //     }));

  //     const finalInstallmentPayload = transformInstallmentTypePayload(FeeCalculationByProgramIdResponse, leadFeeInstallmentDetails, leadCaptureId, leadScholarshipDetailsId);

  //     // Validate the payload
  //     const errors = validateInstallmentPayload(leadFeeInstallmentDetails);
  //     if (errors.length > 0) {
  //         setValidationErrors(errors); // Set errors in state
  //         return;
  //     }
  //     setValidationErrors([]); // Clear errors if no validation issues
  //     console.log("finalInstallmentPayload==================", finalInstallmentPayload);
  //     dispatch(lockLeadOffer(finalInstallmentPayload));
  //     // console.log(payload); // This is where you'd send the payload, e.g., an API call
  //     // store.dispatch(onGetLockAndOfferPayload(finalInstallmentPayload));
  // };

  const handleLockOffer = () => {
    setIsButtonDisabled(true);

    const leadFeeInstallmentDetails = installments.map((installment, index) => ({
      leadCaptureId: leadCaptureId,
      installmentSeq: index + 1, // Sequence number for installments
      installmentDueDate: installment.dueDate,
      installmentAmount: parseFloat(installment.amount.toFixed(2)), // Ensuring it's in decimal format
    }));

    const finalInstallmentPayload = transformInstallmentTypePayload(
      FeeDetailsV2Response,
      leadFeeInstallmentDetails,
      leadCaptureId,
      leadEnquiryId,
      scholarshipData,
      leadScholarshipDetailsId
    );

    // Validate the payload
    const errors = validateInstallmentPayload(leadFeeInstallmentDetails);
    if (errors.length > 0) {
      setValidationErrors(errors); // Set errors in state
      setIsButtonDisabled(false); // Re-enable the button
      return;
    }
    setValidationErrors([]); // Clear errors if no validation issues
    console.log("finalInstallmentPayload==================", finalInstallmentPayload);
    dispatch(lockLeadOffer(finalInstallmentPayload));
    // console.log(payload); // This is where you'd send the payload, e.g., an API call
    // store.dispatch(onGetLockAndOfferPayload(finalInstallmentPayload));
    // Re-enable the button after 2 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };
  return (
    <div className="bg-white  mt-4">
      <div className=" w-full handle-table-box p-5 rounded-md">
        <FeeDetails />
        <div className="w-full mt-5 lg:mt-0 ">
          <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">Installment Details</h2>

          {/* checkbox to select installment */}

          <div className="flex justify-evenly items-center">
            <div className="flex gap-2">
              <input type="radio" name="numberOfInstallment" value={3} onChange={(e: any) => setNumberOfInstallment(e.target.value)} />
              <label htmlFor="numberOfInstallment">3 Installments </label>
            </div>
            <div className="flex gap-2">
              <input type="radio" name="numberOfInstallment" value={4} onChange={(e: any) => setNumberOfInstallment(e.target.value)} />
              <label htmlFor="numberOfInstallment">4 Installments </label>
            </div>
          </div>
          {numberOfInstallment !== 0 && (
            <div className="border h-[calc(100%-40px)]">
              <div className="w-full px-3 py-3">
                <div className="w-full overflow-x-auto ">
                  <table className="text-sm " border={1} style={{ width: "100%", textAlign: "left" }}>
                    <thead>
                      <tr className="w-full">
                        <th className="w-[25%] min-w-[135px]   border px-1 py-1.5 text-nowrap">Installment Number</th>
                        <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Due Date</th>
                        <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Amount(Rs)</th>
                        <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {installments.map((installment, index) => {
                        console.log("installment.dueDate= ", installment.dueDate);
                        return (
                          <tr key={installment.id}>
                            <td className="px-1 py-1 text-nowrap border h-[29px]">{installment.id}</td>
                            <td className="px-1 py-1 text-nowrap border h-[29px]">
                              {installment.dueDate === "" ? (
                                <DatePicker
                                  value={tempDate ? dayjs(tempDate) : null}
                                  onChange={(_, dateString) => setTempDate(dateString)}
                                  disabledDate={disabledDate}
                                  disabled={editingId !== installment.id}
                                  style={{ width: 180 }}
                                  placeholder="Select date"
                                  className="border-remove-date-picker"
                                />
                              ) : (
                                installment.dueDate
                              )}
                            </td>
                            <td className="px-1 py-1 text-nowrap border h-[29px]">
                              {editingId === installment.id ? (
                                <input
                                  type="text"
                                  className="w-full max-w-[95%] focus:outline-none"
                                  value={tempAmount || ""}
                                  onChange={(e) => setTempAmount(parseInt(e.target.value) || 0)}
                                />
                              ) : (
                                installment.amount
                              )}
                            </td>
                            <td className="px-1 py-1 text-nowrap border h-[29px]">
                              {editingId === installment.id ? (
                                <>
                                  <button
                                    onClick={handleOk}
                                    disabled={!tempAmount || !tempDate}
                                    className={`px-2 py-0.5    ${
                                      !tempAmount || !tempDate ? "cursor-not-allowed text-gray-600 border-gray-600" : "text-green-600 border-green-600"
                                    }`}
                                  >
                                    <FaCheck size={18} />
                                  </button>
                                  <button className="px-2 py-0.5    text-red-500 border-red-500" onClick={handleCancel}>
                                    {" "}
                                    <RxCross2 size={18} />
                                  </button>
                                </>
                              ) : index === installments.length - 1 ? (
                                <>
                                  <button className="px-2 py-0.5    text-blue-500 border-blue-500" onClick={() => handleEditClick(installment.id)}>
                                    <MdModeEditOutline size={18} />
                                  </button>
                                  {index !== 0 && (
                                    <button className="px-2 py-0.5   text-red-500 border-red-500" onClick={() => handleDelete(installment.id)}>
                                      <MdDelete size={18} />
                                    </button>
                                  )}
                                </>
                              ) : null}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Error Messages */}
              {validationErrors.length > 0 && (
                <ul className=" text-red-600  px-3 pb-2">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end px-5 pb-5">
        {shouldDisplayLockButton && (
          <button
            className={` ${shouldDisplayLockButton ? "bg-blue-600" : "bg-red-600"} text-white px-4 py-2 rounded bottom-[16px] right-[16px]`}
            onClick={shouldDisplayLockButton ? handleLockOffer : undefined}
            disabled={isButtonDisabled}
          >
            Lock Offer
          </button>
        )}
      </div>
    </div>
  );
};

export default InstallmentAndOfferAnalysisNew;
