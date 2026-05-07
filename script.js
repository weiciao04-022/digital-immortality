gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia('(max-width: 768px)').matches;
const lenis = new Lenis({ smoothWheel: true, duration: isMobile ? 0.9 : 1.3 });
lenis.on('scroll', ScrollTrigger.update);
function raf(time){lenis.raf(time);requestAnimationFrame(raf)}requestAnimationFrame(raf);

document.getElementById('startReading').addEventListener('click',()=>lenis.scrollTo('#context'));
new Typed('#typed-hero',{strings:['你會選擇保留他的聲音嗎？','你會同意自己的數位重現嗎？'],typeSpeed:50,backSpeed:24,loop:true});

// 哪裡可以改留言資料 / COUNTRY BACKGROUND / 哪裡可以調整國家比例
const countryData={
  taiwan:{label:'台灣',bg:'/assets/images/taiwan-comments.jpg',theme:['#9aacba','#e8e0cf'],culture:'台灣的討論常落在技術能不能做到、法律能不能規範，以及是否會造成情感依賴。數位永生在台灣仍處於技術引入與倫理試探階段。',comments:['如果只是婚禮上聽到爸爸祝福，我覺得可以接受。','可是人都走了，還一直生成他的樣子，真的不會太殘忍嗎？','法律到底有沒有管？死後誰可以決定他的肖像？','台語如果做不像，反而會很出戲。','如果拿來做家族紀錄片，我能理解。','我怕長輩會越用越放不下。','技術可以做，但界線要先講清楚。','不要最後變成會員制追思平台。'],ratios:{倫理疑慮:35,思念型:25,技術期待:15,反對型:15,陪伴需求:10}},
  china:{label:'中國',bg:'/assets/images/china-comments.jpg',theme:['#b45256','#ffffff'],culture:'中國的數位永生討論更常與科技效率、殯葬服務、商業應用連結。支持者看見陪伴與商機，反對者則擔心消費逝者與情感操控。',comments:['科技發展到這裡很正常，有需求就會有市場。','這不是復活，只是給活著的人一點念想。','感覺殯葬公司又多了一個收費項目。','如果可以和過世的親人聊天，我願意試試。','能做成定制服務應該很多人買單。','AI說錯話會不會更傷人？','可以陪老人，但商業化要透明。','我支持，但要有官方規範。'],ratios:{技術期待:30,思念型:25,商業警戒:20,倫理疑慮:15,反對型:10}},
  japan:{label:'日本',bg:'/assets/images/japan-memory.jpg',theme:['#b3b0c8','#f0ece5'],culture:'日本的討論與高齡化、孤獨死、寵物陪伴和記憶保存有關。數位永生不一定被視為復活，而更像是一種延長回憶的方式。',comments:['比起復活，我覺得比較像保存回憶。','一個人生活久了，可能真的會需要這種陪伴。','如果太依賴，會不會永遠無法接受死亡？','寵物的記憶也值得被保存。','像留言錄音膠囊，這樣比較能接受。','希望它安靜，不要像真的人。','如果家屬意見不一致怎麼辦。','技術慢一點沒關係，倫理先談。'],ratios:{陪伴需求:30,思念型:25,倫理疑慮:20,反對型:15,技術期待:10}},
  korea:{label:'韓國',bg:'/assets/images/korea-virtual.jpg',theme:['#9fb7d9','#efc7d7'],culture:'韓國的相關想像常與影視敘事、娛樂產業和情感科技連結。它讓人思考：科技製造的重逢，究竟是療癒，還是另一種逃避？',comments:['《夢境》那種設定很美，但也很可怕。','如果小孩不知道媽媽已經過世，這不是另一種傷害嗎？','娛樂產業一定會先用這個技術。','我可以理解想見最後一面的心情。','看劇會哭，但真的用在生活我會怕。','如果能短時間告別，也許有幫助。','平台公司不要拿悲傷做流量。','倫理審查要跟上技術速度。'],ratios:{倫理疑慮:30,思念型:25,娛樂想像:20,反對型:15,技術期待:10}}
};
const tabs=document.getElementById('countryTabs'),wall=document.getElementById('commentWall'),ratio=document.getElementById('ratioBars');
const culture=document.getElementById('cultureText'),bg=document.getElementById('countryBg');
Object.entries(countryData).forEach(([k,v],i)=>{const b=document.createElement('button');b.textContent=v.label;b.onclick=()=>renderCountry(k);if(i===0)b.classList.add('active');tabs.appendChild(b)});
function renderCountry(key){const d=countryData[key];[...tabs.children].forEach((b,i)=>b.classList.toggle('active',Object.keys(countryData)[i]===key));culture.textContent=d.culture;bg.style.setProperty('--bg-image',`url('${d.bg}')`);
 wall.innerHTML=d.comments.map((c,idx)=>`<article class='comment-card' style='animation-delay:${idx*0.04}s'><small>匿名留言</small><p>${c}</p><small>${['思念型','反對型','技術期待型','倫理疑慮型','陪伴需求型','商業警戒型'][idx%6]}</small><div class='dots'>${[1,2,3,4,5].map(n=>`<i class='${n<=((idx%5)+1)?'on':''}'></i>`).join('')}</div></article>`).join('');
 ratio.innerHTML=Object.entries(d.ratios).map(([k,v])=>`<div class='ratio-item'><div>${k} ${v}%</div><div class='bar'><span data-width='${v}'></span></div></div>`).join('');
 ratio.querySelectorAll('span').forEach((s,idx)=>setTimeout(()=>s.style.width=s.dataset.width+'%',80+idx*120));}
