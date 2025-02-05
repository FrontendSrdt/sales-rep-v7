import { MdOutlineEmail, MdOutlineMessage } from "react-icons/md";
import { PiNotepadBold } from "react-icons/pi";
import { FiActivity } from "react-icons/fi";
import MessageDetails from "../../component/manage-leads/leads-details/activity-history/MessageDetails";
import MessagePhoneDetails from "../../component/manage-leads/leads-details/activity-history/MessagePhoneDetails";
import { activeHistoryType, MessagePhoneDetailsDataType } from "../../types/manage-leads/leads-details-types";
import ActiveHistory from "../../component/manage-leads/leads-details/activity-history/ActiveHistory";
import TaskDetail from "../../component/manage-leads/leads-details/task/TaskDetails";
import NotesDetails from "../../component/manage-leads/leads-details/notes/NotesDetails";
import DocumentDetails from "../../component/manage-leads/leads-details/documents/DocumentDetails";
import OfferAnalysisPage from "../../pages/manage-leads/OfferAnalysisPage";
import StudentDocumentsPage from "../../pages/manage-leads/StudentDocumentsPage";
import LeadDetailsNew from "../../component/manage-leads/leads-details/lead-detail-new/LeadDetailsNew";

export const tabs = [
  { id: "1", label: "Activity History", content: <ActiveHistory /> },
  // { id: "2", label: "Lead Details", content: <LeadDetail /> },
  { id: "2", label: "Lead Details", content: <LeadDetailsNew /> },
  { id: "3", label: "Tasks", content: <TaskDetail /> },
  { id: "4", label: "Notes", content: <NotesDetails /> },
  { id: "5", label: "Documents", content: <DocumentDetails /> },
  { id: "6", label: "Offer Analysis", content: <OfferAnalysisPage /> },
  { id: "7", label: "Student's Documents", content: <StudentDocumentsPage /> },
];

export const ActiveHistoryData = [
  {
    dropdown1: [
      {
        id: 1,
        option: "All Activities",
      },
      {
        id: 2,
        option: "New Lead",
      },
      {
        id: 3,
        option: "Contacted",
      },
      {
        id: 4,
        option: "Qualified",
      },
    ],
    dropdown2: [
      {
        id: 1,
        option: "All Time",
      },
      {
        id: 2,
        option: "New Lead",
      },
      {
        id: 3,
        option: "Contacted",
      },
      {
        id: 4,
        option: "Qualified",
      },
    ],
  },
];

const MessagePhoneDetailsData: MessagePhoneDetailsDataType[] = [
  {
    heading: "STUDENT TAKEN ADDMISSION OTHER COLLEGE",
    subHeading: "Added by",
    desc: " Saijy Bano  on  09-07-2022 5:45 PM",
    time: "09-07-2022 5:45 PM",
  },
];
const messageDetailsForId1 = [
  {
    heading: " Missed Call Alert",
    name: "V I V E K",
    desc: "You have missed called from VIVEK at 2022-07-09 10:49 Revert on Priority",
    timeline: [
      {
        id: 1,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 2,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 3,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 4,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
    ],
  },
];
const messageDetailsForId2 = [
  {
    heading: " Missed Call Alert",
    name: "V I V E K",
    desc: "You have missed called from VIVEK at 2022-07-09 10:49 Revert on Priority",
    timeline: [
      {
        id: 1,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 2,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 3,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
      {
        id: 4,
        name: "Completed on",
        data: "09-07-2022 10:44 AM",
      },
    ],
  },
];
const messageDetailsForId3 = [
  {
    desc: "Lead Stage Change from open to COLD_Others through Automation",
    timeline: [
      {
        id: 1,
        name: "Changed By",
        data: "System",
      },
    ],
  },
];

export const activeHistoryStep1: activeHistoryType[] = [
  {
    id: 0,
    time: "18 Aug 06:47 PM",
    title: "WhatsApp Message",
    message: "Modified by System on 18/08/2022 06:47 PM",
    icon: <MdOutlineMessage />,
    bg_color: "bg-blue-500",
  },
  {
    id: 1,
    time: "18 Aug 05:30 PM",
    title: "WhatsApp Message",
    message: "Modified by System on 18/08/2022 05:30 PM",
    icon: <MdOutlineMessage />,
    bg_color: "bg-blue-500",
  },
  {
    id: 2,
    time: "18 Aug 05:12 PM",
    title: "WhatsApp Message",
    message: "Heartiest Congratulations on your admission...",
    icon: <MdOutlineMessage />,
    bg_color: "bg-blue-500",
  },
  {
    id: 3,
    time: "18 Aug 05:12 PM",
    title: "Sent Automation email",
    message: "Sent Automation email with subject IMP...",
    bg_color: "bg-blue-500",
    icon: <MdOutlineMessage />,
  },
  {
    id: 4,
    time: "18 Aug 05:12 PM",
    title: "Sent Automation email",
    message: "Sent Automation email with subject IMP...",
    icon: <FiActivity />,
    bg_color: "bg-blue-500",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero nemo doloremque commodi iste voluptatem hic dicta cupiditate ipsum blanditiis aperiam recusandae veniam necessitatibus beatae eveniet tempore ut dolores illo dolore ipsam, perferendis quos accusamus cumque debitis corrupti! Soluta corporis, inventore in, beatae dolor eligendi tempore aliquam voluptas ad asperiores itaque praesentium libero repellendus consequatur ipsa accusantium iste! Animi, cumque cupiditate.",
    button: "Read More...",
  },
  {
    id: 5,
    time: "18 Aug 05:12 PM",
    icon: <MdOutlineEmail />,
    bg_color: "bg-teal-500",
  },
];

export const activeHistoryStep2 = [
  {
    id: 0,
    time: "18 Aug 06:47 PM",
    child: <MessageDetails data={messageDetailsForId1} />,
    icon: <PiNotepadBold />,
    bg_color: "bg-gray-500",
  },
  {
    id: 1,
    time: "18 Aug 06:47 PM",
    child: <MessageDetails data={messageDetailsForId2} />,
    icon: <PiNotepadBold />,
    bg_color: "bg-gray-500",
  },
  {
    id: 2,
    time: "18 Aug 06:47 PM",
    child: <MessageDetails data={messageDetailsForId3} />,
    icon: <MdOutlineMessage />,
    bg_color: "bg-blue-500",
  },
  {
    id: 3,
    time: "18 Aug 06:47 PM",
    title: "Had a Phone Conversation",
    message: <MessagePhoneDetails data={MessagePhoneDetailsData} />,
    icon: <MdOutlineMessage />,
    // component: <WhatsApp data={whatsappDataForId1} />,
    bg_color: "bg-blue-500",
  },
];
