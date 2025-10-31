import { ThemeConfig } from 'antd'

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#3b82f6',
    colorBgBase: '#0a0e27',
    colorBgContainer: '#111827',
    colorText: '#ffffff',
    colorTextSecondary: 'rgba(255, 255, 255, 0.8)',
    colorBorder: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Menu: {
      itemBg: 'transparent',
      itemSelectedBg: 'rgba(59, 130, 246, 0.2)',
      itemActiveBg: 'rgba(59, 130, 246, 0.1)',
      itemHoverBg: 'rgba(59, 130, 246, 0.15)',
      colorText: 'rgba(255, 255, 255, 0.9)',
      colorTextSelected: '#60a5fa',
      borderRadius: 8,
    },
    Button: {
      borderRadius: 12,
      fontWeight: 500,
    },
    Card: {
      borderRadius: 16,
    },
  },
}
