import { createSlice } from "@reduxjs/toolkit";

interface typeUI {
  settingId: any;
  isFilterDropdown: boolean;
  isSubData: boolean;
  isLastThreeRows: boolean;
  leadPhone: string | number;
  isActionModalShow: boolean;
  isFilterModalShow: boolean;
  isLeadsOpen: boolean;
  isMobileMenu: boolean;
  isSettingData: boolean;
  isCustomDate: boolean;
  isSelectedDateRange: boolean;
  isDashboardOpen: boolean;
  isLeadsOpenForMobile: boolean;
  isDashboardOpenForMobile: boolean;
  isDropdownOpen: boolean;
  filterCount: number;
  resetFlag: boolean;
  isProfileOpen: boolean;
  isCardShow: boolean;
  activeStep: null | number;
  // activeSteps: { [key: string]: boolean };
  resetFilters: any;
  isError: boolean;
  seed: number;
  isDrawerOpen: boolean;
  isDrawerOpenForTabAction: boolean;
  modalId: number | null;
  isOpenFor12th: boolean;
  isOpenForDiploma: boolean;
  isNotUndergraduate: boolean;
  isActionOwnerModalShow: boolean;
  initialPhoneNumber: any;
  submittedFormData: any;
  getLeadsPrimaryNumber: any;
  getCreateLeadErrors: [] | null;
  leadCaptureId: number | null;
  getHeaderTabIconsName: string | any; // for getitng tab icon name to open side drawer
  NotesData: Array<any>;
  selectedOption: any;
  ResetFormikInitialValues: () => void;
  isQuickAddFormModalOpen: boolean;
  rightSectionTabname: string;
  isEditEmail: boolean;
  isEditPhone: boolean;
  getOfferAndInstallmentPayload: any;
  isUpdateModalOpen: boolean;
  isEnableForTwelfthInputFields: boolean;
  isEnableForDiplomaInputFields: boolean;
  isEnableForUGInputFields: boolean;
  getAllCheckSelectedDataFormCustomTable: [] | undefined;
  isShowModalForTestAction: boolean;
  isHamburgerModalOpen: boolean;
  selectedColumnToDisplay: Array<object>;
}

const initialState: typeUI = {
  isLeadsOpen: false,
  isMobileMenu: false,
  leadPhone: "",
  resetFilters: "",
  isSubData: false,
  isLastThreeRows: false,
  isError: false,
  isFilterDropdown: false,
  settingId: null,
  isActionModalShow: false,
  isFilterModalShow: false,
  isCustomDate: false,
  isSettingData: false,
  isSelectedDateRange: false,
  isDashboardOpen: false,
  isLeadsOpenForMobile: false,
  isDashboardOpenForMobile: false,
  isDropdownOpen: false,
  filterCount: 0,
  resetFlag: false,
  isProfileOpen: false,
  isCardShow: true,
  activeStep: null,
  // activeSteps: {},
  isDrawerOpen: false,
  isDrawerOpenForTabAction: false,
  seed: 1,

  modalId: null, // modal id to handle the popup for the manage leads table, modal id is taken because the settingId is set to null for the onDisabledDropdownHandler which results in conflict for the popup to open and close for particular leadId
  isOpenFor12th: false,
  isOpenForDiploma: false,
  isNotUndergraduate: false,
  isActionOwnerModalShow: false,
  initialPhoneNumber: null,
  submittedFormData: null,
  getLeadsPrimaryNumber: "",
  getCreateLeadErrors: null,
  leadCaptureId: null,
  getHeaderTabIconsName: "",
  NotesData: [],
  selectedOption: {},
  ResetFormikInitialValues: () => {},
  isQuickAddFormModalOpen: false,
  rightSectionTabname: "Activity History",
  isEditEmail: false,
  isEditPhone: false,
  getOfferAndInstallmentPayload: {},
  isUpdateModalOpen: false,
  isEnableForTwelfthInputFields: false,
  isEnableForDiplomaInputFields: false,
  isEnableForUGInputFields: false,
  getAllCheckSelectedDataFormCustomTable: [],
  isShowModalForTestAction: false,
  isHamburgerModalOpen: false,
  selectedColumnToDisplay: [
    {
      id: 0,
      name: "lead_capture_id",
      label: "Lead Capture Id",
    },
    { id: 3, name: "name", label: "Lead Name" },
    { id: 4, name: "phone", label: "Phone" },
    { id: 5, name: "academic_career_description", label: "Academic Career" },
    { id: 6, name: "academic_program_description", label: "Academic Program" },
  ],
};

