import styled from "@emotion/styled";
import { useDB } from "../global/states";

export default function Overview() {
  let { projects } = useDB();

  if (!projects) {
    return null;
  }

  let totalProjects = projects.length;
  let completedProject = 0;
  let inprogressProject = 0;
  let pendingProject = 0;

  projects.forEach((project) => {
    let completed = project.tasks.every(
      (task) => task.complete_status === true
    );

    if (!completed) {
      let inprogress = project.tasks.some(
        (task) => task.complete_status === true
      );
      if (inprogress) {
        inprogressProject++;
      } else {
        pendingProject++;
      }
    } else {
      completedProject++;
    }
  });

  return (
    <>
      <Div>
        <div>
          <h2>Projects</h2>
          <h2 id="integer">{totalProjects}</h2>
          <Projects>
            <div>
              <h3>Completed</h3>
              <h3 id="integer">{completedProject}</h3>
            </div>
            <div>
              <h3>In Progress</h3>
              <h3 id="integer">{inprogressProject}</h3>
            </div>
            <div>
              <h3>Pending</h3>
              <h3 id="integer">{pendingProject}</h3>
            </div>
          </Projects>
        </div>
      </Div>
    </>
  );
}

const Projects = styled.div`
  width: 100%;
  border-top: 1px solid #2772db;

  & > div {
    display: flex;
    padding: 4px 8px;

    & #integer {
      margin-left: auto;
    }
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & > div {
    display: flex;
    border: 1px solid #2772db;
    margin-bottom: 4px;
    flex-wrap: wrap;
    align-items: center;
    padding: 4px;

    & #integer {
      margin-left: auto;
    }
  }
`;
