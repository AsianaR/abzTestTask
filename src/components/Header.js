import React from "react";
import "../styles/Header.sass";

const Header = () => {
  return (
    <header className="header">
      <div className="container__header">
        <div className="headline">
          <h1>Test assignment for front-end developer</h1>
          <p>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <a href="#signUp">
            <button className="button">Sign up</button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
