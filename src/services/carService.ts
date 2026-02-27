export interface Car {
  id: number;
  brand: string;
  model: string;
  plate: string;
  status: "WAITING" | "IN_REPAIR" | "DONE";
  interventions: string[]; // liste des interventions choisies
}

let cars: Car[] = [
  {
    id: 1,
    brand: "Toyota",
    model: "Corolla",
    plate: "1234-AB",
    status: "IN_REPAIR",
    interventions: ["Frein", "Vidange"]
  },
  {
    id: 2,
    brand: "Peugeot",
    model: "206",
    plate: "5678-CD",
    status: "DONE",
    interventions: ["Pneus"]
  },
];

const savedCars = localStorage.getItem("cars");
if (savedCars) {
  cars = JSON.parse(savedCars);
}

export const getCars = (): Promise<Car[]> => {
  return Promise.resolve([...cars]);
};

export const addCar = (car: Omit<Car, "id">): Promise<Car> => {
  const newCar: Car = { ...car, id: cars.length + 1 };
  cars.push(newCar);
  localStorage.setItem("cars", JSON.stringify(cars));
  return Promise.resolve(newCar);
};

export const getCarById = (id: number): Promise<Car | undefined> => {
  return Promise.resolve(cars.find((c) => c.id === id));
};