const uiSlice = createSlice({
  name: "ui-slice",
  initialState,
  reducers: {
    //  getting LastThreeRows Status for manage dropdown list

    onIsLastThreeRows: (state, action) => {
      state.isLastThreeRows = action.payload;
    },
    //   Dashboard Actions Toggling for Both Mobile and Desktop
    onDashboardOpenHandler: (state) => {
      state.isDashboardOpen = !state.isDashboardOpen;
    },
    onDashboardCloseHandler: (state) => {
      state.isDashboardOpen = false;
    },

    onDashboardOpenHandlerForMobile: (state) => {
      state.isDashboardOpenForMobile = !state.isDashboardOpenForMobile;
    },

    onDashboardCloseHandlerForMobile: (state) => {
      state.isDashboardOpenForMobile = false;
    },

    //  Lead Actions Toggling for Both Mobile and Desktop

    onLeadsOpenHandler: (state) => {
      state.isLeadsOpen = !state.isLeadsOpen;
    },

    onLeadsCloseHandler: (state) => {
      state.isLeadsOpen = false;
    },

    onLeadsOpenForMobileHandler: (state) => {
      state.isLeadsOpenForMobile = !state.isLeadsOpenForMobile;
    },

    onLeadsCloseForMobileHandler: (state) => {
      state.isLeadsOpenForMobile = false;
    },
    onMobileMenuOpenHandler: (state) => {
      state.isMobileMenu = !state.isMobileMenu;
    },

    onMobileMenuCloseHandler: (state) => {
      state.isMobileMenu = false;
    },

    // leads Table
    onToggleSettingData: (state) => {
      state.isSettingData = !state.isSettingData;
    },

    onDisabledSettingData: (state) => {
      state.isSettingData = false;
    },

    onToggleSubData: (state) => {
      state.isSubData = !state.isSubData;
    },

    onDisabledSubData: (state) => {
      state.isSubData = false;
    },

    //  Table Action

    onDropDownOpenHandler: (state, action) => {
      const id = action.payload;
      // Toggle the settingId
      state.settingId = state.settingId === id ? null : id;
      state.modalId = id;
    },
    onDisabledDropdownHandler: (state) => {
      state.settingId = null;
    },

    // Dropdawn conditional Rendering

    onSelectedDateRange: (state, action) => {
      state.isSelectedDateRange = action.payload;
    },

    onCustomDateChange: (state, action) => {
      state.isCustomDate = action.payload;
    },

    // Pop Up Custom

    onShowModalForActionHandler: (state) => {
      state.isActionModalShow = !state.isActionModalShow;
    },

    onShowModalForFilterHandler: (state) => {
      state.isFilterModalShow = !state.isFilterModalShow;
    },

    onDisabledModalForActionHandler: (state) => {
      state.isActionModalShow = false;
      state.isActionOwnerModalShow = false;
    },
    onDisabledModalForFilterHandler: (state) => {
      state.isFilterModalShow = false;
    },

    onGetLeadPhoneHandler: (state, action) => {
      state.leadPhone = action.payload;
    },
    // for filter count
    filterCounter: (state, action) => {
      state.filterCount = action.payload;
    },
    // for filter reset
    resetFlagHandler: (state, action) => {
      state.resetFlag = action.payload;
    },

    onToggleProfileHandler: (state) => {
      state.isProfileOpen = !state.isProfileOpen;
    },
    onProfileCloseHandler: (state) => {
      state.isProfileOpen = false;
    },

    //Manage Filter conditional rendering
    onManageFilterDropdownHandler: (state, action) => {
      state.isFilterDropdown = action.payload;
    },
    onToggleCardhandler: (state) => {
      state.isCardShow = !state.isCardShow;
    },
    resetToggleCardHandler: (state) => {
      state.isCardShow = false;
    },

    onToggleActiveStepHandler: (state, action) => {
      state.activeStep = action.payload;
    },
    // onToggleActiveStepHandler(state, action: PayloadAction<number|string>) {
    //   const id = action.payload;
    //   if (state.activeSteps[id]) {
    //     delete state.activeSteps[id]; // If the step is active, remove it (close it)
    //   } else {
    //     state.activeSteps[id] = true; // If the step is not active, add it (open it)
    //   }
    // },

    onSetSeedHandler: (state) => {
      state.seed = Math.random();
    },

    //reset filter

    getResetFunctionForFilter: (state, action) => {
      state.resetFilters = action.payload;
    },

    onSetErrorHandler: (state, action) => {
      state.isError = action.payload;
    },
    // isDrawerOpen
    onDrawrOpenHandler: (state) => {
      state.isDrawerOpen = true;
      document.body.classList.add("manage_scroll");
    },
    // isDrawerClose
    onDrawrCloseHandler: (state) => {
      state.isDrawerOpen = false;
      document.body.classList.remove("manage_scroll");
    },

    onDrawerOpenHandlerForTabAction: (state, action) => {
      state.isDrawerOpenForTabAction = action.payload;
    },

    // For 12th handler toggle
    onShow12thHandler: (state) => {
      state.isOpenFor12th = true;
    },

    onDisabled12thHandler: (state) => {
      state.isOpenFor12th = false;
    },

    // For Diploma handler toggle

    onShowDiplomaHandler: (state) => {
      state.isOpenForDiploma = true;
    },
    onDisabledDiplomaHandler: (state) => {
      state.isOpenForDiploma = false;
    },

    onSetUndergraduateHandler: (state) => {
      state.isNotUndergraduate = false;
    },
    ondisableUndergraduateHandler: (state) => {
      state.isNotUndergraduate = true;
    },
    onShowOwnerModalForActionHandler: (state) => {
      state.isActionOwnerModalShow = !state.isActionOwnerModalShow;
    },
    onSetInitialPhoneNumber: (state, action) => {
      state.initialPhoneNumber = action.payload;
    },

    onSetFinalDataForForm: (state, action) => {
      state.submittedFormData = action.payload;
    },
    onResetFinalDataForForm: (state) => {
      state.submittedFormData = null;
    },
    onGetLeadsPrimaryNumberHandler: (state, action) => {
      state.getLeadsPrimaryNumber = action.payload;
    },

    onGetCreateLeadErrors: (state, action) => {
      state.getCreateLeadErrors = action.payload;
    },

    onGetLeadCaptureId: (state, action) => {
      state.leadCaptureId = action.payload;
    },
    onGetHeaderTabIconsName: (state, action) => {
      state.getHeaderTabIconsName = action.payload;
    },
    //this is temporary function
    onSaveNotesData: (state, action) => {
      state.NotesData.push(action.payload);
    },
    onGetSelectedOptionForTask: (state, action) => {
      state.selectedOption = action.payload;
    },
    onResetFormikInitialValues: (state, action) => {
      state.ResetFormikInitialValues = action.payload;
    },
    onShowModalForQuickAddLeadForm: (state) => {
      state.isQuickAddFormModalOpen = true;
    },
    onDisableModalForQuickAddLeadForm: (state) => {
      state.isQuickAddFormModalOpen = false;
    },
    onGetRightSectionTabname: (state, action) => {
      state.rightSectionTabname = action.payload;
    },
    onToggleEditEmail: (state) => {
      state.isEditEmail = !state.isEditEmail;
    },
    onToggleEditPhone: (state) => {
      state.isEditPhone = !state.isEditPhone;
    },

    onGetLockAndOfferPayload: (state, action) => {
      state.getOfferAndInstallmentPayload = action.payload;
    },
    onSetOpenForLeadDetailsUpdateModal: (state) => {
      state.isUpdateModalOpen = true;
    },
    onSetCloseForLeadDetailsUpdateModal: (state) => {
      state.isUpdateModalOpen = false;
    },
    onSetEnableForTwefthInputFields: (state) => {
      state.isEnableForTwelfthInputFields = true;
      state.isEnableForDiplomaInputFields = false;
    },
    onSetEnableForDiplomaInputFields: (state) => {
      state.isEnableForDiplomaInputFields = true;
      state.isEnableForTwelfthInputFields = false;
    },
    onSetEnableForUGInputFields: (state) => {
      state.isEnableForUGInputFields = true;
    },
    onGetAllCheckSelectedDataFormCustomTable: (state, action) => {
      state.getAllCheckSelectedDataFormCustomTable = action.payload;
    },
    onShowModalForTestAction: (state) => {
      state.isShowModalForTestAction = true;
    },
    onDisableModalForTestAction: (state) => {
      state.isShowModalForTestAction = false;
    },
    onShowModalForHamburger: (state) => {
      state.isHamburgerModalOpen = true;
    },
    onDisableModalForHamburger: (state) => {
      state.isHamburgerModalOpen = false;
    },

    onsetSelectedColumnToDisplay: (state, action) => {
      state.selectedColumnToDisplay = action.payload;
    },
  },
});

