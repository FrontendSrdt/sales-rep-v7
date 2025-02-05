import About from "../pages/About";
import HomePage from "../pages/HomePage";
import RootLayout from "../pages/RootLayout";
import SmartViewPage from "../pages/smart-view/SmartViewPage";
import ManageLeadsPage from "../pages/manage-leads/ManageLeadsPage";
import OAuth2RedirectHandler from "../component/OAuth2RedirectHandler";
import ViewManageLeadsPage from "../pages/manage-leads/ViewManageLeadsPage";
import CreateNewLeadsPage from "../pages/manage-leads/CreateNewLeadsPage";
import ProfilePage from "../pages/ProfilePage";
import ViewDeclineCasesPage from "../pages/view-decline-cases/ViewDeclineCasesPage";
import ManageContractPage from "../pages/view-decline-cases/ManageContractPage";
import ManageLeadsV1Page from "../pages/manage-leads-v1/ManageLeadsV1Page";

export const routes = [
  {
    path: "/login/oauth2/code/unifcrm",
    element: <OAuth2RedirectHandler />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/manage-leads",
        element: <ManageLeadsPage />,
        // loader: () => defer({ data: fetchAllLeads() }),
        children: [
          {
            path: "add-new-leads",
            element: <CreateNewLeadsPage />,
          },
          {
            path: "details/:leadCaptureId",
            element: <ViewManageLeadsPage />,
          },
        ],
      },
      {
        path: "/manage-leads-v1",
        element: <ManageLeadsV1Page />,
        // loader: () => defer({ data: fetchAllLeads() }),
        children: [
          {
            path: "add-new-leads",
            element: <CreateNewLeadsPage />,
          },
          {
            path: "details/:leadCaptureId",
            element: <ViewManageLeadsPage />,
          },
        ],
      },
      {
        path: "/smart-view",
        element: <SmartViewPage />,
      },
      {
        path: "/view-decline-cases",
        element: <ViewDeclineCasesPage />,
        children: [
          {
            path: "manage-contract/:leadCaptureId",
            element: <ManageContractPage />,
          },
        ],
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
];
