import React from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

const Sidebar = ({ selected, setSelected }) => {
  return (
    <div className="sidebar">
      <div onClick={() => setSelected("inbox")}>
        <FaInbox className="icon" />
        Inbox
      </div>
      <div onClick={() => setSelected("today")}>
        <FaRegCalendar className="icon" />
        Today
      </div>
      <div onClick={() => setSelected("next_7")}>
        <FaRegCalendarAlt className="icon" />
        Next 7 days
      </div>
    </div>
  );
};

export default Sidebar;
