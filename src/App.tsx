import React from 'react'
import FamilyTree from './FamilyTree'
import data from './data'
import './App.css'

const App = () => {
  return (
    <div className="App">
      <FamilyTree data={data} />
    </div>
  )
}

export default App
