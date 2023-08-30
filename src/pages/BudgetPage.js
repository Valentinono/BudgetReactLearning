import React from "react";

// helpers
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

//rrd
import { useLoaderData } from "react-router-dom";


import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

import { toast } from "react-toastify";

//loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];
  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });
  if(!budget){
    throw new Error("Буџетот што го барате не постои")
  }
  return { budget , expenses};
}
//action
export async function budgetAction({request}){
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);
    if (_action === "createExpense") {
        try {
          //create expense
          createExpense({
            name: values.newExpense,
            amount: values.newExpenseAmount,
            budgetId: values.newExpenseBudget,
          });
          return toast.success(`Креирана ${values.newExpense} Потрошувачка!`);
        } catch (e) {
          throw new Error("Имаше проблем при креирање");
        }
      }
    if (_action === "deleteExpense") {
      try {
        //delete
        deleteItem({
          key: "expenses",
          id: values.expenseId,
        });
        return toast.success("Избришана потрошувачка");
      } catch (e) {
        throw new Error("Имаше проблем при бришењето");
      }
    }
  }

const BudgetPage = () => {
  const { budget ,expenses} = useLoaderData();
  return <div className="grid-lg" style={{"--accent":budget.color}}>
    <h1 className="h2">
    <span className="accent">{budget.name}</span>Преглед
    </h1>
    <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true}/>
        <AddExpenseForm budgets={[budget]} />
        {
            expenses&& expenses.length>0 &&(
                <div className="grid-md">
                    <h2>
                        <span className="accent">{budget.name}</span>Трошоци
                    </h2>
                    <Table expenses={expenses} showBudget={false}/>
                </div>
            )
        }
    </div>

    </div>;
};

export default BudgetPage;
