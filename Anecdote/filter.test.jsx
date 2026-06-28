import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import useAnecdotes from './store'
import AnecdoteList from './components/AnecdoteList'

const mockAnecdotes = [
  {
    "content": "Adding manpower to a late software project makes it later!",
    "id": "21149",
    "votes": 12
  },
  {
    "content": "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "id": "69581",
    "votes": 2
  }]

describe('anecdotes are filtered', () => {

  beforeEach(() => {
    useAnecdotes.getState().actions.initialize(mockAnecdotes)
    useAnecdotes.getState().actions.setFilter('T')
  })
  it('displaying filtered anecdote', () => {
    render(<AnecdoteList />)
    const correctAnecdote = screen.getByText("The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.")
    expect(correctAnecdote)
    expect(screen.queryByText("Adding manpower to a late software project makes it later!")).toBe(null)
  })

})