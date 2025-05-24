import noteService from './services/notes.js'

const RenderPersons = ({persons,newSearch,setPersons,setErrorMessage}) => {
console.log('HERE')
return (
      <ul>
        {persons.filter((person) => person.name
        .toLowerCase()
        .includes(newSearch.toLowerCase()))
        .map(person => 
          <Note key={person.id} note={person}  setPersons={setPersons} setErrorMessage={setErrorMessage} persons={persons} />
        )} 
      </ul>
      )
}


const Note = ({ note, setPersons, setErrorMessage, persons }) => {
  const deleteName = (event) => {
    event.preventDefault()
    const confirmed = window.confirm(`Delete ${note.name} ? `)
    if (confirmed){
      noteService
      .delate(note.id)
      .then(returnedNote => {
      setErrorMessage(`${note.name} deleted!`)
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
      setPersons(persons.filter(person => person.id !== note.id))
      })
    }
  }

  return (
    <form onSubmit={deleteName}>  
    <li>
     {note.name} {note.number}
    <button type="submit">delete</button>
    </li>
    </form>
  )
}

export default RenderPersons