import { useState, useEffect } from 'react'
import Filter from './filter.jsx'
import PersonForm from './PersonForm.jsx'
import RenderPersons from './RenderPersons.jsx'
import axios from 'axios'
import noteService from './services/notes.js'
import Notification from './notification.jsx'
import './app.css'

const App = () => {

  const [persons, setPersons] = useState([]) 

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [newSearch, setNewSearch] = useState('')

  const [errorMessage, setErrorMessage] = useState('TestMessage')

  
  const hook = () => {
  console.log('effect')
  noteService
  .getAll()
  .then(initialNotes => {
    setPersons(initialNotes)
  })
}

useEffect(hook, [])

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

const addName = (event) => {
  event.preventDefault()
  const nameObject = {
    name: newName,
    number: newNumber
  }

  if (!persons.some(person => person.name === newName) && !persons.some(person => person.number === newNumber) ){
    console.log('in the block')
    noteService
    .create(nameObject)
    .then(returnedNote => {
    setErrorMessage('New Person Added!')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

    setPersons(persons.concat(returnedNote))
    setNewName('')
    setNewNumber('')
    console.log('new person added!')

    })
  }
  else if (persons.some(person => person.name === newName)){
    const our_person = persons.find(person => person.name === newName)
    const confirmed = window.confirm(`${our_person.name} is already added to the phonebook. Replace their number?`)
    if (confirmed){
      noteService
      .putt(our_person.id, nameObject)
      .then(returnedNote => {
      setErrorMessage('Phone number changed!')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
      setPersons(persons.map(person => person.id !== our_person.id ? person : returnedNote))
      setNewName('')
      setNewNumber('')
      console.log('Number updated!')
    }
  ).catch(error => {
    setErrorMessage(`${our_person.name} has already been removed from the server!`)
    setTimeout(() => {
    setErrorMessage(null)
    }, 5000)
  })
    }
  }
  else {
    alert(`${newName} or ${newNumber} is already added to phonebook`)
  }

}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newSearch = {newSearch} handleSearchChange = {handleSearchChange}/>

      <h2>Add a new</h2>

      <PersonForm addName = {addName} handleNameChange = {handleNameChange} newName = {newName} newNumber = 
      {newNumber} handleNumberChange = {handleNumberChange}/>

      <h2>Numbers</h2>
     <RenderPersons newSearch = {newSearch} persons = {persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>

    </div>
  )
}

export default App