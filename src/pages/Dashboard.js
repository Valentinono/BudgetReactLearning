import React from "react";
//rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";

//helper
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

//components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";

//loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");
  return { userName, budgets, expenses };
}
//action
export async function dashboardAction({ request }) {
  await waait();
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  //newUser submission
  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));
      return toast.success(`Welcome-${values.userName}`);
    } catch (e) {
      throw new Error("Имаме проблем");
    }
  }
  if (_action === "createBudget") {
    try {
      //create budget
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Креиран Буџет");
    } catch (e) {
      throw new Error("Настана проблем при креирање на вашиот буџет");
    }
  }
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
      throw new Error("Настана проблем при креирање на вашата потрошувачка");
    }
  }
  if (_action === "deleteExpense") {
    try {
      //delete expense
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Избришана Потрошувачка");
    } catch (e) {
      throw new Error("Настана проблем при бришење на вашата потрошувачка");
    }
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Добре дојде назад, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Постоечки Потрошувачки</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Последни Потрошувачки</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        Погледниги сите Потрошувачки
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Личното Буџетирње е тајната на финансиската слобода</p>
                <p>Креирај Будџет за Старт</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
