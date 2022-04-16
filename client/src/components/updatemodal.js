import styled from "@emotion/styled";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { useDB, useUpdateModal } from "../global/states";

export default function UpdateModal(props) {
  let { projects, setProjects } = useDB();
  let { modalStatus, projectName, closeModal } = useUpdateModal();

  let project;

  if (projects && projects.length > 0 && projectName) {
    let temp = projects.filter(
      (project) => project.project_name === projectName
    );
    project = temp[0];
  } else {
    return null;
  }

  async function handleUpdateClick(ev) {
    let clickedTaskName = ev.target.getAttribute("data-task");

    project.tasks.forEach((task) => {
      if (task.task === clickedTaskName) {
        task.complete_status = true;
      }
    });

    await fetch("/api/updateproject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    });
    setProjects();
  }

  return (
    <Div status={modalStatus}>
      <ImCross id="modal_dismiss_icon" onClick={closeModal} />
      <h2>Project Update</h2>
      <div className="tasks_list">
        {project.tasks.map((task, ind) => {
          return (
            <Task
              key={ind}
              onClick={handleUpdateClick}
              data-task={task.task}
              status={task.complete_status}
            >
              <h2 id="task_name">{task.task}</h2>
              <TiTick id="tick" />
            </Task>
          );
        })}
      </div>
    </Div>
  );
}

const Task = styled.div`
  width: 100%;
  height: 2.5rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid #848484;

  &:hover {
    background-color: lightgrey;
  }

  & #task_name {
    margin-right: auto;
    font-weight: lighter;
    text-decoration: ${(props) => (props.status ? "line-through" : "none")};
  }

  & #tick {
    font-size: 2rem;
    font-weight: 100;
    margin: 4px;
    margin-left: auto;
    display: ${(props) => (props.status ? "block" : "none")};
  }
`;

const Div = styled.div`
  width: calc(100% - 12px);
  min-width: 18rem;
  max-width: 30rem;
  position: absolute;
  border: 2px solid #848484;
  box-shadow: 0 0 12px #2772db;
  background-color: #e0e0e0;
  border-radius: 4px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 200ms ease-in-out;

  & > h2 {
    width: 100%;
    padding: 4px 0;
    text-align: center;
  }

  & #modal_dismiss_icon {
    position: absolute;
    top: 6px;
    right: 6px;
    cursor: pointer;
  }

  display: ${(props) => (props.status ? "block" : "none")};
`;
