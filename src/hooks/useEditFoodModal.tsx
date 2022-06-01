import { createContext, ReactNode, useContext, useState } from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextData {
  isModalOpenEdit: boolean;
  handleOpenOrCloseModalEdit: (id: number) => void;
  idFoodOpen: number;
}

const OpenModalContext = createContext<ModalContextData>(
  {} as ModalContextData
);

export const ModalProviderEditFood = ({ children }: ModalProviderProps) => {
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [idFoodOpen, setIdFoodOpen] = useState(0);

  function handleOpenOrCloseModalEdit(id: number) {
    setIsModalOpenEdit(!isModalOpenEdit);

    setIdFoodOpen(id);
  }

  return (
    <OpenModalContext.Provider
      value={{ isModalOpenEdit, handleOpenOrCloseModalEdit, idFoodOpen }}
    >
      {children}
    </OpenModalContext.Provider>
  );
};

export function useModalEdit() {
  const context = useContext(OpenModalContext);

  return context;
}
