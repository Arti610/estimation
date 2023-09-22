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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Card = ({ title, count, path, icon, svg2 }) => {
  const cardStyle = {
    // Yahan 0.5 opacity ke liye 0.5 value hai.
    backgroundImage: `url(${svg2})`,
  };
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
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
