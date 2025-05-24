const Course = ({course}) => {

return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total course = {course} /> 
    </div>
    )
}

const Content = (props) => {

/*console.log(props.parts[0])*/
return(
<div>
    {props.parts.map(partt => 
          <Part key={partt.id} part = {partt}/>
    )}
</div>
)
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({course}) => { 

const total = course.parts.reduce((s, p) => {
  return s + p.exercises
}, 0)

return (
<p><b>Total of {total} exercises </b></p>
)
}

const Header = (props) => <h1>{props.course}</h1>


export default Course