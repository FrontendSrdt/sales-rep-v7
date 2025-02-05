export const transformDataForLeadStagesAndSource = (data: any) => {
    return data.map((item: any) => ({
      label: item.name,
      value: item.value.toString(), // Converting value to string
    }));
  };

  export   const transformDataForLeadSubStages = (data: any) => {
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item: any) => ({
      label: item.displayName,
      value: item.leadSubStageId.toString(), // Converting value to string
    }));
  };