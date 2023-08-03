import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string) => {
  try {
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error("Invalid date string:", dateString, error);
    return "Invalid Date";
  }
};
