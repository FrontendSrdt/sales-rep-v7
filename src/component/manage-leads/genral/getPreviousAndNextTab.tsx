import { tabsDataForCreateLeads } from "../../../data/manage-leads/ManageLeadsData";

export const getPreviousAndNextTab = (activeTab: number) => {
  const previousTabIndex = activeTab > 0 ? activeTab - 1 : null;
  const nextTabIndex =
    activeTab < 4 ? activeTab + 1 : activeTab === 4 ? null : null;
  const previousTabName =
    previousTabIndex !== null
      ? tabsDataForCreateLeads[previousTabIndex].label
      : "";

  const nextTabName =
    nextTabIndex !== null ? tabsDataForCreateLeads[nextTabIndex].label : "";

  return { previousTabName, nextTabName };
};
