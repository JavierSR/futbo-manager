import { useState } from 'react'
import './App.css';

const AttributeList = ({ saveCallback, player = {} }) => {

  const attrsDivided = {
    ability: ['aerial', 'crossing', 'dribling', 'passing', 'shooting', 'tackling', 'tecniche'],
    mental: ['aggression', 'creativity', 'decisions', 'leadership', 'movement', 'positioning', 'teamwork'],
    physical: ['pace', 'stamina', 'strenght']
  }

  let attrs = {}

  attrsDivided.ability.forEach((value) => {
    attrs = {...attrs, [value]: {number: '', color: 'gray'}}
  })
  attrsDivided.mental.forEach((value) => {
    attrs = {...attrs, [value]: {number: '', color: 'gray'}}
  })
  attrsDivided.physical.forEach((value) => {
    attrs = {...attrs, [value]: {number: '', color: 'gray'}}
  })

  const [attributes, setAttributes] = useState(player.attributes || attrs)
  const [playerName, setPlayerName] = useState(player.name || '')

  const getInputColor = (value) => {
    if(value >= 15) return 'green'
    if(value >= 10) return 'blue'
    if(value >= 5) return 'yellow'
    if(value >= 0) return 'red'
    return 'gray'
  }

  const handleChange = (event) => {
    const newValue = Number(event.target.value)
    if((!newValue.isNaN) && (newValue > 0 && newValue <= 20)) {
      setAttributes({
        ...attributes, 
        [event.target.name]: {
          number: newValue,
          color: getInputColor(newValue)
        },
      })
    }
  }
  
  const savePlayer = () => {
    const storagePlayers = localStorage.getItem('chiavariPlayers')
    const players = storagePlayers ? JSON.parse(storagePlayers) : []
    localStorage.setItem('chiavariPlayers', JSON.stringify([...players, {
      name: playerName || 'Unknown player',
      attributes
    }]))

    saveCallback()
  }

  return (
    <div className='attributes-container'>
      <div className='input-container player-name'>
        <label htmlFor='name'>
          <h5>Player name: </h5>
        </label>
        <input name='name' value={playerName} onChange={(event) => {
          setPlayerName(event.target.value)
        }} />
      </div>
      <div className='columns'>
        <div>
          {attrsDivided.ability.map((value, index) => (
            <div key={index} className='input-container attribute-input'>
              <label htmlFor={value}><h6>{value.charAt(0).toUpperCase() + value.slice(1)}</h6></label>
              <input className={attributes[value].color} name={value} value={attributes[value].number} onChange={handleChange} type='number'/>
            </div>
          ))}
        </div>
        <div>
          {attrsDivided.mental.map((value, index) => (
            <div key={index} className='input-container attribute-input'>
              <label htmlFor={value}><h6>{value.charAt(0).toUpperCase() + value.slice(1)}</h6></label>
              <input className={attributes[value].color} name={value} value={attributes[value].number} onChange={handleChange} type='number'/>
            </div>
          ))}
        </div>
        <div>
          {attrsDivided.physical.map((value, index) => (
            <div key={index} className='input-container attribute-input'>
              <label htmlFor={value}><h6>{value.charAt(0).toUpperCase() + value.slice(1)}</h6></label>
              <input className={attributes[value].color} name={value} value={attributes[value].number} onChange={handleChange} type='number'/>
            </div>
          ))}
        </div>
      </div>
      <button onClick={savePlayer}>Save player</button>
    </div>
  )
}

function App() {
  const [creatingPlayer, setCreatingPlayer] = useState(false)
  const createPlayer = () => {
    setCreatingPlayer(true)
  }

  const saveCallback = () => {
    setCreatingPlayer(false)
  }

  const storagePlayers = localStorage.getItem('chiavariPlayers')
  const players = storagePlayers ? JSON.parse(storagePlayers) : []
  return (
    <div className="App">
      <header className="App-header">
        <div className="header">
          <button onClick={createPlayer}>New player</button>
        </div>
        {creatingPlayer && <AttributeList saveCallback={saveCallback}/>}
        <div className='players'>
          {players.map((value, index) => (
            <div key={index}>
                <AttributeList player={value} />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
