export const transformData = (data: any, config: any) => {
  return config
    .flatMap((section: any) => {
      if (section.title === "Related Contacts" && Array.isArray(data.contact)) {
        // Map each contact item separately
        return data.contact.map((contact: any, index: any) => ({
          id: `${section.id}-${index}`, // Unique ID for each contact
          title: `${section.title} ${index + 1}`, // For example, "Related Contacts 1", "Related Contacts 2"
          previewConfigItems: section.fields
            .map((field: any) => {
              let value = contact[field.key];
              if (field.key === "primary" && typeof value === "boolean") {
                value = value ? "Yes" : "No"; // Convert boolean to Yes/No
              }
              return {
                id: field.id,
                name: field.name,
                value: value || "", // Retrieve values from each contact object
              };
            })
            .filter((item: any) => item.value !== ""),
        }));
      } else {
        const previewConfigItems = section.fields
          .map((field: any) => ({
            id: field.id,
            name: field.name,
            value: data[field.key] || "",
          }))
          .filter((item: any) => item.value !== "");

        return previewConfigItems.length > 0
          ? {
              id: section.id,
              title: section.title,
              previewConfigItems,
            }
          : null;
      }
    })
    .filter(Boolean); // Filter out any null entries
};
