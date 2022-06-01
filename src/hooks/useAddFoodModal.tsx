import { createContext, ReactNode, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  isModalOpenAdd: boolean;
  handleOpenOrCloseModalAdd: () => void;
}

const OpenModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export const ModalProviderAddFood = ({ children }: ModalProviderProps) => {
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);

  function handleOpenOrCloseModalAdd() {
    setIsModalOpenAdd(!isModalOpenAdd);
  }

  return (
    <OpenModalContext.Provider
      value={{ isModalOpenAdd, handleOpenOrCloseModalAdd }}
    >
      {children}
    </OpenModalContext.Provider>
  );
};

export function useModalOpen() {
  const context = useContext(OpenModalContext);

  return context;
}
