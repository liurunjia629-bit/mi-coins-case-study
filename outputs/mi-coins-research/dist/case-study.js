(() => {
  const $=selector=>document.querySelector(selector),oldMain=$('body>main'),design=$('#design'),wireframes=$('#wireframes'),prototype=$('#prototype');
  if(!oldMain||!design||!wireframes||!prototype)return;
  document.body.classList.remove('final-view','wireframe-view');document.body.classList.add('case-study');
  const main=document.createElement('main');main.id='case-study';
  const chapters=[];
  function chapter(id,label,nodes){const c=document.createElement('div');c.id=id;c.className='case-chapter';c.setAttribute('aria-label',label);nodes.filter(Boolean).forEach(n=>c.append(n));main.append(c);chapters.push(c);return c;}
  const market=$('#research');market.id='market-research';
  chapter('research','01 研究',[$('#top'),market]);
  chapter('ux-audit','02 体验诊断',[$('#audit'),$('#priority')]);
  const strategy=$('#strategy');strategy.classList.add('case-chapter');strategy.setAttribute('aria-label','03 设计策略');main.append(strategy);chapters.push(strategy);
  const wfBody=wireframes.querySelector('.wf-body'),wfParts=[...wfBody.children];
  const handoff=wfParts.filter(n=>n.querySelector?.('#wf-final')||n.querySelector?.('#wf-prototype'));
  handoff.forEach(n=>n.remove());
  const exploration=chapter('exploration','04 方案探索',[wireframes]);wireframes.hidden=false;
  const rationale=$('#visual-rationale');rationale.id='visual-redesign';rationale.classList.add('case-chapter');rationale.setAttribute('aria-label','05 视觉重构');main.append(rationale);chapters.push(rationale);
  const validation=$('#validation');validation.removeAttribute('id');
  const disclosure=design.querySelector('.final-disclosure');
  const sources=$('#sources'),researchFooter=oldMain.querySelector('footer');
  const final=chapter('final-design','06 最终设计',[design]);design.removeAttribute('id');design.hidden=false;
  // Keep handoff notes and source links in their relevant chapter, without repeating identical PNG exports.
  const handoffNotes=document.createElement('div');handoffNotes.className='case-handoff';
  handoff.forEach(section=>{section.querySelectorAll('.wf-handoff>div').forEach(n=>{n.querySelectorAll('a').forEach(a=>handoffNotes.append(a.cloneNode(true)));});const rule=section.querySelector('.wf-handoff-rule');if(rule)handoffNotes.append(rule);});
  if(handoffNotes.childNodes.length)design.append(handoffNotes);
  prototype.classList.add('case-chapter');prototype.setAttribute('aria-label','07 交互演示');prototype.hidden=false;main.append(prototype);chapters.push(prototype);
  const end=chapter('validation','08 验证总结',[validation,disclosure,sources,researchFooter]);
  const summary=document.createElement('div');summary.className='case-summary';summary.innerHTML='<div class="final-kicker">Design Summary</div><h2>看见价值 → 理解付出 → 确认进展</h2><p>A 以奖励目标连接任务行动，B 优先支持任务继续与状态识别。两种结构保留相同核心业务内容，后续通过可用性测试与真实业务指标验证各自适用性。</p>';end.insertBefore(summary,disclosure);
  // Move the already-created DOM once. Anchor navigation never recreates any iframe or product state.
  oldMain.replaceWith(main);
  main.querySelectorAll('.final-top,.wf-top').forEach(n=>n.remove());
  const nav=$('header nav'),brand=nav.querySelector('.brand'),print=nav.querySelector('button');nav.replaceChildren();
  brand.href='#research';nav.append(brand);
  const items=[['research','01','研究'],['ux-audit','02','体验诊断'],['strategy','03','设计策略'],['exploration','04','方案探索'],['visual-redesign','05','视觉重构'],['final-design','06','最终设计'],['prototype','07','交互演示'],['validation','08','验证总结']];
  const links=document.createElement('div');links.className='case-nav-links';links.setAttribute('aria-label','案例章节');
  items.forEach(([id,num,label])=>{const a=document.createElement('a');a.href='#'+id;a.innerHTML=`<span>${num}</span> ${label}`;a.dataset.chapter=id;links.append(a);});nav.append(links,print);
  const aliases={top:'research',audit:'ux-audit',priority:'ux-audit',wireframes:'exploration','wf-final':'final-design','wf-prototype':'prototype',design:'final-design','visual-rationale':'visual-redesign',sources:'validation'};
  main.querySelectorAll('a[href^="#"]').forEach(a=>{const id=a.hash.slice(1);if(aliases[id])a.href='#'+aliases[id];});
  const anchors=[...links.querySelectorAll('a')];let active='',ticking=false;
  function highlight(){ticking=false;const line=$('header').getBoundingClientRect().height+28;let current=chapters[0];for(const c of chapters){if(c.getBoundingClientRect().top<=line)current=c;else break;}if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)current=chapters.at(-1);if(current.id!==active){active=current.id;anchors.forEach(a=>{const selected=a.dataset.chapter===active;a.classList.toggle('active',selected);if(selected)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});const selected=anchors.find(a=>a.dataset.chapter===active);if(selected&&links.scrollWidth>links.clientWidth){const left=selected.offsetLeft-links.offsetLeft-(links.clientWidth-selected.offsetWidth)/2;links.scrollTo({left,behavior:'auto'});}}const max=document.documentElement.scrollHeight-innerHeight;$('#progress').style.width=(max>0?scrollY/max*100:0)+'%';}
  function schedule(){if(!ticking){ticking=true;requestAnimationFrame(highlight);}}
  function hashTarget(){const raw=decodeURIComponent(location.hash.slice(1));return document.getElementById(aliases[raw]||raw);}
  function locate(behavior='auto'){const target=hashTarget();if(target)target.scrollIntoView({behavior,block:'start'});schedule();}
  document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||a.target==='_blank')return;const raw=a.hash.slice(1),id=aliases[raw]||raw,target=document.getElementById(id);if(!target)return;e.preventDefault();if(location.hash!=='#'+id)history.pushState(null,'','#'+id);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('hashchange',()=>locate('smooth'));addEventListener('popstate',()=>locate('auto'));
  const observer=new IntersectionObserver(schedule,{rootMargin:'-72px 0px -60% 0px',threshold:0});chapters.forEach(c=>observer.observe(c));
  const resize=new ResizeObserver(()=>{document.documentElement.style.setProperty('--case-nav-height',$('header').getBoundingClientRect().height+'px');schedule();});resize.observe($('header'));
  // Fixed image dimensions reserve space before load, so deep links do not drift.
  main.querySelectorAll('img[src$="A1.png"]').forEach(i=>{i.width=1568;i.height=3968;});main.querySelectorAll('img[src$="B1.png"]').forEach(i=>{i.width=1568;i.height=4592;});
  const staticPrint=document.createElement('div');staticPrint.className='case-print-prototypes';staticPrint.innerHTML='<p>交互演示静态代表画面 · 动态操作请访问网页原型</p><div><figure><figcaption>A · Reward-Driven</figcaption><img src="assets/final/A1.png" width="1568" height="3968" alt="方案 A 交互演示静态代表画面"></figure><figure><figcaption>B · Task-Driven</figcaption><img src="assets/final/B1.png" width="1568" height="4592" alt="方案 B 交互演示静态代表画面"></figure></div>';prototype.querySelector('.final-phone-box').after(staticPrint);
  document.title='Mi Coins — 从积分到实际收益';
  wireframes.querySelectorAll('.wf-scheme').forEach(scheme=>{const img=document.createElement('img');img.className='case-wireframe-print';img.src='assets/wireframe-'+scheme.querySelector('iframe').dataset.variant.toLowerCase()+'.jpg';img.alt='低保真方案 '+scheme.querySelector('iframe').dataset.variant+' 静态结构图';scheme.querySelector('figure').prepend(img);});
  const settle=()=>{dispatchEvent(new Event('resize'));requestAnimationFrame(()=>requestAnimationFrame(()=>locate('instant')));};
  if(document.readyState==='complete')settle();else addEventListener('load',settle,{once:true});
  document.fonts.ready.then(()=>{if(scrollY<5||location.hash)locate('instant');});highlight();
})();
