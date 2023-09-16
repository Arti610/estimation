// import React from 'react'
// import { Link } from 'react-router-dom'
// import './Card.css'

// const Card = ({path, pic, title, count}) => {
//   return (
//    <>
//      <div className='card-data-container'>
//        <Link to={path}>
//         <div>
//         <img src={pic}/>
//         <span>{title}</span>
//         </div>
//         <div >
//             <span>{count}</span>
//         </div>
//        </Link>
//     </div>
//    </>
//   )
// }

// export default Card


import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ path, pic, title, count, svg2}) => {
  const cardStyle = {
    backgroundImage: `url(${svg2})`,
    
  };
  return (
    <div className="card-data-container"  style={cardStyle}>
      <Link to={path} className="card-link">
        <div className="card-content">
          <img src={pic} alt={title} className="card-image" />
          <h3 className="card-title">{title}</h3>
        </div>
        <div className="card-count">
          <span>{count}</span>
        </div>
      </Link>
     
    </div>
  );
};

export default Card;
