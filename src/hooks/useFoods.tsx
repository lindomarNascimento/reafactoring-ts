import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../services/api";

interface FoodsProviderProps {
  children: ReactNode;
}

interface FoodProps {
  id: number;
  name: string;
  description: string;
  price: number;
  available: boolean;
  image: string;
}

type NewFoodProps = Omit<FoodProps, "id" | "available">;
type EditFoodProps = Omit<FoodProps, "available">;

interface FoodsProps {
  foods: Array<FoodProps>;
  handleNewFood: (props: NewFoodProps) => void;
  handleEditFood: (props: EditFoodProps) => void;
  handleDeleteFood: (id: number) => void;
  toggleAvailable: (id: number) => void;
  request: () => void;
  handleFindFood: (id: number) => Promise<FoodProps>;
}

const ContextFoods = createContext<FoodsProps>({} as FoodsProps);

export function useFoods() {
  const context = useContext(ContextFoods);

  return context;
}

export const FoodsProvider = ({ children }: FoodsProviderProps) => {
  const [foods, setFoods] = useState<Array<FoodProps>>([]);

  const context = useFoods();

  const request = useCallback(async () => {
    const response = await api.get("/foods");

    setFoods(response.data);
  }, [context.foods]);

  async function handleNewFood(props: NewFoodProps) {
    const res = await api.post("/foods", {
      ...props,
      available: true,
      id: foods.length + 1,
    });

    if (res.statusText === "Created") {
      return request();
    }
  }

  async function toggleAvailable(id: number) {
    const foodFiltered = foods.filter((food) => food.id === id);

    const res = await api.put(`/foods/${id}`, {
      ...foodFiltered[0],
      available: !foodFiltered[0].available,
    });

    if (res.statusText === "OK") {
      return request();
    }
  }

  async function handleEditFood(props: EditFoodProps) {
    const foodFiltered = foods.filter((food) => food.id === props.id);

    const editFood = {
      ...props,
      available: foodFiltered[0].available,
    };

    const res = await api.put(`/foods/${props.id}`, {
      ...editFood,
    });

    if (res.statusText === "OK") {
      return request();
    }
  }

  async function handleDeleteFood(id: number) {
    const res = await api.delete(`/foods/${id}`);

    if (res.statusText === "OK") {
      return request();
    }
  }

  async function handleFindFood(id: number) {
    const res = foods.find((food) => food.id === id);
    return res as FoodProps;
  }
  return (
    <ContextFoods.Provider
      value={{
        foods,
        toggleAvailable,
        handleNewFood,
        handleEditFood,
        handleDeleteFood,
        request,
        handleFindFood,
      }}
    >
      {children}
    </ContextFoods.Provider>
  );
};
