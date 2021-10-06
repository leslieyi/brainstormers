import { motion } from "framer-motion";
import { useEffect, useState, useCallback} from "react";
import {
  Button, Divider, Header, Icon,
  Input, Modal
} from "semantic-ui-react";

function Timer() {
  const timer = {
    paused: "paused",
    ticking: "ticking",
  };

  const [text, setText] = useState("");
  const [current, setCurrent] = useState("");
  const [timerState, setTimerState] = useState(timer.paused);
  const isTicking = () => timerState === timer.ticking;
  // const pause = () => setTimerState(timer.paused);
  const pause = useCallback(()=> {
    setTimerState(timer.paused)
  },[timer.paused])

  const [open, setOpen] = useState(false);
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
    setCurrent("");
  };

  useEffect(() => {
    let intervalId;

    const pauseTimer = () => clearInterval(intervalId);

    function tick() {
      setCurrent((current) => {
        if (current === 0) {
          pause();
          setCurrent(0);
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
  }, [timerState, timer.paused, timer.ticking, pause]);

  return (
    <Divider
      horiztontal="true"
      style={{
        backgroundColor: "#0353A4",
        opacity: "0.85",
      }}
    >
      <div style={{ textAlign: "center", padding: "0 0 100px 0" }}>
        <h4
          style={{
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: "bold",
            fontSize: "40px",
            display: "inline",
          }}
        >
          Drag and Drop below the line! &nbsp;
        </h4>

        <Modal
          basic
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          size="small"
          trigger={<Icon name="question circle outline" size="big" />}
        >
          <Header icon>
            <Icon name="tasks" />
            Instructions
          </Header>
          <Modal.Content>
            <p
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "30px",
              }}
            >
              1.Start the Timer
              <br />
              2.If you're familiar with the flascard,
              <br />
              Drag & Place the flashcards below the line
              <br />
              3.If you are NOT, "Star" them to review later
              <br />
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic inverted onClick={() => setOpen(false)}>
              <Icon name="window close outline" /> close
            </Button>
          </Modal.Actions>
        </Modal>

        <div>
          {current === 0 ? (
            <motion.h1
              style={{ color: "#f9b4ab" }}
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              "Time is Up!!!"
            </motion.h1>
          ) : (
            <h3>{current} seconds left</h3>
          )}
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
