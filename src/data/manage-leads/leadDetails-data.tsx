import { BiTask } from "react-icons/bi";
import { GiProfit } from "react-icons/gi";
import { GrNotes } from "react-icons/gr";
import { TbActivity } from "react-icons/tb";
import { FaChevronUp } from "react-icons/fa";

import { MdModeEdit, MdOutlineEmail, MdOutlineShoppingCartCheckout } from "react-icons/md";
import { LeadsDetailsTypes, leftViewDataType, leftViewHeaderDataType, ProfileHeader, ProfileIcon } from "../../types/manage-leads/leads-details-types";
import { PiNoteDuotone } from "react-icons/pi";
import { SlDocs } from "react-icons/sl";

export const leadFilterDataForModal = {
  title: "Filter",
  cancelButton: "Cancle",
};

const tabData: LeadsDetailsTypes[] = [
  {
    icon: <TbActivity />,
    name: "Activity",
  },
  {
    icon: <GrNotes />,
    name: "Note",
  },
  {
    icon: <BiTask />,
    name: "Tasks",
  },
  {
    icon: <MdOutlineShoppingCartCheckout />,
    name: "Sales Activity",
  },
  {
    icon: <MdOutlineEmail />,
    name: "Email",
  },
  {
    icon: <GiProfit />,
    name: "Processes",
  },
  {
    name: "...",
  },
];

export const TopIconHeaderData: ProfileIcon[] = [
  // {
  //   id: 1,
  //   icon: <SlGraph />,
  //   name: "Activity",
  // },
  {
    id: 2,
    icon: <PiNoteDuotone />,
    name: "Note",
  },
  {
    id: 3,
    icon: <BiTask />,
    name: "Tasks",
  },
  {
    id: 4,
    icon: <SlDocs />,
    name: "Upload Docs",
  },
  // {
  //   id: 5,
  //   icon: <i className="fa fa-user" aria-hidden="true"></i>,
  //   name: "Email",
  // },
  // {
  //   id: 6,
  //   icon: <i className="fa fa-user" aria-hidden="true"></i>,
  // },
];

export const profileHeaderData: ProfileHeader[] = [
  {
    name: "Vivek",
    tag: "COLD_Others",
    email: "viveksrivastava956@gmail.com",
    phone: "+91-7800751612",
    address: "Deoria, Uttar Pradesh",
    icons: [
      // {
      //   id: 1,
      //   icon: <FaRegStar />,
      // },
      // {
      //   id: 2,
      //   icon: <IoShareSocial />,
      // },
      // {
      //   id: 3,
      //   icon: <MdModeEdit />,
      // },
    ],
  },
];

export const leftViewHeaderData: leftViewHeaderDataType[] = [
  {
    id: 1,
    name: "Lead Score",
    number: 25,
  },
  {
    id: 2,
    name: "Total Payable Fees",
    number: "-",
  },
  {
    id: 3,
    name: "Amount Unpaid",
    number: "-",
  },
  {
    id: 4,
    name: "Refund Amount",
    number: "-",
  },
];

export const leftViewData: leftViewDataType[] = [
  {
    heading: "Personal Information",
    dropdownIcon: <FaChevronUp />,
    editIcon: <MdModeEdit />,
  },
];

export default tabData;
