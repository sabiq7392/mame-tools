'use client'

import { Menu } from 'antd'
import { HomeOutlined, ToolOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link href="/">Home</Link>,
  },
  {
    key: '/tools',
    icon: <ToolOutlined />,
    label: <Link href="/tools">My Tools</Link>,
  },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] w-full px-4 md:px-6 pt-4">
      <div className="max-w-7xl mx-auto">
        <div className="glass-strong rounded-2xl px-6 py-3 shadow-[0_8px_32px_0_rgba(31,38,135,0.5)] backdrop-blur-[30px] border border-white/20 bg-white/10">
          <div className="flex items-center justify-between gap-6">
            {/* Logo Section */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center rounded-full overflow-hidden bg-white/10 border border-white/20">
                <img 
                  src="/me/logo.svg" 
                  alt="Logo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg md:text-base font-semibold text-white hidden sm:block">
                Sabiq Mame
              </span>
            </div>

            {/* Menu Section */}
            <div className="flex-1 flex justify-end">
              <Menu
                mode="horizontal"
                selectedKeys={[pathname || '/']}
                items={menuItems}
                className="!bg-transparent !border-none [&_.ant-menu-horizontal]:!border-none [&_.ant-menu-item]:!mx-1 [&_.ant-menu-item]:!rounded-xl [&_.ant-menu-item]:!px-5 [&_.ant-menu-item]:!h-10 [&_.ant-menu-item]:!flex [&_.ant-menu-item]:!items-center [&_.ant-menu-item-selected]:!bg-primary-blue/30 [&_.ant-menu-item-selected]:!text-primary-blue-light [&_.ant-menu-item-selected]:!border-none [&_.ant-menu-item-selected>a]:!text-primary-blue-light [&_.ant-menu-item]:!text-white/70 [&_.ant-menu-item>a]:!text-white/70 [&_.ant-menu-item:hover]:!bg-primary-blue/20 [&_.ant-menu-item:hover]:!text-white [&_.ant-menu-item:hover>a]:!text-white [&_.ant-menu-item]:!transition-all [&_.ant-menu-item]:!duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
