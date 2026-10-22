(() => {
  const stages = [
    ['01','ENTER','进入积分中心','确认当前拥有多少积分。','8,253 Mi Coins<br>History','这些积分目前能够换到什么？','余额突出；实际兑换价值仍需结合奖励自行判断。','P01','奖励价值感知不足'],
    ['02','EXPLORE','浏览兑换奖励','找到感兴趣且符合兑换条件的奖励。','Redeem Rewards<br>AliExpress Card / Recharge Card','哪些奖励现在就可以兑换？还差多少积分？','需要自行比较当前余额与各商品积分门槛。','P01','奖励价值感知不足'],
    ['03','DECIDE','选择赚积分任务','判断参与任务是否值得。','Earn Mi Coins<br>游戏名称 / 积分奖励','同样是 +100 积分，哪个任务更容易完成？','中心页未直接展示完整条件，任务投入难以快速比较。','P02','任务参与决策成本较高'],
    ['04','ACT','理解任务进度','判断任务完成状态及下一步行动。','完成勾选图标<br>50% / Do it','50% 代表什么？我还需要完成什么？','不同任务状态的视觉与文字表达不够统一。','P03','任务状态与下一步行动'],
    ['05','REDEEM','判断兑换资格','确认积分是否足够，决定兑换或继续赚积分。','积分余额<br>兑换奖励区 / 任务区','如果现在还不能兑换，我下一步应该做什么？','余额、目标奖励与赚积分任务缺少直接的行动关联。','P03','任务状态与奖励目标关联']
  ];
  const rows = [['User Goal','用户目标',3],['Touchpoints','页面触点',4],['User Questions','潜在疑问 · 情境推演',5],['Potential Frictions','潜在体验阻碍',6],['UX Problems','对应问题',7]];
  const section = document.createElement('section');
  section.id = 'user-journey'; section.className = 'journey-section';
  section.setAttribute('aria-labelledby','journey-title');
  section.innerHTML = `
    <div class="journey-heading"><div class="eyebrow orange">Hypothetical User Journey</div><h2 id="journey-title">从看见积分，到判断下一步。</h2><span class="journey-badge">Hypothesis-Based User Journey</span><p class="journey-subtitle">基于二手研究与界面评估的假设性用户旅程</p></div>
    <p class="journey-disclaimer">本旅程基于俄罗斯消费者二手市场研究、任务书提供的目标用户描述，以及 Mi Coins 积分中心页截图进行情境推演。未开展真实俄罗斯用户访谈、观察或可用性测试。旅程中的用户行为、疑问及潜在体验阻碍均属于待验证的设计假设。</p>
    <div class="journey-scenario"><b>SCENARIO / 假设情境</b><p>一位对价格敏感、愿意通过任务获取实际收益的俄罗斯手机用户进入积分中心，当前拥有 <strong>8,253 Mi Coins</strong>。用户希望了解能兑换哪些奖励，并判断是否值得通过下载和激活游戏继续积累积分。</p></div>
    <p class="journey-scroll-hint">五阶段中心页情境推演 <span>窄屏可横向滚动查看 →</span></p>
    <div class="journey-scroll" tabindex="0" role="region" aria-label="五阶段假设性用户旅程，可横向滚动"><table class="journey-matrix"><caption>中心页中的目标、触点与潜在阻碍；非实际完成任务或兑换的记录。</caption><thead><tr><th scope="col">JOURNEY<br><small>假设性使用阶段</small></th>${stages.map((s,i)=>`<th scope="col"><span class="journey-step">${s[0]} / ${s[1]}${i<4?'<i aria-hidden="true">→</i>':''}</span><strong>${s[2]}</strong></th>`).join('')}</tr></thead><tbody>${rows.map(([en,zh,idx])=>`<tr class="journey-row-${idx}"><th scope="row"><span>${en}</span><small>${zh}</small></th>${stages.map(s=>`<td>${idx===7?`<a href="#problem-${s[7].slice(1)}" class="journey-problem">${s[7]}</a><span>${s[8]}</span>`:s[idx]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    <p class="journey-boundary">ACT 与 REDEEM 仅表示用户在中心页理解任务状态、考虑兑换的假设过程，不代表已实际激活游戏或完成兑换。潜在疑问为设计推演，并非用户引语。</p>
    <div class="journey-evidence"><div class="eyebrow">Research → Journey → UX Problems</div><p class="journey-evidence-note">以下为市场研究启发与中心页假设的关联，不是对 Mi Coins 用户实际行为的证明。</p><div class="journey-evidence-grid">
    <article><div class="eyebrow orange">01 / Reward Value</div><b>67% 关注奖励或折扣额度</b><p>研究启发 → 自行判断积分的可兑换价值。</p><span class="journey-result">P01 / 奖励价值感知不足</span><a class="source" href="https://www.cnews.ru/news/line/2025-05-12_64_rossiyan_regulyarno_polzuyutsya" target="_blank" rel="noopener">OnIn × Kuper / CNews · 2025 ↗</a></article>
    <article><div class="eyebrow orange">02 / Earning Convenience</div><b>66% 关注获取与兑换便利性</b><p>研究启发 → 任务条件和当前进度不易直接比较。</p><span class="journey-result">P02 / 任务参与决策成本较高</span><a class="source" href="https://www.cnews.ru/news/line/2025-05-12_64_rossiyan_regulyarno_polzuyutsya" target="_blank" rel="noopener">OnIn × Kuper / CNews · 2025 ↗</a></article>
    <article><div class="eyebrow orange">03 / Tangible Benefits</div><b>60% 乐于使用积分与奖励购物</b><p>研究启发 → 自行连接余额、奖励目标与任务行动。</p><span class="journey-result">P03 / 奖励目标与任务行动关联</span><a class="source" href="https://www.retail.ru/rbc/pressreleases/issledovanie-apelsina-60-rossiyan-raduyut-pokupki-kotorye-oni-sdelali-s-pomoshchyu-ballov-i-bonusov/" target="_blank" rel="noopener">Apelsin / Retail.ru · 2025 ↗</a></article>
    </div><p class="journey-boundary">沿用已核实的原研究口径：60% 指使用积分与奖励购物带来的愉悦感，不等同于购物返现偏好。</p></div>
    <div class="journey-transition"><div class="eyebrow orange">From Insights to Design Strategy</div><h3>从潜在体验阻碍，到核心重构判断。</h3><p>结合俄罗斯消费者对奖励价值和获取便利性的关注，以及 Mi Coins 中心页的启发式评估，本次重构将重点改善三个环节：奖励价值识别、任务参与决策和状态反馈。通过更明确的奖励目标与任务行动关系，探索兼顾游戏激活量与积分兑换转化率的设计方案。</p><a href="#strategy">进入核心重构判断 →</a></div>`;
  document.querySelector('#priority').before(section);
  const disclosure = document.createElement('p');
  disclosure.textContent = '使用 AI 辅助整理二手市场研究、构建假设性用户旅程图并实现网页展示。用户旅程未经过真实用户访谈或测试验证，属于基于现有资料的设计推演。最终高保真 UI 由刘润佳本人在 Figma 完成。';
  document.querySelector('#sources .ai').append(disclosure);
})();
