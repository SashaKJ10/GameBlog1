export const loadStateFromStorage = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      return JSON.parse(serializedState);
    } catch (error) {
      return undefined;
    }
  };