import { FormHandles, SubmitHandler } from "@unform/core";
import { useRef, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import ReactModal from "react-modal";
import { useModalOpen } from "../../hooks/useAddFoodModal";
import { useFoods } from "../../hooks/useFoods";
import * as S from "./styles";

export const ModalAddFood = () => {
  const { isModalOpenAdd, handleOpenOrCloseModalAdd } = useModalOpen();

  const { handleNewFood } = useFoods();

  const formRef = useRef<FormHandles>(null);

  const [urlImage, setUrlImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const handleSubmit: SubmitHandler<FormData> = () => {
    const newPlate = {
      name: title,
      description: description,
      price: price,
      image: urlImage,
    };

    handleNewFood(newPlate);
    handleOpenOrCloseModalAdd();
  };

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={handleOpenOrCloseModalAdd}
      isOpen={isModalOpenAdd}
      ariaHideApp={true}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#F0F0F5",
          color: "#000000",
          borderRadius: "8px",
          width: "736px",
          border: "none",
        },
        overlay: {
          backgroundColor: "#121214e6",
        },
      }}
    >
      <S.Form ref={formRef} onSubmit={handleSubmit}>
        <h1>{"Novo Prato"}</h1>
        <S.ContainerInput>
          <input
            type="text"
            name="image"
            placeholder="Cole o link aqui"
            onChange={(e) => setUrlImage(e.target.value)}
            value={urlImage}
            defaultValue={urlImage}
          />
        </S.ContainerInput>
        <S.ContainerInput>
          <input
            type="text"
            name="title"
            placeholder="Ex: Moda Italiana"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            defaultValue={title}
          />
        </S.ContainerInput>
        <S.ContainerInput>
          <input
            type="text"
            name="price"
            placeholder="Ex: 19.90"
            onChange={(e) => setPrice(Number(e.target.value))}
            value={price}
            defaultValue={price}
          />
        </S.ContainerInput>
        <S.ContainerInput>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            defaultValue={description}
          />
        </S.ContainerInput>

        <button
          type="submit"
          data-testid="add-food-button"
          onClick={() => handleSubmit}
        >
          <p className="text">{"Adicionar Prato"}</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </S.Form>
    </ReactModal>
  );
};
