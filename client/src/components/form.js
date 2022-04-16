import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { useDB, useSideBar } from "../global/states";

export default function Newproject(props) {
  let [input, setInput] = useState({
    project_name: "",
    tasks: "",
  });
  let inputRef = useRef({});

  let { setProjects } = useDB();
  let { setBarStatus } = useSideBar();

  function handleInput(ev) {
    let elem = ev.target;

    setInput((input) => {
      input[elem.id] = elem.value;
      return input;
    });
  }

  async function handleNewProject() {
    let tasks = [];

    // object of tasks with complete status default to false
    input.tasks.match(/[\s+\w+|!]+|[.!]+/gi).forEach((task) => {
      tasks.push({
        task: task,
        complete_status: false,
      });
    });

    await fetch("/api/newproject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: input.project_name,
        tasks: tasks,
      }),
    });

    inputRef.project_name.value = "";
    inputRef.tasks.value = "";

    setProjects();
    setBarStatus();
    setInput((input) => {
      input.project_name = "";
      input.tasks = "";
      return input;
    });
  }

  return (
    <Form>
      <label htmlFor="project_name">Name</label>
      <input
        type="text"
        id="project_name"
        onChange={handleInput}
        ref={(elem) => (inputRef.project_name = elem)}
      />
      <label>Tasks</label>
      <textarea
        id="tasks"
        onChange={handleInput}
        ref={(elem) => (inputRef.tasks = elem)}
      />
      <button className="new-add-btn" onClick={handleNewProject}>
        ADD
      </button>
    </Form>
  );
}

const Form = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input {
    width: 100%;
    height: 2rem;
    font-size: 1.2rem;
    margin: 4px;
  }

  & #project_name {
    margin-bottom: 1rem;
  }

  & .new-add-btn {
    width: 100%;
    padding: 6px 1rem;
    border: none;
    background-color: #2772db;
    color: #fff;
    margin-top: 1rem;
  }

  & textarea {
    height: 12rem;
    width: 100%;
    padding: 8px;
    resize: none;
  }
`;
