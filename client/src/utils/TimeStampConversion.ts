export const getTimeFromTimeStamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);

    // Convert to user's local time in HH:MM format
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  } catch {
    return "";
  }
};

export const getDateFromTimeStamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    const today = new Date();

    const diffInMs = today.getTime() - date.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    const pastYear = today.getFullYear() > date.getFullYear();

    let result;

    if (diffInDays == 0) {
      result = "Today";
    } else if (diffInDays == 1) {
      result = "Yesterday";
    } else if (diffInDays <= 7) {
      result = date.toLocaleDateString([], {
        weekday: "long",
      });
    } else if (pastYear == true) {
      result = date.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } else {
      result = date.toLocaleDateString([], {
        weekday: "short",
        month: "short",
        day: "2-digit",
      });
    }
    return result;
  } catch {
    return "";
  }
};
