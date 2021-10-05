import { useState, useEffect } from "react";
import { Button, Input, Divider } from "semantic-ui-react";

function Timer() {
  const timer = {
    paused: "paused",
    ticking: "ticking",
  };

  const [text, setText] = useState("");
  const [current, setCurrent] = useState("");
  const [timerState, setTimerState] = useState(timer.paused);
  const isTicking = () => timerState === timer.ticking;
  const pause = () => setTimerState(timer.paused);

  function handleStart() {
    if (isTicking()) {
      return;
    }
    if (!current) {
      setCurrent(Math.abs(Number(text)));
    }
    setTimerState(timer.ticking);
  }

  const handlePause = () => pause();
  const handleReset = () => {
    pause();
    setCurrent(0);
  };

  useEffect(() => {
    let intervalId;

    const pauseTimer = () => clearInterval(intervalId);

    function tick() {
      setCurrent((current) => {
        if (current === 0) {
          handleReset();
        }
        return current - 1;
      });
    }

    switch (timerState) {
      case timer.paused:
        break;
      case timer.ticking:
        intervalId = setInterval(tick, 1000);
        break;
      default:
        break;
    }

    return pauseTimer;
  }, [timerState]);

  return (
    <Divider
      horiztontal
      style={{
        backgroundColor: "#0353A4",
        opacity: "0.8",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 0 100px 0" }}>
        <h4
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "40px",
            display: "inline-block",
          }}
        >
          Put the Learned Cards Below &nbsp;&nbsp;&nbsp;&nbsp;
        </h4>

        <div>
          <h3>{current === 0 ? "Time is Up!!!" : `${current} seconds left`}</h3>
          <br />
          <Input
            placeholder="Time in seconds"
            value={text}
            type="number"
            onChange={(event) => {
              setText(event.target.value);
            }}
            disabled={isTicking()}
          />
          <Button
            style={{ verticalAlign: "right" }}
            onClick={handleStart}
            disabled={isTicking()}
          >
            Start
          </Button>
          <Button
            style={{ verticalAlign: "right" }}
            onClick={handlePause}
            disabled={!isTicking()}
          >
            Pause
          </Button>
          <Button style={{ verticalAlign: "right" }} onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </Divider>
  );
}
export default Timer;
