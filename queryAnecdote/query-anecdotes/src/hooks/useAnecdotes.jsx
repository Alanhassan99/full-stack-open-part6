import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from '../requests'
import useNotify from '../components/useNotify'

export const useAnecdotes = () => {
  const { notify } = useNotify()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    retry: false,
    queryFn: getAnecdotes
  })

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${newAnecdote.content} added'`)
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`too short anecdote must have length 5 or more`)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notify(`anecdote '${updatedAnecdote.content} voted'`)
    }
  })
  return {
    anecdotes: result.data,
    isPending: result.isPending,
    error: result.error,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    vote: (anecdote) => updateAnecdoteMutation.mutate({
      ...anecdote, votes: anecdote.votes + 1
    }),
  }














}