import styled from "@emotion/styled";
import { useSideBar } from "../global/states";
import { AiOutlineFileAdd } from "react-icons/ai";

export default function Nav() {
  let { setBarStatus } = useSideBar();

  return (
    <Wrapper>
      <h1>Project Tracker</h1>
      <AiOutlineFileAdd onClick={setBarStatus} className="add_btn" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  & h1 {
    margin: 1rem;
    font-weight: bold;
    font-style: italic;
  }

  & .add_btn {
    margin: 1rem;
    font-size: 1.5rem;
    margin-left: auto;
  }

  & .add_btn:hover {
    opacity: 0.7;
  }
`;
