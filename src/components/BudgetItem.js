import React from "react";

import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { Form, Link } from "react-router-dom";

import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";

const BudgetItem = ({ budget, showDelete = false }) => {
  const { id, name, amount, color } = budget;
  const spent = calculateSpentByBudget(id);
  return (
    <div className="budget" style={{ "--accent": color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Сума</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} потрошено</small>
        <small>{formatCurrency(amount - spent)} преостанато</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form method="post" action="delete" onSubmit={(e)=>{
            if(!window.confirm("Дали сте сигурни да избришите буџет")){
              e.preventDefault()
            }}}>
              <button type="submit" className="btn"><span>Избриши Буџет</span><TrashIcon width={20}/> </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>Погледни Детали</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default BudgetItem;
