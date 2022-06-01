import { FormHandles, SubmitHandler } from "@unform/core";
import { useEffect, useRef, useState } from "react";
import { FiCheckSquare } from "react-icons/fi";
import ReactModal from "react-modal";
import { useModalEdit } from "../../hooks/useEditFoodModal";
import { useFoods } from "../../hooks/useFoods";
import * as S from "./styles";

export const ModalEditFood = () => {
  const { isModalOpenEdit, handleOpenOrCloseModalEdit, idFoodOpen } =
    useModalEdit();

  const { handleEditFood, handleFindFood } = useFoods();

  const formRef = useRef<FormHandles>(null);

  const [urlImage, setUrlImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function loadFood() {
      const response = await handleFindFood(idFoodOpen);

      setUrlImage(response?.image);
      setTitle(response?.name);
      setPrice(response?.price);
      setDescription(response?.description);
    }

    loadFood();
  }, [idFoodOpen]);

  const handleSubmit: SubmitHandler<FormData> = () => {
    const newPlate = {
      id: idFoodOpen,
      name: title,
      description: description,
      price: price,
      image: urlImage,
    };

    handleEditFood(newPlate);
    handleOpenOrCloseModalEdit(idFoodOpen);
  };

  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={() => handleOpenOrCloseModalEdit(idFoodOpen)}
      isOpen={isModalOpenEdit}
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
        <h1>{"Editar Prato"}</h1>
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
          data-testid="edit-food-button"
          onClick={() => handleSubmit}
        >
          <p className="text">{"Editar Prato"}</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </S.Form>
    </ReactModal>
  );
};
