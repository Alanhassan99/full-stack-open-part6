import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import useAnecdotes from './store'
import AnecdoteList from './components/AnecdoteList'

const mockAnecdotes = [{
  "content": "If it hurts, do it more often",
  "id": "47145",
  "votes": 122
},
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

describe('anecdotes are sorted by most votes highest', () => {

  beforeEach(() => {
    useAnecdotes.getState().actions.initialize(mockAnecdotes)
  })
  it('displaying accurate', () => {
    render(<AnecdoteList />)
    const elements = screen.getAllByText(/hurts|Adding|percent/)
    expect(elements[0].textContent).toBe("If it hurts, do it more often")
  })

})