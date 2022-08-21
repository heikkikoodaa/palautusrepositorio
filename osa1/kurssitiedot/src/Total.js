const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
