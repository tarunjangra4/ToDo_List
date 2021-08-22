import React from "react";
import Tasks from "./Tasks";
import Sidebar from "./Sidebar";
import { useState } from "react";

function Content() {
  const [selected, setSelected] = useState("inbox");
  return (
    <section className="content">
      <Sidebar selected={selected} setSelected={setSelected} />
      <Tasks selected={selected} />
    </section>
  );
}

export default Content;
