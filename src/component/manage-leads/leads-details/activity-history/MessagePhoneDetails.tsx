import React from 'react'
import { MessagePhoneDetailsDataType } from '../../../../types/manage-leads/leads-details-types';


interface MessagePhoneDetailsType {
  data: MessagePhoneDetailsDataType[];
}

const MessagePhoneDetails:React.FC<MessagePhoneDetailsType> = ({data}) => {
  const { heading, subHeading, desc, time } = data[0];
  return (
    <>
      <p>{heading}</p>
      <p className="text-sm mt-2">
        <span className="text-gray-500 font-medium mr-1">{subHeading}</span>
       <span>{desc}</span>
       <span>{time}</span>
      </p>
    </>
  );
};

export default MessagePhoneDetails;
