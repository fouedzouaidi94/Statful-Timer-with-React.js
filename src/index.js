import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import * as serviceWorker from "./serviceWorker";

const secondsToTime = totalSeconds => {
  const seconds = totalSeconds % 60;
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor(totalSeconds / 3600);
  return {
    seconds,
    minutes,
    hours
  };
};

const formatTime = totalSeconds => {
  const timeObject = secondsToTime(totalSeconds);
  return (
    String(timeObject.hours).padStart(2, "0") +
    ":" +
    String(timeObject.minutes).padStart(2, "0") +
    ":" +
    String(timeObject.seconds).padStart(2, "0")
  );
};

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      isStopped: true
    };
  }
  handelStart = () => {
    if (this.state.isStopped) {
      this.interval = setInterval(() => {
        this.setState({ seconds: this.state.seconds + 1, isStopped: false });
      }, 1000);
    } else {
      clearInterval(this.interval);
      this.setState({ isStopped: true });
    }
  };
  handleReset = () => {
    clearInterval(this.interval);

    this.setState({ seconds: 0, isStopped: true });
  };
  render() {
    return (
      <div className="myTimer">
        <h1>{formatTime(this.state.seconds)}</h1>
        <button onClick={this.handelStart}>start</button>
        <button onClick={this.handleReset}>rest</button>
      </div>
    );
  }
}

ReactDOM.render(<Timer />, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
