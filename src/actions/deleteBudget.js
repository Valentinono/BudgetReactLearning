import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export function deleteBudget({params}){
try{
    deleteItem({
        key:"budgets",
        id:params.id,
    });
    const associatedExpenses=getAllMatchingItems({
        category:"expenses",
        key:"budgetId",
        value:params.id,
    })
    associatedExpenses.forEach((expense)=>{
        deleteItem({
            key:"expenses",
            id:expense.id,
        });
    });
    toast.success("Буџетот е избришан успешно");
}catch(e){
    throw new Error("Имаше Проблем при бришење на вашиот буџет")
}
return redirect("/")
}