import { useContext, useState } from 'react';
import { createContext } from 'react';

const TodoContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [isOpenPopup, setOpenPopup] = useState(false);
  const showPopup = () => setOpenPopup(true);
  const hidePopup = () => setOpenPopup(false);

  return (
    <TodoContext.Provider value={{ isOpenPopup, showPopup, hidePopup }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
