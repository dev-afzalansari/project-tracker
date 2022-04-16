import styled from "@emotion/styled";
import { useEffect } from "react";
import { useDB, useUpdateModal } from "../global/states";
import { GrDocumentUpdate } from "react-icons/gr";
import { MdDeleteOutline } from "react-icons/md";

export default function Projects() {
  let { projects, setProjects } = useDB();

  useEffect(function () {
    setProjects();
  }, [setProjects]);

  if (projects !== null && projects.length === 0) {
    return <NoProjects>No Projects</NoProjects>;
  }

  return (
    <>
      {projects ? (
        <Wrapper>
          {projects.map((project, ind) => {
            return <Project key={ind} project={project} />;
          })}
        </Wrapper>
      ) : (
        <Loading>Loading...</Loading>
      )}
    </>
  );
}

function Project(props) {
  let { project } = props;

  let { openModal, setProjectName } = useUpdateModal();
  let { setProjects } = useDB();

  // calculating progress of project
  let completed = project.tasks.filter((task) => task.complete_status === true);
  let progress = (completed.length / project.tasks.length) * 100;

  // calculating status of project
  let status;
  let every = project.tasks.every((task) => task.complete_status === true);
  if (!every) {
    let some = project.tasks.some((task) => task.complete_status === true);
    if (!some) {
      status = "Pending";
    } else {
      status = "InProgress";
    }
  } else {
    status = "Completed";
  }

  function handleUpdateClick(ev) {
    let data_project = ev.target.getAttribute("data-project");
    setProjectName(data_project);
    openModal();
  }

  async function handleDelete(ev) {
    let data_project = ev.target.getAttribute("data-project");

    await fetch("/api/deleteproject", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        project_name: data_project,
      }),
    });
    setProjects();
  }

  return (
    <>
      <Div>
        <div className="project_card_header">
          <h2>{project.project_name}</h2>
          <Status status={status}>{status}</Status>
        </div>
        <div className="project_progress">
          <ProgressBar progress={progress}>
            <div id="progress"></div>
          </ProgressBar>
          <strong>{progress.toFixed(0)}%</strong>
          <div className="buttons">
            <MdDeleteOutline
              className="delete_project"
              onClick={handleDelete}
              data-project={project.project_name}
            />
            <GrDocumentUpdate
              className="update_project"
              onClick={handleUpdateClick}
              data-project={project.project_name}
            />
          </div>
        </div>
      </Div>
    </>
  );
}

const Loading = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 2rem;
`

const Status = styled.small`
  color: ${(props) =>
    props.status === "Pending"
      ? "red"
      : props.status === "InProgress"
      ? "blue"
      : "green"};
`;

const NoProjects = styled.h1`
  width: 100%;
  margin-top: 2rem;
  text-align: center;
`;

const ProgressBar = styled.div`
  width: 80%;
  height: 1rem;
  border-radius: 1rem;
  border: 1px solid #2772db;

  & #progress {
    border-radius: 1rem;
    height: 100%;
    background-color: #2772db;
    width: ${(props) => `${props.progress}%`};
    z-index: -10;
  }
`;

const Div = styled.div`
  width: 100%;
  border: 2px solid #2772db;
  border-radius: 4px;
  border: 1px solid #2772db;
  margin-bottom: 1rem;

  & .project_card_header {
    display: flex;
    padding: 6px 12px;
  }
  & .project_card_header small {
    margin-left: auto;
    margin-right: 8px;
  }

  & .project_progress {
    width: 100%;
    padding: 4px 8px;
    margin: 6px 0;
    display: flex;
    align-items: center;

    & strong {
      margin-left: 4px;
      color: #848484;
    }

    & .buttons {
      margin-left: auto;
      margin-right: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;

      & .delete_project {
        margin: 4px;
        font-size: 1.2rem;
      }

      & .delete_project:hover {
        color: #848484;
      }
      & .update_project:hover {
        opacity: 0.7;
      }
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;
