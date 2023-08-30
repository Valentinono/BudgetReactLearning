import React from "react";

//helper
import { fetchData } from "../helpers";

//assets
import wave from "../assets/wave.svg";

//rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// components
import Nav from "../components/Nav";

//loader
export function mainLoader() {
  const userName = fetchData("userName");
  return { userName };
}

const Main = () => {
  const { userName } = useLoaderData();
  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>

      <img src={wave} alt="" />
    </div>
  );
};

export default Main;
