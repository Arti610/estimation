

import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';


const Card = (props) => {
  return (
    <div className="registrationCard">
      <Link to={props.url}>
        <div>
          {/* <img src={<PiUsersFourBold />} alt="" /> */}
          <p>{props.icon}</p>
          <span>{props.text}</span>
        </div>
        <div>
          <span>{props.count}</span>
        </div>
      </Link>
    </div>

  );
};

export default Card;
