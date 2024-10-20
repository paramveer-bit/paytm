'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, SendHorizontal, List, Gift } from 'lucide-react'

const menuItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Transfer', icon: SendHorizontal, href: '/transfer' },
  { name: 'Transactions', icon: List, href: '/transactions' },
  { name: 'Rewards', icon: Gift, href: '/rewards' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-[90vh] bg-primary text-primary-foreground border-r border-primary-foreground/20 shadow-lg">
      <nav className="h-full px-3 py-4 overflow-y-auto">
        {/* <h1 className="text-2xl font-bold mb-6 px-4">My App</h1> */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`
                  flex items-center p-2 rounded-lg hover:bg-primary-foreground/10 transition-colors
                  ${pathname === item.href ? 'bg-primary-foreground/20' : ''}
                `}
              >
                <item.icon className="w-6 h-6 mr-3" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}