
import { create } from 'zustand'
import anecdoteService from './services/anecdotes.js'



const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = useAnecdoteStore.getState().anecdotes.find(n => n.id === id)
      console.log(anecdote.content)
      const updated = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(n => n.id === id ? updated : n)
      }))
    },
    add: anecdote => set(state => ({
      anecdotes: state.anecdotes.concat(anecdote)
    })),
    remove: id => set(state => ({
      anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id)
    })),
    setFilter: value => set(() => ({ filter: value })),
    initialize: anecdotes => set(() => {
      return ({ anecdotes })
    })
  },
}))


export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  return anecdotes.toSorted((a, b) => b.votes - a.votes)
}
export default useAnecdoteStore
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useFilter = () => useAnecdoteStore((state) => state.filter)
