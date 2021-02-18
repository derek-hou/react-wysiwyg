import { useEffect } from 'react';

// Custom event hook to add a window event listener
export const useEvent = (event, handler, passive=false) => {
    useEffect(() => {
      // initiate the event handler
      window.addEventListener(event, handler, passive);
  
      // this will clean up the event every time the component is re-rendered
      return function cleanup() {
        window.removeEventListener(event, handler);
      };
    });
}