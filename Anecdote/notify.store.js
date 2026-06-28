import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: '',
  actions: {
    voteNotify: (content) => {
      set(state => ({ message: `you voted '${content}'` }))
      setTimeout(() => set(state => ({ message: '' })), 5000)
    },
    addNotify: (content) => {
      set(state => ({ message: `you added '${content}'` }))
      setTimeout(() => set(state => ({ message: '' })), 5000)
    }
  },

}))

export const useNotificationsActions = () => useNotificationStore((state) => state.actions)
export const useNotificationMessage = () => useNotificationStore((state) => state.message)