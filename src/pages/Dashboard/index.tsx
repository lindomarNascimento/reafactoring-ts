import { useEffect } from "react";
import { Food, ModalAddFood, ModalEditFood } from "../../components";
import { Header } from "../../components/Header";
import { useFoods } from "../../hooks/useFoods";
import * as S from "./styles";

export const Dashboard = () => {
  const { foods, request } = useFoods();

  useEffect(() => {
    request();
  }, []);

  return (
    <>
      <Header />
      <ModalAddFood />
      <ModalEditFood />
      <S.FoodsContainer data-testid="foods-list">
        {foods && foods.map((food) => <Food {...food} />)}
      </S.FoodsContainer>
    </>
  );
};
