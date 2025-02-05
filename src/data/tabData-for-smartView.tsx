import { FaRegUser } from "react-icons/fa";
import NewLeads from "../component/smart-view/new-leads/NewLeads";
import PhoneConversation from "../component/smart-view/PhoneConversation";
import OutBoundCalling from "../component/smart-view/OutBoundCalling";
import MissedCall from "../component/smart-view/MissedCall";
import Inbound from "../component/smart-view/Inbound";
import TotalCalls from "../component/smart-view/TotalCalls";
import UntouchedLeads from "../component/smart-view/UntouchedLeads";
import { SlGraph } from "react-icons/sl";
import Follow_Up from "../component/smart-view/todays-followUp/Follow_Up";

// Data for each tab
const tabData = [
  {
    id: 1,
    content: "New Lead",
    icon: <FaRegUser />,
    data: <NewLeads />,
    count: 0,
  },
  {
    id: 2,
    content: "Today's Follow-up",
    icon: <i className="fa fa-calendar" aria-hidden="true"></i>,
    data: <Follow_Up />,
    count: 0,
  },
  {
    id: 3,
    content: "Phone conversation-activity",
    icon: <SlGraph />,
    data: <PhoneConversation />,
    count: 196,
  },
  {
    id: 4,
    content: "Outbond Calling",
    icon: <SlGraph />,
    data: <OutBoundCalling />,
    count: 113,
  },
  {
    id: 5,
    content: "Untouched Lead",
    icon: <i className="fa fa-user" aria-hidden="true"></i>,
    data: <UntouchedLeads />,
    count: 10,
  },
  {
    id: 6,
    content: "Missed Call",
    icon: <SlGraph />,
    data: <MissedCall />,
    count: 0,
  },
  {
    id: 7,
    content: "Inbound",
    icon: <SlGraph />,
    data: <Inbound />,
    count: "2.44k",
  },
  {
    id: 8,
    content: "Total Call",
    icon: <SlGraph />,
    data: <TotalCalls />,
    count: "765.45k",
  },
];

// Custom Previous Arrow Component
export function PrevArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} prev-arrow`} onClick={onClick}>
      <i className="fa fa-chevron-left" aria-hidden="true"></i>
    </div>
  );
}

// Custom Next Arrow Component
export function NextArrow(props: any) {
  const { className, onClick } = props;
  return (
    <div className={`${className} next-arrow`} onClick={onClick}>
      <i className="fa fa-chevron-right " aria-hidden="true"></i>
    </div>
  );
}

export default tabData;
