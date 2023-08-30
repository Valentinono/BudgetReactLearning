import React from "react";

//rrd
import { useLoaderData } from "react-router-dom";

// helpers
import { deleteItem, fetchData } from "../helpers";

import Table from "../components/Table";

import { toast } from "react-toastify";
//loader
export function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}
//action
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);
  if (_action === "deleteExpense") {
    try {
      //delete
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Избришана Потрошувачка");
    } catch (e) {
      throw new Error("Имаше проблем при бришење");
    }
  }
}

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>Сите Потрошувачки</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Последни потрошувчки<small>({expenses.length}) заедно</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>Нема потрошувачка</p>
      )}
    </div>
  );
};

export default ExpensesPage;

