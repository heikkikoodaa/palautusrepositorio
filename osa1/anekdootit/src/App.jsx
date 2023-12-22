import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})
  const mostVotes = Object.values(votes).reduce((acc, curr) => {
    if (curr > acc) {
      acc = curr
    }

    return acc
  }, 0)
  const mostVotedKey = Object.keys(votes).find(key => votes[key] === mostVotes) || null
  console.log(mostVotedKey)

  const handleAnecdoteChange = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)

    if (randomIndex === selected) {
      handleAnecdoteChange()
      return
    }

    setSelected(randomIndex)
  }

  const handleVote = () => {
    if (Object.keys(votes).includes(selected.toString())) {
      setVotes(prevVotes => {
        return {...prevVotes, [selected]: prevVotes[selected] += 1}
      })
    } else {
      setVotes(prevVotes => {
        return {
          ...prevVotes,
          [selected]: 1
        }
      })
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] || 0} votes</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleAnecdoteChange}>Next anecdote</button>
      {mostVotes && mostVotedKey ? (
        <>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[mostVotedKey]}</p>
          <p>has {mostVotes} votes</p>
        </>
      ) : null}
    </div>
  )
}

export default App