'use client'
import {FormEvent,useEffect,useState} from 'react'
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import {supabase} from '@/lib/supabase'
export default function Settings(){
 const router=useRouter(); const [loading,setLoading]=useState(true); const [saving,setSaving]=useState(false); const [msg,setMsg]=useState('')
 const [form,setForm]=useState({name:'Nhà Cưới – Nhà 1995 Studio',tagline:'Chạm vào khoảnh khắc, lưu giữ một đời.',facebook:'',zalo:'',phone:'',address:''})
 useEffect(()=>{(async()=>{const {data:{user}}=await supabase.auth.getUser();if(!user){router.replace('/admin/login');return};const {data}=await supabase.from('site_settings').select('key,value').in('key',['brand','contact']);for(const row of data||[]){if(row.key==='brand')setForm(f=>({...f,...row.value}));if(row.key==='contact')setForm(f=>({...f,...row.value}))}setLoading(false)})()},[router])
 function set(k:string,v:string){setForm(f=>({...f,[k]:v}))}
 async function save(e:FormEvent){e.preventDefault();setSaving(true);setMsg('');const a=await supabase.from('site_settings').upsert({key:'brand',value:{name:form.name,tagline:form.tagline},updated_at:new Date().toISOString()});const b=await supabase.from('site_settings').upsert({key:'contact',value:{facebook:form.facebook,zalo:form.zalo,phone:form.phone,address:form.address},updated_at:new Date().toISOString()});setSaving(false);setMsg(a.error?.message||b.error?.message?'Có lỗi khi lưu.':'Đã lưu cài đặt.')}
 if(loading)return <main className="login"><div className="muted">Đang tải…</div></main>
 return <div className="admin-shell"><header className="adminbar"><Link href="/admin">← CMS</Link><b>Cài đặt website</b><Link href="/">Website</Link></header><main className="adminmain"><div className="panel"><div className="eyebrow">Brand & contact</div><h1 className="serif">Thông tin website</h1>{msg&&<div className="success">{msg}</div>}<form className="form" onSubmit={save}><label>Tên studio<input value={form.name} onChange={e=>set('name',e.target.value)}/></label><label>Câu tagline<input value={form.tagline} onChange={e=>set('tagline',e.target.value)}/></label><label>Facebook<input value={form.facebook} onChange={e=>set('facebook',e.target.value)} placeholder="https://facebook.com/..."/></label><label>Zalo<input value={form.zalo} onChange={e=>set('zalo',e.target.value)} placeholder="https://zalo.me/..."/></label><label>Số điện thoại<input value={form.phone} onChange={e=>set('phone',e.target.value)} placeholder="09..."/></label><label>Địa chỉ<input value={form.address} onChange={e=>set('address',e.target.value)}/></label><button className="btn" disabled={saving}>{saving?'Đang lưu…':'Lưu thay đổi'}</button></form></div></main></div>
}