renderCountry('taiwan');

const flow=[
  ['素材收集','影像素材、至少一分鐘語音、生活照片與影片。'],
  ['人格資料建構','個人背景、說話習慣、專屬知識庫與互動偏好。'],
  ['聲音與臉部模型','聲音克隆、ASR、TTS、嘴型同步、臉部動作同步。'],
  ['語言模型回應','LLM生成回覆，搭配情境記憶與語氣控制。'],
  ['即時互動數位人','API串接，加上硬體與網路支援完成即時互動。']
];
const nodes=document.getElementById('flowNodes'),detail=document.getElementById('flowDetail');
flow.forEach((f,i)=>{const n=document.createElement('button');n.className='flow-node';n.textContent=f[0];n.onclick=()=>{document.querySelectorAll('.flow-node').forEach(x=>x.classList.remove('active'));n.classList.add('active');detail.textContent=f[1]};nodes.appendChild(n);if(i===0)n.click();});

// 哪裡可以改問卷結果文字
const poll=[
['願意，家人可以使用','你選擇讓數位人延續陪伴。但問題是，誰能決定它說什麼、保存多久、是否能被轉用？'],
['只願意保存一段時間','你接受有限度的保存。這也指向未來可能需要設定數位人格的使用年限。'],
['只允許私人紀念，不可商業使用','你重視紀念與商業用途的界線。這正是目前法律最難清楚處理的部分。'],
['完全不願意','你選擇讓死亡保有終點。但如果家屬強烈希望留下你，目前制度未必能完整處理這種衝突。'],
['還沒想過','多數人其實尚未準備好回答這個問題。數位永生的發展速度，已經快過社會討論。']];
const opt=document.getElementById('pollOptions'),res=document.getElementById('pollResult');
poll.forEach(([t,r])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{res.textContent=r;[...opt.children].forEach(x=>x.classList.remove('active'));b.classList.add('active')};opt.appendChild(b)});

gsap.utils.toArray('.fade-up').forEach(el=>gsap.to(el,{y:0,opacity:1,duration:1,scrollTrigger:{trigger:el,start:'top 85%'}}));
if(!isMobile){gsap.utils.toArray('[data-parallax]').forEach(el=>{const s=Number(el.dataset.parallax||0.1);gsap.to(el,{yPercent:-s*100,ease:'none',scrollTrigger:{trigger:el.closest('.panel'),scrub:true}})});}

gsap.to('#hero h1, #hero p',{opacity:0,scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.ai-msg',{opacity:1,y:0,stagger:0.8,scrollTrigger:{trigger:'#ending',start:'top 60%'}});
gsap.to('#finalLine',{opacity:1,delay:2,scrollTrigger:{trigger:'#ending',start:'top 45%'}});
