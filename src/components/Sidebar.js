import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../contexts/globalContext';
import { CLOSE_SIDEBAR } from '../utils/actions';

const Sidebar = () => {
  const { sidebar, dispatch } = useGlobalContext();
  return (
    <Wrapper
      style={{
        transform: `${
          sidebar === true ? 'translateX(0)' : 'translateX(-100%)'
        }`,
      }}
    >
      <div className='inside-sidebar'>
        Sidebar
        <button onClick={() => dispatch({ type: CLOSE_SIDEBAR })}>close</button>
      </div>
      <div
        className='outside-sidebar'
        onClick={() => dispatch({ type: CLOSE_SIDEBAR })}
      ></div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: transform 0.1s ease-in;
  z-index: 500;
  display: none;

  .inside-sidebar {
    background-color: red;
    width: 60%;
    height: 100%;
    position: absolute;
    left: 0;
  }

  .outside-sidebar {
    background: var(--transparentbackground);
    width: 40%;
    height: 100%;
    position: absolute;
    right: 0;
  }

  @media (max-width: 700px) {
    display: block;
  }
`;

export default Sidebar;
