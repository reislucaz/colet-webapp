import { create } from 'zustand'

export interface UseSideBarProps {
  isCollapse: boolean
  handleToggleCollapse: () => void
}

export const useSidebar = create<UseSideBarProps>((set) => ({
  isCollapse: false,
  handleToggleCollapse: () => {
    set(({ isCollapse }) => ({ isCollapse: !isCollapse }))
  },
}))
