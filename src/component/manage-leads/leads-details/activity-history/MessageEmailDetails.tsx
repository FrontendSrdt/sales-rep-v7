import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MessageEmailDetailsDataType } from "../../../../types/manage-leads/leads-details-types";

interface MessageEmailDetailsType {
  data: MessageEmailDetailsDataType[];
}

const MessageEmailDetails: React.FC<MessageEmailDetailsType> = ({ data }) => {
  const { desc1, heading1, desc2, heading2, desc3, email } = data[0];
  return (
    <>
      {desc1} <span className="text-blue-500">{heading1}</span> {desc2}
      <span className="text-blue-500">{heading2}</span>
      {desc3}
      <Link
        className="inline-flex  items-center"
        to="mailto:Nimish.saxsena@semu.ic.in"
      >
        <FaChevronLeft size={12} /> {email}
        <FaChevronRight size={12} />
      </Link>
    </>
  );
};

export default MessageEmailDetails;
