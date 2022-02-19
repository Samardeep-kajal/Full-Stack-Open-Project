import { useState } from "react";

const Heading = (props) => <h1>{props.text}</h1>;
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>
        {text} {value}
      </td>
    </tr>
  );
};

const Statistics = ({ clicks }) => {
  const total = clicks.good + clicks.neutral + clicks.bad;
  const average = (clicks.good * 1 + clicks.bad * -1) / total;
  const positive = clicks.good * (100 / total);
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={clicks.good} />
          <StatisticLine text="neutral" value={clicks.neutral} />
          <StatisticLine text="bad" value={clicks.bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive + "%"} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });

  const goodPress = () => {
    setClicks({ ...clicks, good: clicks.good + 1 });
  };
  const badPress = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1 });
  };
  const neutralPress = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1 });
  };

  if (clicks.good === 0 && clicks.bad === 0 && clicks.neutral === 0) {
    return (
      <div>
        <Heading text="Give feedback" />
        <Button text="good" onClick={goodPress}>
          good
        </Button>
        <Button text="neutral" onClick={neutralPress}>
          neutral
        </Button>
        <Button text="bad" onClick={badPress}>
          bad
        </Button>
        <Heading text="Statistics" />
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <div>
      <Heading text="Give feedback" />
      <Button text="good" onClick={goodPress}>
        good
      </Button>
      <Button text="neutral" onClick={neutralPress}>
        neutral
      </Button>
      <Button text="bad" onClick={badPress}>
        bad
      </Button>
      <Heading text="Statistics" />
      <Statistics clicks={clicks} />
      <table>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default App;
