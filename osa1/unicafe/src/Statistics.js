import StatisticLine from './StatisticLine';

const Statistics = ({ reviews }) => {
  const { good, neutral, bad } = reviews;
  const total = good + neutral + bad;
  const average = (good + bad * -1 + neutral * 0) / (good + neutral + bad) || 0;
  const positive = (good / (good + neutral + bad)) * 100 || 0;
  return (
    <div>
      <h2>statistics</h2>
      {total ? (
        <table>
          <tbody>
            <tr>
              <StatisticLine text="good" value={good} />
            </tr>
            <tr>
              <StatisticLine text="neutral" value={neutral} />
            </tr>
            <tr>
              <StatisticLine text="bad" value={bad} />
            </tr>
            <tr>
              <StatisticLine text="all" value={total} />
            </tr>
            <tr>
              <StatisticLine text="average" value={average} />
            </tr>
            <tr>
              <StatisticLine text="positive" value={positive} />
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default Statistics;
