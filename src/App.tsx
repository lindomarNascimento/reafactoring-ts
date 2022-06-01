import Modal from "react-modal";
import { BrowserRouter as Router } from "react-router-dom";
import { ModalProviderAddFood } from "./hooks/useAddFoodModal";
import { ModalProviderEditFood } from "./hooks/useEditFoodModal";
import { FoodsProvider } from "./hooks/useFoods";
import Routes from "./routes";
import GlobalStyle from "./styles/global";

Modal.setAppElement("#root");

const App = () => {
  return (
    <ModalProviderAddFood>
      <ModalProviderEditFood>
        <FoodsProvider>
          <GlobalStyle />
          <Router>
            <Routes />
          </Router>
        </FoodsProvider>
      </ModalProviderEditFood>
    </ModalProviderAddFood>
  );
};

export default App;
