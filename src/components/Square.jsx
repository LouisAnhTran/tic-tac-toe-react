import React from "react";


export default function Square({value,onClickSquare}){
    return(
        <React.Fragment>
            <button className="square" onClick={onClickSquare}>{value}</button>
        </React.Fragment>
    );
}