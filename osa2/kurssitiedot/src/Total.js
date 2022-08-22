const Total = ({ parts }) => {
  const totalExercises = parts.reduce((acc, curr) => {
    return acc + curr.exercises;
  }, 0);
  return <p><strong>Total of exercises {totalExercises}</strong></p>;
};

export default Total;
