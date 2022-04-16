import styled from "@emotion/styled";
import { useSideBar } from "../global/states";
import Newproject from "./form";
import { ImCross } from "react-icons/im";

export default function Sidebar() {
  let { barStatus, setBarStatus } = useSideBar();

  return (
    <>
      <Wrapper barStatus={barStatus}>
        <ImCross id="dismiss_icon" onClick={setBarStatus} />
        <Newproject />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100%;
  width: 50%;
  min-width: 18rem;
  max-width: 30rem;
  background-color: #e0e0e0;
  box-shadow: 0 0 12px #2772db;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all 500ms ease-in;

  & #dismiss_icon {
    position: absolute;
    top: 6px;
    left: 6px;
    font-size: 1.2rem;
  }

  display: ${(props) => (props.barStatus ? "block" : "none")};
`;
