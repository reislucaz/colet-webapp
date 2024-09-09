/* eslint-disable react-hooks/rules-of-hooks */
import { useSidebar } from '@/hooks/layout/use-sidebar'

import { type NavItem } from '../util/sidebar-config'
import { renderAccordion } from './render-accordion'
import { renderTooltip } from './render-tooltip'

export function renderCollapsible(item: NavItem, parent?: NavItem) {
  const { isCollapse } = useSidebar()
  return isCollapse
    ? renderTooltip(item, parent)
    : renderAccordion(item, parent)
}
