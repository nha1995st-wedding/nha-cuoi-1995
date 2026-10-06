import Link from 'next/link'
import { supabase } from '@/lib/supabase'
export const revalidate=0
export default async function Home(){
 const [{data:albums},{data:settings}]=await Promise.all([
  supabase.from('albums').select('*').eq('visibility','public').order('sort_order',{ascending:true}).order('created_at',{ascending:false}),
  supabase.from('site_settings').select('key,value').in('key',['brand','contact'])
 ])
 const brand:any=settings?.find(x=>x.key==='brand')?.value||{}
 const contact:any=settings?.find(x=>x.key==='contact')?.value||{}
 const name=brand.name||'Nhà Cưới – Nhà 1995 Studio'; const tagline=brand.tagline||'Chạm vào khoảnh khắc, lưu giữ một đời.'
 return <><header className="site-header"><div className="wrap nav"><Link href="/" className="brand"><b>NHÀ CƯỚI</b><span>NHÀ 1995 STUDIO</span></Link><nav className="navlinks"><a href="#album">Album</a><a href="#about">Giới thiệu</a><a href="#contact">Liên hệ</a></nav><a className="btn" href="#contact">Đặt lịch</a></div></header><main>
 <section className="hero"><div className="wrap"><div className="eyebrow">Wedding • Photography • Bridal</div><h1 className="serif">Chạm vào khoảnh khắc,<br/><i>lưu giữ một đời.</i></h1><p>{tagline} Nhà Cưới – Nhà 1995 Studio kể câu chuyện tình yêu bằng những khung hình tự nhiên, tinh tế và có cảm xúc.</p><div className="hero-actions"><a className="btn" href="#album">Xem album</a><a className="btn ghost" href="#contact">Tư vấn cưới</a></div></div></section>
 <section className="section" id="album"><div className="wrap"><div className="section-head"><div><div className="eyebrow">Our stories</div><h2 className="serif">Những khoảnh khắc</h2></div><span className="muted small">Album mới nhất</span></div>{albums?.length?<div className="albums">{albums.map(a=><Link className="card" href={`/album/${a.slug}`} key={a.id}><div className="cover">{a.cover_image_url&&<img src={a.cover_image_url} alt={a.title}/>}</div><div className="card-body"><div className="meta">{a.event_date||'Wedding story'}</div><div className="card-title">{a.title}</div><p className="desc">{a.subtitle||a.description||'Một câu chuyện tình yêu được lưu giữ bằng hình ảnh.'}</p><span className="small">Xem album →</span></div></Link>)}</div>:<div className="empty">Album sẽ được cập nhật tại đây.</div>}</div></section>
 <section className="section" id="about"><div className="wrap about"><div className="about-copy"><div className="eyebrow">About us</div><h2 className="serif">Không chỉ là một bộ ảnh cưới.</h2><p>Chúng mình muốn mỗi album sau nhiều năm nhìn lại vẫn khiến hai bạn mỉm cười. Từ buổi chuẩn bị, lễ cưới đến những khoảnh khắc rất đời thường — tất cả đều được kể lại theo cách riêng của hai bạn.</p></div><div className="quote"><p>“Có những khoảnh khắc chỉ diễn ra một lần. Hãy để chúng được nhớ thật đẹp.”</p></div></div></section>
 <section className="section contact" id="contact"><div className="wrap contactbox"><div><div className="eyebrow">Let’s make it yours</div><h2 className="serif">Ngày cưới của bạn<br/>bắt đầu từ một cuộc trò chuyện.</h2>{contact.address&&<p className="muted small">{contact.address}</p>}</div><div className="contactlinks">{contact.facebook&&<a className="btn" href={contact.facebook} target="_blank" rel="noreferrer">Facebook</a>}{contact.zalo&&<a className="btn" href={contact.zalo} target="_blank" rel="noreferrer">Zalo</a>}{contact.phone&&<a className="btn" href={`tel:${contact.phone}`}>Gọi ngay</a>}</div></div></section>
 </main><footer className="wrap footer"><span>© {name}</span><span>Made for love stories.</span></footer></>
}
