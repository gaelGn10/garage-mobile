export const payRepair = (carId: number, amount: number) => {
  console.log("Paiement effectué :", carId, amount);
  return Promise.resolve({ status: "PAID" });
};
