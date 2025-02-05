export const mergeObjects = (data: any) => {
  const result: any = {};

  const merge = (obj: any, prefix = "") => {
    for (const key in obj) {
      const value = obj[key];

      if (Array.isArray(value)) {
        // For contact, keep it as an array, but flatten the individual objects within it.
        if (key === "contact") {
          result[key] = value.map((item) => {
            const flattenedItem: any = {};
            for (const subKey in item) {
              flattenedItem[subKey] = item[subKey];
            }
            return flattenedItem;
          });
        } else {
          // Handle arrays of other types
          value.forEach((item, index) => {
            merge(item, `${prefix ? `${prefix}_${key}` : key}_${index}`);
          });
        }
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        // For nested objects, merge recursively
        merge(value, `${prefix ? `${prefix}_${key}` : key}`);
      } else {
        // For scalar values, just assign them
        result[`${prefix ? `${prefix}_${key}` : key}`] = value;
      }
    }
  };

  merge(data);
  return result;
};
