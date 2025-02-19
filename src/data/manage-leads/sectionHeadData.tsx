import { BsGraphUpArrow } from "react-icons/bs";
import { FaUserEdit } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { RiExportFill, RiImportFill, RiUserSettingsFill } from "react-icons/ri";

export const sectionHeadData = [
  {
    heading: "Manage Leads",
    sectionHeadSelectData: [
      {
        id: 2,
        icon: <FaUserPlus />,
        name: "Quick Add Form",
      },
      // {
      //   id: 3,
      //   name: "Add New Leads",
      //   path: "/manage-leads/add-new-leads",
      // },
      {
        id: 4,
        icon: <RiImportFill />,

        name: "Import Leads",
      },
      {
        id: 5,
        icon: <RiUserSettingsFill />,

        name: "Actions",
        subMenu: [
          {
            id: 1,
            icon: <RiExportFill />,

            name: "Export Lead",
          },
          {
            id: 2,
            icon: <FaUserEdit />,

            name: "Change Owner",
          },
          {
            id: 3,
            icon: <BsGraphUpArrow />,

            name: "Change Stage",
          },
        ],
      },
    ],

    sectionHeadSettingData: [
      {
        id: 1,
        name: "Select Columns",
      },

      {
        id: 2,
        name: "Manage Filters",
      },
      {
        id: 3,
        name: "Manage Filters",
      },
    ],

    sectionHeadManageFilterData: [
      {
        id: 1,
        name: "Small",
      },
      {
        id: 2,
        name: "Medium",
      },
      {
        id: 3,
        name: "Large",
      },
      {
        id: 4,
        name: "Extra Large",
      },
    ],
  },
];
