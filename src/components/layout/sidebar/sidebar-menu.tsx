'use client'

import { type NavItem } from '../util/sidebar-config'
import { renderCollapsible } from './render-collapsible'
import { renderStatic } from './render-static'

interface SidebarNavItemsProps {
  item: NavItem
  parent?: NavItem
}

export function SidebarMenu({ item, parent }: SidebarNavItemsProps) {
  function render() {
    return item?.items?.length || parent
      ? renderCollapsible(item, parent)
      : renderStatic(item)
  }

  return render()
}
