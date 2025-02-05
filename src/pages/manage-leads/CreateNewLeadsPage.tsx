import store from "../../store";
import CreateNewLeads from "../../component/manage-leads/CreateNewLeads";
import { getApByCareerId } from "../../store/get/get-all-academic-program-by-academic-career-id-slice";
import { getAllCityByStateId } from "../../store/get/get-allCity-byStateId-slice";


const CreateNewLeadsPage: React.FC = () => {
  // useEffect(() => {
  //   dispatchAllApis();
  // }, [dispatchAllApis]);

  const getCityHandler = ({
    stateId,
    target,
  }: {
    stateId: any;
    target: any;
  }) => {

    if (stateId !== undefined) {
      store.dispatch(getAllCityByStateId({ stateId, target }));
    }
  };

  const getAcademicProgramHandler = (careerId: any) => {
    store.dispatch(getApByCareerId(careerId));
  };
  return (
    <CreateNewLeads
      onGetCity={getCityHandler}
      onGetAcademicProgram={getAcademicProgramHandler}
    />
  );
};

export default CreateNewLeadsPage;
