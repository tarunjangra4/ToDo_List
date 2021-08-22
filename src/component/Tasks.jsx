import React from "react";
import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import { addDays, isAfter, isToday, isBefore } from "date-fns";

const FORMAT = "dd/MM/yyyy";

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = ({ onCancel, onAddTask }) => {
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);

  return (
    <div className="add-task-dialog">
      <input value={task} onChange={(event) => setTask(event.target.value)} />
      <div className="add-task-action">
        <div className="btn-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={() => {
              onAddTask(task, date);
            }}
          >
            Add task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        <div className="icon-container">
          <DayPickerInput
            // style={{ display: "inline" }}
            formatDate={formatDate}
            format={FORMAT}
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            dayPickerProps={{
              modifiers: {
                disabled: [{ before: new Date() }], // disabled the date before the current date
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const TaskItems = ({ selected, tasks }) => {
  let tasksToRender = [...tasks];
  if (selected === "next_7") {
    tasksToRender = tasksToRender.filter(
      (task) =>
        isAfter(task.date, new Date()) &&
        isBefore(task.date, addDays(new Date(), 7))
    );
  }

  if (selected === "today") {
    tasksToRender = tasksToRender.filter((task) => isToday(task.date));
  }

  return (
    <div className="task-items-container">
      {tasksToRender.map((task) => (
        <div className="task-item">
          <p>{task.text}</p>
          <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
};

const TASKS_HEADER_MAPPING = {
  inbox: "Inbox",
  today: "Today",
  next_7: "Next_7_Days",
};

const Tasks = ({ selected }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addNewTask = (text, date) => {
    const newTaskItem = { text, date: date || new Date() };
    setTasks((prevState) => [...prevState, newTaskItem]);
  };

  return (
    <div className="tasks">
      <h1>{TASKS_HEADER_MAPPING[selected]}</h1>
      {selected === "inbox" ? (
        <div
          className="add-task"
          onClick={() => setShowAddTask((prevState) => !prevState)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}
      {showAddTask && (
        <AddTask
          onAddTask={addNewTask}
          onCancel={() => setShowAddTask(false)}
        />
      )}
      {tasks.length > 0 ? (
        <TaskItems tasks={tasks} selected={selected} />
      ) : (
        <p>No Tasks yet</p>
      )}
    </div>
  );
};

export default Tasks;
