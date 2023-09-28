import React, { useState } from "react";

import Square from "./Square";
import calculateWinner from "../helpers/calculateWinner";

export default function Board() {
  const [grid, setGrid] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const [message, setMessage] = useState("");
  const [isXNext, setIsXNext] = useState(true);
  const [foundWinner, setFoundWinner] = useState(false);

  const currentGrid=grid[currentMove];

//   console.log(`Final grid: ${grid.length} ${grid}`);
//   console.log(`${currentGrid.length} ${currentGrid}`);

  const onClickSquareHandle = (index) => {
    if (calculateWinner(currentGrid)) {
      setMessage("We already found winner");
      return;
    }
    setMessage("");
    console.log("nana"+currentGrid.length);
    if (currentGrid[index]) {
      setMessage("This cell has been occupied, please choose the other cell");
      return;
    }
    const newGrid = currentGrid.slice();
    // console.log('newGrid' + newGrid.length);

    if (isXNext) {
      newGrid[index] = "X";
      setIsXNext(false);
    } else {
      newGrid[index] = "O";
      setIsXNext(true);
    }

    let newTotalGrid=[...grid.slice(0,currentMove+1),newGrid];
    // console.log('now total grid'+newTotalGrid.length+newTotalGrid);
    setGrid(newTotalGrid);
    const nextMove=currentMove+1;
    // console.log(nextMove);
    setCurrentMove(nextMove);

    if(calculateWinner(newGrid)){
        setFoundWinner(true);
      }
  };

  let turn = "";
  if (!foundWinner) {
 
    if (isXNext) {
      turn = "This is X turn";
    } else {
      turn = "This is O turn";
    }
  }
  else{
    if(isXNext){
        turn="O has become the winner";
    }
    else{
        turn='X has become the winner';
    }
  }

  const info=grid.map((item,index)=>{
    let content="";
    if(!index){
        content="Go to start game";
    }
    else{
        content=`Go to move ${index}`;
    }
    return(
        <li key="index">
            <button onClick={()=>setCurrentMove(index)}>{content}</button>
        </li>
    );
  })

  return (
    <React.Fragment>
      <div className="turn">
        <h3>{turn}</h3>
      </div>
      <div className="message">
        <h2>{message}</h2>
      </div>
      <div className="board-row">
        <Square
          value={currentGrid[0]}
          onClickSquare={() => onClickSquareHandle(0)}
        ></Square>
        <Square
          value={currentGrid[1]}
          onClickSquare={() => onClickSquareHandle(1)}
        ></Square>
        <Square
          value={currentGrid[2]}
          onClickSquare={() => onClickSquareHandle(2)}
        ></Square>
      </div>

      <div className="board-row">
        <Square
          value={currentGrid[3]}
          onClickSquare={() => onClickSquareHandle(3)}
        ></Square>
        <Square
          value={currentGrid[4]}
          onClickSquare={() => onClickSquareHandle(4)}
        ></Square>
        <Square
          value={currentGrid[5]}
          onClickSquare={() => onClickSquareHandle(5)}
        ></Square>
      </div>

      <div className="board-row">
        <Square
          value={currentGrid[6]}
          onClickSquare={() => onClickSquareHandle(6)}
        ></Square>
        <Square
          value={currentGrid[7]}
          onClickSquare={() => onClickSquareHandle(7)}
        ></Square>
        <Square
          value={currentGrid[8]}
          onClickSquare={() => onClickSquareHandle(8)}
        ></Square>
      </div>

      <div class="list-info">
        <h4>
            <ul>
                {info}
            </ul>
        </h4>
      </div>
    </React.Fragment>
  );
}
