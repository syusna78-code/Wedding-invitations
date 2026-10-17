const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const WEDDING=new Date('2027-02-14T11:00:00');
// Intro
$('#open').onclick=()=>$('#intro').classList.add('go');
// Navigation (no scrolling: one page at a time)
const pages=$$('.page'),tabs=$$('#nav button');
tabs.forEach((b,i)=>b.onclick=()=>{
  pages.forEach((p,j)=>p.classList.toggle('on',i===j));
  tabs.forEach((t,j)=>t.classList.toggle('on',i===j));
});
// Countdown
function tick(){
  const t=Math.max(0,WEDDING-new Date());
  $('#d').textContent=Math.floor(t/864e5);
  $('#h').textContent=Math.floor(t/36e5)%24;
  $('#m').textContent=Math.floor(t/6e4)%60;
  $('#s').textContent=Math.floor(t/1e3)%60;
}
tick();setInterval(tick,1000);
// Calendar file
const ics=['BEGIN:VCALENDAR','VERSION:2.0','BEGIN:VEVENT','SUMMARY:Aria & Rohan Wedding','DTSTART:20270214T110000','DTEND:20270214T150000','LOCATION:The Rose Garden Estate\\, Jaipur','END:VEVENT','END:VCALENDAR'].join('\r\n');
$('#cal').href='data:text/calendar;charset=utf-8,'+encodeURIComponent(ics);
// Events
const EVENTS=[
 {d:'12',m:'Feb',n:'Haldi',t:'10:00 AM',x:'Turmeric and marigold petals. Dress: yellow.'},
 {d:'12',m:'Feb',n:'Mehendi',t:'5:00 PM',x:'Henna, music and refreshments. Dress: greens & pastels.'},
 {d:'13',m:'Feb',n:'Sangeet',t:'7:00 PM',x:'An evening of song and dance. Dress: festive pink.'},
 {d:'14',m:'Feb',n:'Wedding',t:'11:00 AM',x:'Exchange of vows beneath fresh florals. Dress: ivory & blush.'},
 {d:'14',m:'Feb',n:'Reception',t:'8:00 PM',x:'Dinner and dancing. Dress: formal floral.'}];
$('#evList').innerHTML=EVENTS.map(e=>`<div class="ev"><div class="dt"><b>${e.d}</b><span>${e.m}</span></div><div><h3>${e.n}</h3><p>${e.t}</p><p class="more">${e.x}</p></div></div>`).join('');
$$('.ev').forEach(el=>el.onclick=()=>{const o=el.classList.contains('open');$$('.ev').forEach(x=>x.classList.remove('open'));if(!o)el.classList.add('open');});
// RSVP
let att='joyfully accept',guests='1';
const pick=(sel,fn)=>$$(sel+' button').forEach(b=>b.onclick=()=>{$$(sel+' button').forEach(x=>x.classList.remove('s'));b.classList.add('s');fn(b);});
pick('#att',b=>att=b.dataset.v);pick('#gs',b=>guests=b.textContent);
$('#send').onclick=function(){
  const name=$('#nm').value.trim()||'A guest';
  const msg=`Hello Aria & Rohan, this is ${name}. I ${att} your wedding invitation. Guests: ${guests}.`;
  this.href='https://wa.me/91+9391776643?text='+encodeURIComponent(msg);
};
