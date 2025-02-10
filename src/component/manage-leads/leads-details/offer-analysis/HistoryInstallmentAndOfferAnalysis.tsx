import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import store, { RootState } from "../../../../store";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import FeeDetails from "./FeeDetails";
import { lockLeadOffer } from "../../../../store/offer-details/lead-offer-lock-slice";
import { transformHistoryInstallmentTypePayload } from "../../../../util/actions/transformHistoryInstallmentPayload";

type Installment = {
  id: number;
  dueDate: string;
  amount: number;
  leadEnquiryId: number | string;
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
const HistoryInstallmentAndOfferAnalysis: React.FC = () => {
  const { leadOfferHistoryByOfferIdResponse } = useSelector((state: RootState) => state.leadOfferHistoryByOfferId);
  const { responseForAllScholarshipOptions } = useSelector((state: RootState) => state.getAllScholarshipOption);
  const netFee = leadOfferHistoryByOfferIdResponse?.netFee;
  const { responseOfLeadEnquiryDetailsById } = useSelector((state: RootState) => state.getLeadEnquiryDetailsDataById);
  const activeEnquiry = Array.isArray(responseOfLeadEnquiryDetailsById) ? responseOfLeadEnquiryDetailsById.filter((item: any) => item.status === "ACTIVE") : [];
  const leadEnquiryId = activeEnquiry.length > 0 ? activeEnquiry[0].leadEnquiryId : null;
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [installments, setInstallments] = useState<Installment[]>([{ id: 1, dueDate: "", amount: netFee, leadEnquiryId: leadEnquiryId }]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempAmount, setTempAmount] = useState<number | null>(null);
  const [tempDate, setTempDate] = useState<string | null | any>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const { leadCaptureId } = useParams();
  const [numberOfInstallment, setNumberOfInstallment] = useState<number>(0);
  const [lastSelectedDate, setLastSelectedDate] = useState<string | null>(null);

  console.log("leadOfferHistoryByOfferIdResponse.status", leadOfferHistoryByOfferIdResponse.status);

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
          leadEnquiryId: leadEnquiryId,
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
          leadEnquiryId: leadEnquiryId,
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
      // Update the previous installment by adding the remaining amount
      updatedInstallments[deletedIndex - 1].amount += remainingAmount;
    } else {
      // If it's the first installment, create a new installment to absorb the amount
      updatedInstallments.push({
        id: updatedInstallments.length + 1,
        dueDate: "",
        amount: remainingAmount,
        leadEnquiryId: leadEnquiryId,
      });
    }

    setInstallments(updatedInstallments);
  };

  const handleLockOffer = () => {
    setIsButtonDisabled(true);
    const leadFeeInstallmentDetails = installments.map((installment, index) => ({
      leadCaptureId: leadCaptureId,
      installmentSeq: index + 1, // Sequence number for installments
      installmentDueDate: installment.dueDate,
      installmentAmount: parseFloat(installment.amount.toFixed(2)), // Ensuring it's in decimal format
      leadEnquiryId: leadEnquiryId,
    }));

    const finalInstallmentPayload = transformHistoryInstallmentTypePayload(
      leadOfferHistoryByOfferIdResponse,
      leadFeeInstallmentDetails,
      leadCaptureId,
      leadEnquiryId,
      responseForAllScholarshipOptions
    );
    // Validate the payload
    const errors = validateInstallmentPayload(leadFeeInstallmentDetails);
    if (errors.length > 0) {
      setValidationErrors(errors); // Set errors in state
      setIsButtonDisabled(false);
      return;
    }
    setValidationErrors([]); // Clear errors if no validation issues
    console.log("finalInstallmentPayload= ", finalInstallmentPayload);
    store.dispatch(lockLeadOffer(finalInstallmentPayload));
    // store.dispatch(onGetLockAndOfferPayload(finalInstallmentPayload));
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-md mt-4">
      <div className=" w-full handle-table-box p-5">
        {/* Fee-Details Section  */}
        <FeeDetails />
        {/* Installment Section */}
        <div className="w-full mt-5 lg:mt-0 ">
          <h2 className="text-[20px] font-semibold text-[#3b82f6] mb-2">Installment Details</h2>

          {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails &&
            leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.length === 0 &&
            leadOfferHistoryByOfferIdResponse.status === "submitted" && (
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
            )}

          <div className="h-[calc(100%-40px)]">
            <div className="w-full px-3 py-3">
              <div className="w-full overflow-x-auto ">
                <table className="text-sm" border={1} style={{ width: "100%", textAlign: "left" }}>
                  {/* <thead>
                    <tr className="w-full">
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Installment Number</th>
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Due Date</th>
                      <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Amount(Rs)</th>
                      {leadOfferHistoryByOfferIdResponse.status === "submitted" && <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Actions</th>}
                    </tr>
                  </thead> */}

                  {/* form to give installment to student in case of status submitted */}
                  {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails &&
                    leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.length === 0 &&
                    leadOfferHistoryByOfferIdResponse.status === "submitted" && (
                      <>
                        {numberOfInstallment !== 0 && (
                          <>
                            <thead>
                              <tr className="w-full">
                                <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Installment Number</th>
                                <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Due Date</th>
                                <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Amount(Rs)</th>
                                {leadOfferHistoryByOfferIdResponse.status === "submitted" && <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Actions</th>}
                              </tr>
                            </thead>
                            <tbody>
                              {installments.map((installment, index) => (
                                <tr key={installment.id}>
                                  <td className="px-1 py-1 text-nowrap border h-[29px]">{installment.id}</td>
                                  <td className="px-1 py-1 text-nowrap border h-[29px]">
                                    {installment.dueDate === "" ? (
                                      <DatePicker
                                        value={tempDate ? dayjs(tempDate) : null}
                                        onChange={(_, dateString) => setTempDate(dateString)}
                                        disabledDate={disabledDate}
                                        disabled={editingId !== installment.id}
                                        style={{ width: "100%" }}
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
                                      <div className="flex">
                                        <button
                                          className={`px-2 py-0.5    ${
                                            !tempAmount || !tempDate ? "cursor-not-allowed text-gray-600 border-gray-600" : "text-green-600 border-green-600"
                                          }`}
                                          onClick={handleOk}
                                        >
                                          <FaCheck size={18} />
                                        </button>
                                        <button className="px-2 py-0.5    text-red-500 border-red-500" onClick={handleCancel}>
                                          <RxCross2 size={18} />
                                        </button>
                                      </div>
                                    ) : index === installments.length - 1 ? (
                                      <div className="flex">
                                        <button className="px-2 py-0.5    text-blue-500 border-blue-500" onClick={() => handleEditClick(installment.id)}>
                                          <MdModeEditOutline size={18} />
                                        </button>
                                        {index !== 0 && (
                                          <button className="px-2 py-0.5   text-red-500 border-red-500" onClick={() => handleDelete(installment.id)}>
                                            <MdDelete size={18} />
                                          </button>
                                        )}
                                      </div>
                                    ) : null}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </>
                        )}
                      </>
                    )}

                  {/* show the existing installment in case of status re-issues, accept and declined */}
                  {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails &&
                    leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.length !== 0 &&
                    leadOfferHistoryByOfferIdResponse.status !== "submitted" && (
                      <>
                        <thead>
                          <tr className="w-full">
                            <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Installment Number</th>
                            <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Due Date</th>
                            <th className="w-[25%] min-w-[135px] border px-1 py-1.5 text-nowrap">Amount(Rs)</th>
                            {leadOfferHistoryByOfferIdResponse.status === "submitted" && <th className="w-[25%] min-w-[135px]    border px-1 py-1.5 text-nowrap">Actions</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {leadOfferHistoryByOfferIdResponse.leadFeeInstallmentDetails.map((item: any) => (
                            <tr key={item.leadFeeInstallmentDetailsId}>
                              <td className="px-1 py-1 text-nowrap border">{item.installmentSeq}</td>
                              <td className="px-1 py-1 text-nowrap border">{new Date(item.installmentDueDate).toLocaleDateString()}</td>
                              <td className="px-1 py-1 text-nowrap border">{item.installmentAmount.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}
                </table>
              </div>
              {validationErrors.length > 0 && (
                <ul className=" text-red-600  px-3 pb-2">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pb-5 px-5">
        {leadOfferHistoryByOfferIdResponse.status === "submitted" && numberOfInstallment !== 0 && (
          <button className={`bg-blue-600 text-white px-4 py-2 rounded bottom-[16px] right-[16px]`} onClick={handleLockOffer} disabled={isButtonDisabled}>
            Lock Offer
          </button>
        )}
      </div>
    </div>
  );
};

export default HistoryInstallmentAndOfferAnalysis;
