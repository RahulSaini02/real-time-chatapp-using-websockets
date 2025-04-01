import React from "react";
import { getDateFromTimeStamp } from "@/utils/TimeStampConversion";

export const ChatStartDate = ({ timestamp }: { timestamp: string }) => {
  return (
    <div className="p-2 px-4 rounded-lg w-fit bg-white/80 text-secondary text-center text-[0.9rem] my-4 font-semibold shadow-sm">
      {getDateFromTimeStamp(timestamp)}
    </div>
  );
};
