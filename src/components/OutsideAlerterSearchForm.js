import React, { useEffect, useRef } from 'react';
import { useProductsContext } from '../contexts/productsContext';
import { EMPTY_SEARCH_TERM } from '../utils/actions';

export default function OutsideAlerterSearchForm(props) {
  const { dispatch } = useProductsContext();

  function useOutsideAlerterSearchForm(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          if (event.target.id !== 'search') {
            if (event.target.id !== 'item') {
              dispatch({ type: EMPTY_SEARCH_TERM });
            }
          }
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
  useOutsideAlerterSearchForm(wrapperRef);

  return <div ref={wrapperRef}>{props.children}</div>;
}
