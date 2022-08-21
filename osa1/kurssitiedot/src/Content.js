import Part from './Part';

const Content = ({ parts }) => {
  const partData = parts.map((part) => (
    <Part key={part.name} exercise={part.name} amount={part.exercises} />
  ));

  return <div>{partData}</div>;
};

export default Content;
