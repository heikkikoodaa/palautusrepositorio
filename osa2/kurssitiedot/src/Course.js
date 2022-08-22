import Header from './Header';
import Content from './Content';

const Course = ({ course }) => {
  const courseData = course.map((course) => {
    return (
      <div key={course.id}>
        <Header courseName={course.name} />
        <Content key={course.id} course={course.parts} />
      </div>
    );
  });
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courseData}
    </div>
  );
};

export default Course;
