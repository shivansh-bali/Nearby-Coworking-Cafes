import React, { useEffect, useState } from "react";
import AnimatedNumbers from "react-animated-numbers";

function NumberAnimator(props: any) {
  const { n } = props;
  const [num, setNum] = useState(n);
  useEffect(() => {
    setNum(n);
  }, [n]);
  return (
    <div className="container">
      <AnimatedNumbers
        animateToNumber={num}
        fontStyle={{ fontSize: 40 }}
        locale="en-US"
        configs={[
          { mass: 1, tension: 220, friction: 100 },
          { mass: 1, tension: 180, friction: 130 },
          { mass: 1, tension: 280, friction: 90 },
          { mass: 1, tension: 180, friction: 135 },
          { mass: 1, tension: 260, friction: 100 },
          { mass: 1, tension: 210, friction: 180 },
        ]}
      ></AnimatedNumbers>

      {/* <AnimatedNumbers
        animateToNumber={num}
        fontStyle={{ fontSize: 32 }}
        configs={(number: number, index: number) => {
          return { mass: 1, tension: 230 * (index + 1), friction: 140 };
        }}
      ></AnimatedNumbers> */}
      {/* <div>
        <button onClick={() => setNum((state: any) => state + 31234)}>+</button>
        <button onClick={() => setNum((state: any) => state - 31234)}>-</button>
      </div> */}
    </div>
  );
}

export default NumberAnimator;
