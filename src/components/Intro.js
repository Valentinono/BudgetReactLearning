import React from "react";

import { Form } from "react-router-dom";

//library
import { UserPlusIcon } from "@heroicons/react/24/solid";

//assets
import illustratin from "../assets/illustration.jpg";

 const Intro = () => {
  return (
    <div className="intro">
      <div>
        <h1>
          Имај Контрола<span className="accent"> на своите Пари</span>
        </h1>
        <p>
          Личното Буџетирње е тајната на финансиската слобода. Почни сега.
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="Твоето Име"
            aria-label="Your Name"
            autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser"/>
          <button type="submit" className="btn btn--dark">
            <span>Креирај Акаунт</span>
            <UserPlusIcon width={20} />
          </button>
        </Form>
      </div>
      <img src={illustratin} alt="person with mony" width={600} />
    </div>
  );
};
export default Intro;
