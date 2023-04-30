export const saveItems = (items) => {
    let json = JSON.stringify(items);
    localStorage.setItem('items', json);
  };