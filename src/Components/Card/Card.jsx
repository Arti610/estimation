

import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Card = ({ title, count, path, icon, svg2 }) => {
  const cardStyle = {
    // Yahan 0.5 opacity ke liye 0.5 value hai.
    backgroundImage: `url(${svg2})`,
  };
 
  return (
    <div className="card-data-container" style={cardStyle}>
      <Link to={path} className="card-link">
        <div className="card-content">
          <span>
            {icon}
          </span>
          {/* <img src={pic} alt={title} className="card-image" /> */}
          {/* <h3 className="card-title">{title}</h3> */}
          <p className="card-title">{title}</p>
        </div>
        <div className="card-count">
          <span>{count}</span>
        </div>
      </Link>

    </div>
    // <div className='card-data-container' >
    //   <Link to={path}>
    //     <div className='card-content'>
    //       <span>
    //         {icon}
    //       </span>

    //       <div className="card-count">
    //         <span>{count}</span>
    //       </div>
    //       <p className="card-title">{title}</p>

    //     </div>
    //   </Link>

    // </div>
  );
};

export default Card;
