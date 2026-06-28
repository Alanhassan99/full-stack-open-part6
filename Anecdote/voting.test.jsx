import { beforeEach, describe, expect, it } from 'vitest'
import useAnecdotes from './store'
import AnecdoteList from './components/AnecdoteList'


const mockAnecdotes = [
  {
    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "id": "69581",
    "votes": 0
  }]

describe('voting works', () => {

  beforeEach(() => {
    useAnecdotes.getState().actions.initialize(mockAnecdotes)
  })
  it('voting a anecdote works', () => {
    useAnecdotes.setState(state => ({
      anecdotes: state.anecdotes.map(a => a.id === mockAnecdotes[0].id ? { ...a, votes: a.votes + 1 } : a)
    }))
    const updated = useAnecdotes.getState().anecdotes.find(a => a.id === mockAnecdotes[0].id)
    expect(updated.votes).toEqual(1)
  })

})