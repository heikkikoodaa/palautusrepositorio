import Part from './Part';
import Total from './Total';

const Content = ({ course }) => {
  const partData = course.map((part) => (
    <Part key={part.id} exercise={part.name} amount={part.exercises} />
  ));

  return (
    <div>
      {partData}
      <Total parts={course} />
    </div>
  );
};

export default Content;
