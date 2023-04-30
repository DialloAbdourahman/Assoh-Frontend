import React, { useEffect, useRef } from 'react';

export default function OutsideAlerterAccountInfo(props) {
  function useOutsideAlerterAccountInfo(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          props.setShowAccountInfo(false);
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerterAccountInfo(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}
