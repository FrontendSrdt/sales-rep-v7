import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ShowCreateNewLeadErrors: React.FC = () => {
  const { getCreateLeadErrors } = useSelector((state: RootState) => state.ui);

  // Transforming the object into a display-friendly format
  const transformedErrors = React.useMemo(() => {
    if (!getCreateLeadErrors || typeof getCreateLeadErrors !== "object") return [];

    const flattenErrors = (errors: any, parentKey: string = ""): any[] => {
      if (!errors || typeof errors !== "object") return [];

      return Object.entries(errors).flatMap(([key, value]) => {
        const fullKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof value === "string") {
          return [{ key: fullKey, message: value }];
        }
        if (Array.isArray(value)) {
          return value.flatMap((item, index) => flattenErrors(item, `${fullKey}[${index}]`));
        }
        if (typeof value === "object" && value !== null) {
          return flattenErrors(value, fullKey);
        }
        return [];
      });
    };

    return flattenErrors(getCreateLeadErrors);
  }, [getCreateLeadErrors]);

  return (
    <div className="flex justify-center">
      <div className="w-full border text-red-500 font-semibold rounded-lg p-5 mt-6">
        <div className="-space-y-2">
          {transformedErrors.length > 0 ? (
            transformedErrors.map((error) => (
              <div key={error.key} className="">
                <ul className=" space-y-2 list-disc">
                  <li className="mb-2 ml-3">
                    <span className="">{error.message}</span>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <p>No errors found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowCreateNewLeadErrors;
