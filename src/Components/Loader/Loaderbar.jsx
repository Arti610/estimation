import React from 'react'
import Loader from 'react-js-loader'
const Loaderbar = () => {
    return (
        <div className="App">
        <div className={"row"}>
            <div className={"item"}>
                <Loader type="box-rotate-x" bgColor={"#FFFFFF"} title={"box-rotate-x"} color={'red'} size={100} />
        
            <div className={"item"}>
                <Loader type="box-rotate-y" bgColor={"#FFFFFF"} title={"box-rotate-y"} color={'#black'} size={100} />
            </div>
            <div className={"item"}>
                <Loader type="box-rotate-z" bgColor={"#FFFFFF"} title={"box-rotate-z"} color={'#black'} size={100} />
            </div>
            <div className={"item"}>
                <Loader type="box-up" bgColor={"#FFFFFF"} title={"box-up"} color={'#black'} size={100} />
            </div>
        </div>
         </div> 
          
        </div>
    );
}

export default Loaderbar