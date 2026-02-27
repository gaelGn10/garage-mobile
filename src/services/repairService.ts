export interface Repair {
    id: number;
    name: string;
    status: "PENDING" | "IN_PROGRESS" | "DONE";
    progress: number; // %
}

import { getCarById } from "./carService";

export const getRepairsByCar = async (carId: number): Promise<Repair[]> => {
    const car = await getCarById(carId);

    if (!car) {
        return [];
    }

    // Si on a des interventions définies, on s'en sert pour générer les réparations
    return car.interventions.map((intervention, index) => ({
        id: index + 1,
        name: intervention,
        status: car.status === "DONE" ? "DONE" : "PENDING",
        progress: car.status === "DONE" ? 100 : 0
    }));
};
