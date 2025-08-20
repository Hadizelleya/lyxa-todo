export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-UK", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h12",
  });
};

export const isDateOverdue = (
  dueDate: string | null,
  status: string
): boolean => {
  if (!dueDate || status !== "Ongoing") return false;
  return new Date() > new Date(dueDate);
};

export const getCurrentISOString = (): string => {
  return new Date().toISOString();
};
