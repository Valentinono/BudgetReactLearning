import React from "react";

import { Link, useNavigate, useRouteError } from "react-router-dom";

// library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

const Error = () => {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <div className="error">
      <h1>Имаме Проблем</h1>
      <p>{error.message || error.statusText}</p>
      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <ArrowUturnLeftIcon width={20} />
          <span>Вратисе Назад</span>
        </button>
        <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Оди Дома</span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
