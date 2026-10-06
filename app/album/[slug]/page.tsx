import Link from 'next/link'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
export const revalidate=0
export default async function Album({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params; const {data:a}=await supabase.from('albums').select('*').eq('slug',slug).eq('visibility','public').single(); if(!a)notFound()
 const gallery=(a.gallery_urls||[]).filter(Boolean)
 return <><header className="site-header"><div className="wrap nav"><Link href="/" className="brand"><b>NHÀ CƯỚI</b><span>NHÀ 1995 STUDIO</span></Link><Link className="btn ghost" href="/">← Trang chủ</Link></div></header><main>
 <section className="detail-hero"><div className="wrap"><div className="eyebrow">Wedding story</div><h1 className="serif">{a.title}</h1><div className="meta">{a.bride_name||''} {a.bride_name&&a.groom_name?'&':''} {a.groom_name||''} {a.event_date?` • ${a.event_date}`:''}</div></div></section>
 {a.cover_image_url&&<div className="detail-cover"><img src={a.cover_image_url} alt={a.title}/></div>}
 <div className="detail-info"><p>{a.description||a.subtitle||'Một câu chuyện tình yêu được lưu giữ bằng hình ảnh.'}</p><div className="links">{a.drive_url&&<a className="btn" href={a.drive_url} target="_blank" rel="noreferrer">Xem ảnh trên Google Drive</a>}{a.photos_url&&<a className="btn ghost" href={a.photos_url} target="_blank" rel="noreferrer">Google Photos</a>}</div></div>
 {gallery.length>0&&<section className="section gallery-section"><div className="wrap"><div className="section-head"><div><div className="eyebrow">The gallery</div><h2 className="serif">Những khoảnh khắc</h2></div></div><div className="gallery">{gallery.map((url:string,i:number)=><div className="gallery-item" key={`${url}-${i}`}><img src={url} alt={`${a.title} ${i+1}`} loading="lazy"/></div>)}</div></div></section>}
 </main></>
}
