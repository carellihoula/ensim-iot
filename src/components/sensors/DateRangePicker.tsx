/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, react/no-unescaped-entities */
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DateRangePickerProps {
  startDate: string | null;
  setStartDate: (date: string | null) => void;
  endDate: string | null;
  setEndDate: (date: string | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Start Date */}
      <div className="flex flex-col">
        <label className="font-bold text-sm">Start Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[250px] flex justify-between"
            >
              {startDate
                ? format(new Date(startDate), "dd MMM yyyy")
                : "Select Date"}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <DatePicker
              selected={startDate ? new Date(startDate) : null}
              onChange={(date) =>
                setStartDate(date ? date.toISOString().split("T")[0] : "")
              }
              inline
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* End Date */}
      <div className="flex flex-col">
        <label className="font-bold text-sm">End Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[250px] flex justify-between"
            >
              {endDate
                ? format(new Date(endDate), "dd MMM yyyy")
                : "Select Date"}
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <DatePicker
              selected={endDate ? new Date(endDate) : null}
              onChange={(date) =>
                setEndDate(date ? date.toISOString().split("T")[0] : "")
              }
              inline
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DateRangePicker;