export const {
  onDashboardOpenHandler,
  onDashboardCloseHandler,
  onDashboardCloseHandlerForMobile,
  onDashboardOpenHandlerForMobile,
  onLeadsOpenHandler,
  onLeadsCloseHandler,
  onLeadsOpenForMobileHandler,
  onLeadsCloseForMobileHandler,
  onMobileMenuOpenHandler,
  onMobileMenuCloseHandler,
  onDropDownOpenHandler,
  onDisabledDropdownHandler,
  filterCounter,
  resetFlagHandler,
  onProfileCloseHandler,
  onToggleProfileHandler,
  onManageFilterDropdownHandler,
  onToggleCardhandler,
  resetToggleCardHandler,
  onToggleActiveStepHandler,
  getResetFunctionForFilter,
  onSetErrorHandler,
  onDrawrOpenHandler,
  onDrawrCloseHandler,
  onSetUndergraduateHandler,
  ondisableUndergraduateHandler,
  onShowOwnerModalForActionHandler,
  onSetInitialPhoneNumber,
  onSetFinalDataForForm,
  onResetFinalDataForForm,
  onGetCreateLeadErrors,
  onGetLeadCaptureId,
  onGetHeaderTabIconsName,
  onSaveNotesData,
  onGetSelectedOptionForTask,
  onShowModalForQuickAddLeadForm,
  onDisableModalForQuickAddLeadForm,
  onGetRightSectionTabname,
  onToggleEditPhone,
  onToggleEditEmail,
  onGetLockAndOfferPayload,
  onSetOpenForLeadDetailsUpdateModal,
  onSetCloseForLeadDetailsUpdateModal,
  onSetEnableForTwefthInputFields,
  onSetEnableForDiplomaInputFields,
  onSetEnableForUGInputFields,
  onGetAllCheckSelectedDataFormCustomTable,
  onShowModalForTestAction,
  onDisableModalForTestAction,
  onShowModalForHamburger,
  onDisableModalForHamburger,
  onsetSelectedColumnToDisplay,
} = uiSlice.actions;

export const uiSliceAction = uiSlice.actions;
export default uiSlice.reducer;

// Root Name = uiSliceReducer
