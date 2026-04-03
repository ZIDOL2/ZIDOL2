import { useState } from "react";

const Counter = () => {
  const [cnt, setCnt] = useState(0);
  const handleRefresh = () =>{
    window.location.reload();
  }
  return (
    <div>
      <h1>{cnt}</h1>
      <button onClick={() => {
        setCnt(cnt+1)
      }}>+</button>
      <button onClick={handleRefresh}>RE</button>
    </div>
  );
}

export default Counter;