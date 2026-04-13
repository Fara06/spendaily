import { Suspense } from "react";
import AddTransactionPage from "../_components/addTransaction";

export default function Page() {
  return (
    <Suspense>
      <AddTransactionPage />
    </Suspense>
  );
}