const Part = ({ part, exercises }) => (
  <p>
    {part} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {parts.map((part, i) => (
      <Part key={i} part={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Course = ({ courses }) => (
  <div>
    {courses.map((course) => (
      <div key={course.id}>
        <Subhead course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    ))}
  </div>
);
const Subhead = ({ course }) => <h2>{course}</h2>;
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <b>
      <p>Total of exercises {total}</p>
    </b>
  );
};

export default Course;
