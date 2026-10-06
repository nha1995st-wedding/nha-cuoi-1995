import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata={title:'Nhà Cưới – Nhà 1995 Studio',description:'Wedding photography, áo cưới và những câu chuyện tình yêu được lưu giữ bằng hình ảnh.'}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="vi"><body>{children}</body></html>}
