import styled from "@emotion/styled";
import Sidebar from "./components/sidebar";
import Nav from "./components/nav";
import Projects from "./components/projects";
import UpdateModal from "./components/updatemodal";
import Overview from "./components/overview";

function App() {
  return (
    <>
      <Wrapper>
        <Nav />
        <Sidebar />
        <UpdateModal />
        <Overview />
        <Projects />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 55rem;
  min-width: 18rem;
  position: relative;
  overflow: scroll;
`;

export default App;
