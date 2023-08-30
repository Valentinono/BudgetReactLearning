//rrd
import { redirect } from "react-router-dom";
//helpers
import { deleteItem } from "../helpers";

// import { toast } from "react-toastify";

export async function logoutAction() {
  //delete user
  deleteItem({
    key: "userName",
  });
  deleteItem({
    key: "budgets",
  });
  deleteItem({
    key: "expenses",
  });
  // toast.success("Избришано");
  //return redirect
  return redirect("/");
}
