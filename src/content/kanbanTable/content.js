function enhanceCard(card){
  if(card.dataset.rkEnhanced === '1') return;

  // 0) cienki pasek akcentu
  card.classList.add('rk-accent');

  // 1) Zbierz dane
  const chipBox = Array.from(card.querySelectorAll('.MuiBox-root')).find(b => b.querySelector('.MuiChip-root'));
  const desc    = card.querySelector('.jss199, .MuiTypography-body1'); // opis z tytułem
  const dueRaw  = card.querySelector('.jss202 h6, h6.MuiTypography-subtitle1')?.textContent?.trim();
  const progP   = Array.from(card.querySelectorAll('p')).find(p => /\d+\s*\/\s*\d+/.test(p.textContent));
  const idLink  = card.querySelector('.jss200 a[href], p a[href]');

  // 2) Priorytet
  let priority = null;
  if(chipBox){
    const chips = Array.from(chipBox.querySelectorAll('.MuiChip-root'));
    for(const c of chips){
      const t = c.querySelector('.MuiChip-label')?.textContent?.trim();
      if(['High','Medium','Low'].includes(t)){ priority = t; break; }
    }
  }
  if(priority) card.setAttribute('data-rk-priority', priority);

  // 3) TYTUŁ – bierzemy 1. linię opisu, obcinamy do 90 znaków
  if(desc && !card.querySelector('.rk-title')){
    const text = (desc.textContent || '').trim().replace(/\s+/g,' ');
    const title = text.split('\n')[0].slice(0, 90);
    const h = document.createElement('div');
    h.className = 'rk-title';
    h.textContent = title || '—';
    card.insertBefore(h, card.firstChild);
    // schowaj oryginalny długi opis (zostaje w DOM)
    desc.style.display = 'none';
  }

  // 4) BADGE terminu + klasy pilności
  if(dueRaw && !card.querySelector('.rk-due-badge')){
    const badge = document.createElement('span');
    badge.className = 'rk-due-badge';
    badge.textContent = dueRaw.replace('d','d ').replace('h','h');
    card.appendChild(badge);

    // prosta klasyfikacja: today / <=3d
    const md = dueRaw.match(/(\d+)d/);
    if(md){
      const d = parseInt(md[1], 10);
      if(d === 0) card.setAttribute('data-rk-due','today');
      else if(d <= 3) card.setAttribute('data-rk-due','soon');
    }else{
      // brak dni -> dziś lub < 24h
      if(/\bh\b/.test(dueRaw)) card.setAttribute('data-rk-due','today');
    }
  }

  // 5) CHIPY – pokaż tylko 1–2 + „+N”
  if(chipBox && !chipBox.dataset.rkMini){
    const chips = Array.from(chipBox.querySelectorAll('.MuiChip-root'));
    const line  = document.createElement('div'); line.className = 'rk-chip-line';
    const extra = [];
    let shown = 0;

    chips.forEach(c=>{
      const t = c.querySelector('.MuiChip-label')?.textContent?.trim() || '';
      const pill = document.createElement('span');
      pill.className = 'rk-chip';
      pill.textContent = t;
      if(['High','Medium','Low'].includes(t)) pill.classList.add('rk-chip--prio');

      if(['High','Medium','Low'].includes(t) || shown < 1){
        line.appendChild(pill); shown++;
      } else {
        extra.push(pill);
      }
    });

    if(extra.length){
      const more = document.createElement('span');
      more.className = 'rk-more-pill';
      more.textContent = `+${extra.length}`;
      more.title = extra.map(e=>e.textContent).join(', ');
      more.addEventListener('click', ()=>{ extra.forEach(e=> line.insertBefore(e, more)); more.remove(); });
      line.appendChild(more);
    }

    chipBox.parentElement.insertBefore(line, chipBox);
    chipBox.style.display = 'none';
    chipBox.dataset.rkMini = '1';
  }

  // 6) Progres + label
  if((progP || dueRaw) && !card.querySelector('.rk-progress')){
    const wrap = document.createElement('div'); wrap.className = 'rk-progress';
    const bar  = document.createElement('div'); bar.className  = 'rk-bar';
    const fill = document.createElement('div'); fill.className = 'rk-bar__fill'; bar.appendChild(fill);
    const lab  = document.createElement('span'); lab.className = 'rk-progress__label';

    let ratio = 0, labelLeft = '';
    if(progP){
      const m = progP.textContent.match(/(\d+)\s*\/\s*(\d+)/);
      if(m){
        const done = +m[1], all = Math.max(1, +m[2]); ratio = Math.min(100, Math.round(done/all*100));
        labelLeft = `${done}/${all}`;
      }
      progP.style.display = 'none';
    }
    fill.style.width = ratio + '%';
    lab.textContent = labelLeft ? labelLeft : '';

    wrap.append(bar, lab);
    card.appendChild(wrap);
  }

  // 7) Avatar overflow → +N z tooltipem
  const avatarBox = Array.from(card.querySelectorAll('.MuiBox-root')).find(b => b.querySelector('.MuiAvatar-root'));
  if(avatarBox && !avatarBox.dataset.rkMinified){
    const imgs = Array.from(avatarBox.querySelectorAll('img.MuiAvatar-img, .MuiAvatar-root img'));
    const names = imgs.map(i => i.alt).filter(Boolean);
    avatarBox.title = names.join(', ');
    if(imgs.length > 3){
      imgs.slice(3).forEach(i => (i.closest('.MuiAvatar-root').style.display = 'none'));
      const pill = document.createElement('span'); pill.className='rk-more-pill'; pill.textContent = `+${imgs.length-3}`;
      pill.title = names.slice(3).join(', ');
      pill.addEventListener('click',()=>{ imgs.slice(3).forEach(i => (i.closest('.MuiAvatar-root').style.display = '')); pill.remove(); });
      avatarBox.appendChild(pill);
    }
    avatarBox.dataset.rkMinified = '1';
  }

  // 8) Napraw link do ID (jeśli sam numer)
  if(idLink){
    const id = (idLink.textContent || '').trim();
    if(/^\d+$/.test(id)){
      const base = `${location.origin}/react/logs/issue_logs/`;
      idLink.href = base + id; idLink.target = '_blank'; idLink.rel='noopener';
    }
  }

  card.dataset.rkEnhanced = '1';
}
