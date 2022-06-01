import { FiPlusSquare } from "react-icons/fi";
import Logo from "../../assets/logo.svg";
import { useModalOpen } from "../../hooks/useAddFoodModal";
import * as S from "./styles";


export const Header = () => {
  const { handleOpenOrCloseModalAdd } = useModalOpen();

  return (
    <S.Container>
      <header>
        <img src={Logo} alt="GoRestaurant" />
        <nav>
          <div>
            <button type="button" onClick={handleOpenOrCloseModalAdd}>
              <div className="text">Novo Prato</div>
              <div className="icon">
                <FiPlusSquare size={24} />
              </div>
            </button>
          </div>
        </nav>
      </header>
    </S.Container>
  );
};
