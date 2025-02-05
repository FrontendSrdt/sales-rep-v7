import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { callingContent } from "../../../data/manage-leads/ManageLeadsData";
import { formatPhoneNumber } from "../../../util/actions/genral";

const CallingRequest: React.FC = () => {
  const { leadPhone } = useSelector((state: RootState) => state.ui);
  const { userDetails } = useSelector((state: RootState) => state.getLoggedInUserData);
  const { phone } = userDetails;
  const onGetThePhones = (e: React.SyntheticEvent) => {
    e.preventDefault();

    // Use FormData to get form values
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    let values = Object.fromEntries(formData.entries());

    // Delete fields where phone numbers contain spaces
    values = Object.fromEntries(
      Object.entries(values).filter(([value]) => {
        return typeof value === "string" && !value.includes(" ");
      })
    );
  };

  return (
    <form className="px-4" onSubmit={onGetThePhones}>
      {callingContent.map((data: any) => {
        const displayedPhoneNumber = data.text === "From" ? formatPhoneNumber(phone) : formatPhoneNumber(leadPhone);
        const unformattedPhoneNumber = data.text === "From" ? phone : leadPhone;

        return (
          <div className="content__Calling flex flex-col gap-1" key={data.id}>
            <div className="font-extrabold text-[15px]">{data.text}:</div>

            <div className="ml-4 mt-2 flex gap-1">
              <div className="tracking-widest">
                {/* Display the formatted phone number */}
                <input
                  type="text"
                  name={`${data.name}_formatted`} // For displaying formatted phone numbers
                  defaultValue={displayedPhoneNumber}
                  readOnly
                  className="focus:outline-none focus:border-none"
                />

                {/* Hidden input to store the unformatted phone number */}
                <input
                  type="hidden"
                  name={data.name} // Use this name to store unformatted phone in payload
                  defaultValue={unformattedPhoneNumber}
                  className="focus:outline-none focus:border-none"
                />
              </div>
            </div>
          </div>
        );
      })}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded absolute bottom-[16px] right-[16px]">
        Call
      </button>
    </form>
  );
};

export default CallingRequest;
