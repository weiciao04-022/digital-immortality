gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll('.story-section').forEach((sec)=>{
  const bg=sec.querySelector('.parallax-bg');
  bg.style.backgroundImage=`url('${sec.dataset.bg}')`;
  gsap.to(bg,{yPercent:15,ease:'none',scrollTrigger:{trigger:sec,start:'top bottom',end:'bottom top',scrub:true}});
});

gsap.utils.toArray('.reveal').forEach(el=>{
  gsap.to(el,{opacity:1,y:0,duration:1,scrollTrigger:{trigger:el,start:'top 82%'}});
});

const countryData={
  '台灣':{bg:'pic/06taiwan-comments.png',text:'技術引入中，應用包含娛樂重現、AI陪伴、長照服務，但語言模型與法規仍待補足。'},
  '中國':{bg:'pic/07china-comments.png',text:'數位人商業化速度快，殯葬、娛樂與陪伴服務都有應用，但也產生授權與倫理爭議。'},
  '日本':{bg:'pic/08japan-memory.png',text:'高齡化與孤獨議題使陪伴型AI、寵物記憶服務具有市場，但使用者依賴問題受到關注。'},
  '韓國':{bg:'pic/09korea-virtual.png',text:'影視作品與科技產業推動數位重逢想像，常以家人、記憶與虛擬陪伴作為敘事核心。'}
};
const panel=document.getElementById('country-panel');
const countryBg=document.getElementById('country-bg');
function setCountry(c){panel.innerHTML=`<h3>${c}</h3><p>${countryData[c].text}</p>`;countryBg.style.backgroundImage=`url('${countryData[c].bg}')`;}
setCountry('台灣');
document.querySelectorAll('.country-buttons button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.country-buttons button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');setCountry(btn.dataset.country);}));

document.querySelectorAll('.legal').forEach(card=>card.addEventListener('mouseenter',()=>{card.querySelector('p').dataset.old=card.querySelector('p').textContent;card.querySelector('p').textContent=card.dataset.tip;}));
document.querySelectorAll('.legal').forEach(card=>card.addEventListener('mouseleave',()=>{const p=card.querySelector('p');if(p.dataset.old)p.textContent=p.dataset.old;}));
