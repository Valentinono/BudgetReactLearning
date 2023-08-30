//rrd imports
import { Form, NavLink } from "react-router-dom";

//library
import { TrashIcon } from '@heroicons/react/24/solid'

// assets
import logomark from "../assets/logomark.svg";

import React from "react";
import { logoutAction } from "../actions/logout";

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go Home">
        <img src={logomark} height={30} alt="logo"/>
        <span>Дома</span>
      </NavLink>
      {userName && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!window.confirm("Избришете корисник и сите податоци")) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit" onClick={logoutAction} className="btn btn--warning">
            <span>Избриши Корисник</span>
            
            <TrashIcon width={20}/>
            
          </button>
        </Form>
      )}
    </nav>
  );
};

export default Nav;
