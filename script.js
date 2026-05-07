gsap.registerPlugin(ScrollTrigger);
const mobile = window.matchMedia('(max-width:768px)').matches;
const lenis = new Lenis({duration: mobile?0.9:1.2,smoothWheel:true});
lenis.on('scroll', ScrollTrigger.update); const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)}; requestAnimationFrame(raf);

document.getElementById('readBtn').onclick=()=>lenis.scrollTo('#s2');
new Typed('#typed',{strings:['科技可以重現聲音，能重現告別嗎？','留下，會比較不痛嗎？'],typeSpeed:45,backSpeed:24,loop:true});

// article section content: flow node data
const flowData=[['素材收集','影像、聲音、文字、訪談、生活紀錄。'],['人格資料建構','個人背景、說話習慣、價值觀、記憶資料。'],['聲音與臉部模型','聲音克隆、嘴型同步、臉部動作同步。'],['語言模型回應','ASR、TTS、LLM 共同產生對話。'],['即時互動數位人','需要 API 串接、硬體效能與穩定網路。']];
const flow=document.getElementById('flow'),flowInfo=document.getElementById('flowInfo');
flowData.forEach((d,i)=>{const b=document.createElement('button');b.textContent=d[0];b.onclick=()=>{[...flow.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');flowInfo.textContent=d[1];};flow.appendChild(b);if(i===0)b.click();});

// country comments data
const data={
 taiwan:{bg:'pic/06taiwan-comments.png',obs:'台灣的討論常落在技術能否做到、法律能否規範，以及數位人是否會造成情感依賴。數位永生在臺灣仍處於技術引入、法規不足與倫理試探階段。',comments:['如果只是婚禮上聽到爸爸祝福，我覺得可以接受。','可是人都走了，還一直生成他的樣子，真的不會太殘忍嗎？','法律到底有沒有管？死後誰可以決定他的肖像？','台語如果做不像，反而會很出戲。','這種東西應該要本人死前同意吧。','我可以理解家屬想念，但不能拿去商業表演。','如果只是短暫告別，我覺得比完全沒有機會好。','最怕的是家屬被迫一直活在假的陪伴裡。'],ratios:{倫理疑慮:35,思念型:25,技術期待:15,反對型:15,陪伴需求:10}},
 china:{bg:'pic/07china-comments.png',obs:'中國數位永生產業發展快速，與科技創新、殯葬服務和商業應用高度連結。支持者看見陪伴與市場需求，反對者則擔心消費逝者與情感操控。',comments:['科技發展到這裡很正常，有需求就會有市場。','這不是復活，只是給活著的人一點念想。','感覺殯葬公司又多了一個收費項目。','如果可以和過世的親人聊天，我願意試試。','只要家屬願意，外人沒必要批評。','AI再像也不是本人，別騙自己。','以後可能每個人都會提前做一個數位分身。','這種服務一定要防止被拿來詐騙。'],ratios:{技術期待:30,思念型:25,商業警戒:20,倫理疑慮:15,反對型:10}},
 japan:{bg:'pic/08japan-memory.png',obs:'日本的討論與少子化、高齡化、孤獨死、寵物陪伴和記憶保存有關。數位永生不一定被視為復活，而更像是一種延長回憶與陪伴的方式。',comments:['比起復活，我覺得比較像保存回憶。','一個人生活久了，可能真的會需要這種陪伴。','如果太依賴，會不會永遠無法接受死亡？','寵物的記憶也值得被保存。','我希望它安靜地存在，不要太像真人。','老照片和聲音就已經很足夠了。','如果能陪獨居老人說話，也許有幫助。','放下不代表忘記，技術應該幫助人慢慢告別。'],ratios:{陪伴需求:30,思念型:25,倫理疑慮:20,反對型:15,技術期待:10}},
 korea:{bg:'pic/09korea-virtual.png',obs:'韓國的相關想像常與影視敘事、娛樂產業和情感科技連結。它讓人思考，科技製造的重逢究竟是療癒，還是另一種逃避。',comments:['《夢境》那種設定很美，但也很可怕。','如果小孩不知道媽媽已經過世，這不是另一種傷害嗎？','娛樂產業一定會先用這個技術。','我可以理解想見最後一面的心情。','如果 AI 替演員繼續演戲，那授權到底算誰的？','科技做得越像，越讓人分不清楚。','重逢很感人，但也可能讓人困在過去。','這題最可怕的是，活著的人會替死者決定一切。'],ratios:{倫理疑慮:30,思念型:25,娛樂想像:20,反對型:15,技術期待:10}}
};
const tabs=document.getElementById('countryTabs'),obs=document.getElementById('countryObs'),comments=document.getElementById('comments'),ratios=document.getElementById('ratios'),cbg=document.getElementById('countryBg'),cbgImg=document.getElementById('countryBgImg');
Object.keys(data).forEach((k,i)=>{const b=document.createElement('button');b.textContent=({taiwan:'台灣',china:'中國',japan:'日本',korea:'韓國'})[k];if(i===0)b.classList.add('active');b.onclick=()=>renderCountry(k);tabs.appendChild(b)});
function renderCountry(k){const d=data[k];cbg.style.opacity=0;setTimeout(()=>{cbgImg.src='../'+d.bg;cbgImg.alt=d.bg;cbg.style.opacity=1;},180);[...tabs.children].forEach((x,idx)=>x.classList.toggle('active',Object.keys(data)[idx]===k));obs.textContent=d.obs;comments.innerHTML=d.comments.map(t=>`<div class='comment fade-up'><small>匿名留言</small><p>${t}</p></div>`).join('');ratios.innerHTML=Object.entries(d.ratios).map(([n,v])=>`<div>${n} ${v}%<div class='bar'><span data-w='${v}'></span></div></div>`).join('');ratios.querySelectorAll('span').forEach((s,i)=>setTimeout(()=>s.style.width=s.dataset.w+'%',70+i*120));gsap.fromTo('#comments .comment',{opacity:0,y:18},{opacity:1,y:0,stagger:0.06,duration:0.4});}
renderCountry('taiwan');

const poll=[['願意，家人可以使用','你選擇讓數位人延續陪伴。但問題是，誰能決定它說什麼、保存多久、是否能被轉用？'],['只願意保存一段時間','你接受有限度的保存。這也指向未來可能需要設定數位人格的使用年限。'],['只允許私人紀念，不可商業使用','你重視紀念與商業用途的界線。這正是目前法律最難清楚處理的部分。'],['完全不願意','你選擇讓死亡保有終點。但如果家屬強烈希望留下你，目前制度未必能完整處理這種衝突。'],['還沒想過','多數人其實尚未準備好回答這個問題。數位永生的發展速度，已經快過社會討論。']];
const po=document.getElementById('pollOps'),pr=document.getElementById('pollRes'); poll.forEach(([t,r])=>{const b=document.createElement('button');b.textContent=t;b.onclick=()=>{[...po.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');pr.textContent=r};po.appendChild(b)});

gsap.utils.toArray('.fade-up').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:0.8,scrollTrigger:{trigger:el,start:'top 85%'}}));
gsap.to('.slide-in-right',{opacity:1,x:0,duration:1,scrollTrigger:{trigger:'#s3',start:'top 70%'}});
if(!mobile){gsap.utils.toArray('.parallax').forEach(el=>{const sp=Number(el.dataset.speed||0.08);gsap.to(el,{yPercent:-sp*100,ease:'none',scrollTrigger:{trigger:el.closest('.section'),scrub:true}});});}
gsap.to('.end-msg',{opacity:1,y:0,stagger:0.8,scrollTrigger:{trigger:'#s16',start:'top 60%'}}); gsap.to('#endQ',{opacity:1,delay:2,scrollTrigger:{trigger:'#s16',start:'top 50%'}});
