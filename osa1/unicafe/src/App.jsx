import { useState } from 'react';

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Button = ({ text, cb }) => {
  return <button onClick={cb}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = all != 0 ? (good - bad) / all : 0;
  const positive = all != 0 ? `${(good / all) * 100} %` : 0;
  const isFeedbackGiven = all > 0;

  return (
    <>
      <h1>Statistics</h1>
      {isFeedbackGiven ? (
        <table>
          <tbody>
            <StatisticLine text='good' value={good} />
            <StatisticLine text='neutral' value={neutral} />
            <StatisticLine text='bad' value={bad} />
            <StatisticLine text='all' value={all} />
            <StatisticLine text='average' value={average} />
            <StatisticLine text='positive' value={positive} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const buttons = [
    {
      text: 'good',
      cb: () => {
        console.log('setGood was called');
        setGood((prevGood) => (prevGood += 1));
      },
    },
    {
      text: 'neutral',
      cb: () => {
        console.log('setNeutral was called');
        setNeutral((prevNeutral) => (prevNeutral += 1));
      },
    },
    {
      text: 'bad',
      cb: () => {
        console.log('setBad was called');
        setBad((prevBad) => (prevBad += 1));
      },
    },
  ];

  return (
    <div>
      <Header title='give feedback' />
      {buttons.map((btn, index) => (
        <Button key={index} text={btn.text} cb={btn.cb} />
      ))}
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
