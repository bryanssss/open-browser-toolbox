(()=>{
  'use strict';
  const root=document.documentElement;
  const pathDepth=location.pathname.includes('/tools/')?'../../':'./';
  const STORE={
    theme:'ot-theme', favourites:'ot-favourites', history:'ot-history', settings:'ot-settings',
    categories:'ot-category-settings', collections:'ot-collections', formPrefix:'ot-form:'
  };
  const defaults={language:'en',fontScale:100,reducedMotion:false,saveToolInputs:false,historyEnabled:true,historyLimit:30};
  const read=(key,fallback)=>{try{const v=localStorage.getItem(key);return v===null?fallback:JSON.parse(v)}catch{return fallback}};
  const write=(key,value)=>{try{localStorage.setItem(key,JSON.stringify(value));return true}catch{return false}};
  const settings=Object.assign({},defaults,read(STORE.settings,{}));
  const translations={
    en:{allTools:'All tools',about:'About',myToolbox:'My Toolbox',donate:'Donate',settings:'Settings',search:'Search tools',clear:'Clear',open:'Open tool',browserBased:'Browser based'},
    es:{allTools:'Todas las herramientas',about:'Acerca de',myToolbox:'Mi caja de herramientas',donate:'Donar',settings:'Ajustes',search:'Buscar herramientas',clear:'Borrar',open:'Abrir herramienta',browserBased:'En el navegador'},
    fr:{allTools:'Tous les outils',about:'À propos',myToolbox:'Ma boîte à outils',donate:'Faire un don',settings:'Paramètres',search:'Rechercher des outils',clear:'Effacer',open:'Ouvrir l’outil',browserBased:'Dans le navigateur'},
    de:{allTools:'Alle Werkzeuge',about:'Über uns',myToolbox:'Meine Toolbox',donate:'Spenden',settings:'Einstellungen',search:'Werkzeuge suchen',clear:'Leeren',open:'Werkzeug öffnen',browserBased:'Im Browser'},
    it:{allTools:'Tutti gli strumenti',about:'Informazioni',myToolbox:'La mia cassetta',donate:'Dona',settings:'Impostazioni',search:'Cerca strumenti',clear:'Cancella',open:'Apri strumento',browserBased:'Nel browser'}
  };
  function syncThemeControls(){
    const isLight=root.dataset.theme==='light';
    document.querySelectorAll('[data-theme-toggle],button[onclick="toggleTheme()"]').forEach(button=>{
      button.dataset.themeToggle='';
      button.textContent=isLight?'☾':'☀';
      button.setAttribute('aria-label',isLight?'Switch to dark theme':'Switch to light theme');
      button.title=isLight?'Dark theme':'Light theme';
      button.setAttribute('aria-pressed',String(!isLight));
    });
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.content=isLight?'#f4faf6':'#06110c';
  }
  function applySettings(){
    const savedTheme=localStorage.getItem(STORE.theme); if(savedTheme==='light'||savedTheme==='dark')root.dataset.theme=savedTheme;
    if(!root.dataset.theme)root.dataset.theme='dark';
    root.lang=settings.language||'en';
    root.style.fontSize=`${Math.max(85,Math.min(125,Number(settings.fontScale)||100))}%`;
    root.classList.toggle('reduce-motion',!!settings.reducedMotion);
    document.querySelectorAll('[data-i18n]').forEach(el=>{const key=el.dataset.i18n;const value=(translations[settings.language]||translations.en)[key];if(value)el.textContent=value});
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{const key=el.dataset.i18nPlaceholder;const value=(translations[settings.language]||translations.en)[key];if(value)el.setAttribute('placeholder',value)});
    syncThemeControls();
  }
  window.toggleTheme=()=>{root.dataset.theme=root.dataset.theme==='light'?'dark':'light';localStorage.setItem(STORE.theme,root.dataset.theme);syncThemeControls();announce(root.dataset.theme==='light'?'Light theme enabled':'Dark theme enabled')};
  window.escapeHtml=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  window.copyText=async t=>{try{await navigator.clipboard.writeText(String(t));announce('Copied to clipboard');return true}catch{announce('Copy failed');return false}};
  window.downloadBlob=(name,data,type='text/plain')=>{const a=document.createElement('a');a.href=URL.createObjectURL(data instanceof Blob?data:new Blob([data],{type}));a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1200)};
  window.fmt=(n,d=2)=>Number.isFinite(Number(n))?new Intl.NumberFormat('en-US',{maximumFractionDigits:d}).format(Number(n)):'—';
  window.money=(n,currency='USD')=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:2}).format(Number(n)||0);
  window.otRead=read; window.otWrite=write; window.otSettings=settings;

  function announce(message){let live=document.querySelector('#otLive');if(!live){live=document.createElement('div');live.id='otLive';live.className='sr-only';live.setAttribute('role','status');live.setAttribute('aria-live','polite');document.body.append(live)}live.textContent='';requestAnimationFrame(()=>live.textContent=message)}
  window.otAnnounce=announce;

  function ensureSkipLink(){if(document.querySelector('.skip-link'))return;const a=document.createElement('a');a.className='skip-link';a.href='#main-content';a.textContent='Skip to main content';document.body.prepend(a);const main=document.querySelector('main');if(main&&!main.id)main.id='main-content'}

  function recordVisit(){
    if(!settings.historyEnabled)return;
    const slug=document.body.dataset.tool;if(!slug)return;
    const meta=(window.TOOLBOX_TOOLS||[]).find(t=>t.slug===slug);if(!meta)return;
    const history=read(STORE.history,[]).filter(x=>x.slug!==slug);
    history.unshift({slug,title:meta.title,category:meta.category,icon:meta.icon,visitedAt:new Date().toISOString(),runs:0});
    write(STORE.history,history.slice(0,Math.max(5,Number(settings.historyLimit)||30)));
  }
  function recordRun(){
    if(!settings.historyEnabled)return;
    const slug=document.body.dataset.tool;if(!slug)return;
    const meta=(window.TOOLBOX_TOOLS||[]).find(t=>t.slug===slug);if(!meta)return;
    const history=read(STORE.history,[]);let item=history.find(x=>x.slug===slug);
    if(!item){item={slug,title:meta.title,category:meta.category,icon:meta.icon,runs:0};history.unshift(item)}
    item.runs=(item.runs||0)+1;item.lastRunAt=new Date().toISOString();item.visitedAt=item.visitedAt||item.lastRunAt;
    write(STORE.history,history.slice(0,Math.max(5,Number(settings.historyLimit)||30)));
  }
  function restoreForm(){
    if(!settings.saveToolInputs)return;
    const slug=document.body.dataset.tool;if(!slug)return;
    const saved=read(STORE.formPrefix+slug,null);if(!saved)return;
    requestAnimationFrame(()=>Object.entries(saved).forEach(([id,value])=>{const el=document.getElementById(id);if(!el)return;if(el.type==='checkbox')el.checked=!!value;else el.value=value;el.dispatchEvent(new Event('input',{bubbles:true}))}));
  }
  let saveTimer;
  function saveForm(){
    if(!settings.saveToolInputs)return;
    const slug=document.body.dataset.tool;if(!slug)return;
    clearTimeout(saveTimer);saveTimer=setTimeout(()=>{const data={};document.querySelectorAll('#toolApp input,#toolApp textarea,#toolApp select').forEach(el=>{if(el.id)data[el.id]=el.type==='checkbox'?el.checked:el.value});write(STORE.formPrefix+slug,data)},250);
  }

  function addNavUtilities(){
    const nav=document.querySelector('.nav-links');if(!nav)return;
    if(!nav.querySelector('[data-my-toolbox]')){
      const a=document.createElement('a');a.dataset.myToolbox='';a.href=pathDepth+'my-toolbox.html';a.dataset.i18n='myToolbox';a.textContent='My Toolbox';
      const donate=nav.querySelector('.nav-donate');nav.insertBefore(a,donate||nav.firstChild);
    }
    if(!nav.querySelector('[data-settings-open]')){
      const b=document.createElement('button');b.type='button';b.className='icon-btn';b.dataset.settingsOpen='';b.setAttribute('aria-label','Open settings');b.title='Settings';b.textContent='⚙';nav.append(b);
    }
  }
  function settingsDialog(){
    if(document.querySelector('#settingsDialog'))return;
    const dialog=document.createElement('dialog');dialog.id='settingsDialog';dialog.className='settings-dialog';dialog.innerHTML=`
      <form method="dialog" class="dialog-card">
        <div class="dialog-head"><div><span class="panel-label">Local preferences</span><h2>OpenToolbox settings</h2></div><button class="icon-btn" value="cancel" aria-label="Close settings">×</button></div>
        <div class="settings-grid">
          <label class="field"><span>Interface language</span><select id="otLanguage"><option value="en">English</option><option value="es">Español</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="it">Italiano</option></select></label>
          <label class="field"><span>Text size</span><select id="otFontScale"><option value="90">Compact</option><option value="100">Default</option><option value="110">Large</option><option value="120">Extra large</option></select></label>
          <label class="check-row"><input id="otReducedMotion" type="checkbox"><span><strong>Reduce motion</strong><small>Minimise interface animation.</small></span></label>
          <label class="check-row"><input id="otSaveInputs" type="checkbox"><span><strong>Save tool inputs locally</strong><small>Restore form values on this device.</small></span></label>
          <label class="check-row"><input id="otHistory" type="checkbox"><span><strong>Store local usage history</strong><small>Keep recently opened and used tools on this device.</small></span></label>
        </div>
        <div class="actions"><button class="btn primary" id="saveSettings" value="default">Save settings</button><button class="btn ghost" value="cancel">Cancel</button></div>
      </form>`;
    document.body.append(dialog);
    const sync=()=>{dialog.querySelector('#otLanguage').value=settings.language;dialog.querySelector('#otFontScale').value=String(settings.fontScale);dialog.querySelector('#otReducedMotion').checked=!!settings.reducedMotion;dialog.querySelector('#otSaveInputs').checked=!!settings.saveToolInputs;dialog.querySelector('#otHistory').checked=!!settings.historyEnabled};
    document.addEventListener('click',e=>{if(e.target.closest('[data-settings-open]')){sync();dialog.showModal()}});
    dialog.querySelector('#saveSettings').addEventListener('click',e=>{e.preventDefault();Object.assign(settings,{language:dialog.querySelector('#otLanguage').value,fontScale:Number(dialog.querySelector('#otFontScale').value),reducedMotion:dialog.querySelector('#otReducedMotion').checked,saveToolInputs:dialog.querySelector('#otSaveInputs').checked,historyEnabled:dialog.querySelector('#otHistory').checked});write(STORE.settings,settings);applySettings();dialog.close();announce('Settings saved')});
    dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
  }

  function keyboardShortcuts(e){
    const mod=e.ctrlKey||e.metaKey;
    if(mod&&e.key.toLowerCase()==='k'){e.preventDefault();const search=document.querySelector('#toolSearch');if(search){search.focus();search.select()}else location.href=pathDepth+'index.html#tools'}
    if(mod&&e.key==='Enter'){const run=document.querySelector('#run');if(run){e.preventDefault();run.click()}}
    if(e.altKey&&e.key.toLowerCase()==='h'){e.preventDefault();location.href=pathDepth+'index.html'}
    if(e.key==='Escape'){document.querySelectorAll('dialog[open]').forEach(d=>d.close());const nav=document.querySelector('.nav-links.open');if(nav){nav.classList.remove('open');document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded','false')}}
    if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName||'')){const search=document.querySelector('#toolSearch');if(search){e.preventDefault();search.focus()}}
  }

  document.addEventListener('click',e=>{
    const menu=e.target.closest('[data-menu-toggle]');if(menu){const nav=document.getElementById(menu.getAttribute('aria-controls')||'mainNav');const open=nav?.classList.toggle('open');menu.setAttribute('aria-expanded',String(!!open));}
    const navLink=e.target.closest('.nav-links a');if(navLink){const nav=navLink.closest('.nav-links');nav?.classList.remove('open');document.querySelector('[data-menu-toggle]')?.setAttribute('aria-expanded','false')}
    const b=e.target.closest('[data-copy]');if(b){const el=document.querySelector(b.dataset.copy);copyText(el?.value??el?.textContent??'').then(ok=>{const old=b.textContent;b.textContent=ok?'Copied':'Copy failed';setTimeout(()=>b.textContent=old,1200)})}
    if(e.target.closest('#run,[data-run-tool]'))recordRun();
  },true);
  document.addEventListener('input',e=>{if(e.target.closest('#toolApp'))saveForm()});
  document.addEventListener('keydown',keyboardShortcuts);

  applySettings();
  document.addEventListener('DOMContentLoaded',()=>{ensureSkipLink();addNavUtilities();settingsDialog();applySettings();recordVisit();restoreForm()});

  let installPrompt=null;
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;document.querySelectorAll('[data-install-app]').forEach(b=>b.hidden=false)});
  window.otInstallApp=async()=>{if(!installPrompt)return false;installPrompt.prompt();const result=await installPrompt.userChoice;installPrompt=null;return result.outcome==='accepted'};
  document.addEventListener('click',e=>{if(e.target.closest('[data-install-app]'))window.otInstallApp()});

  if('serviceWorker' in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register(pathDepth+'service-worker.js').catch(()=>{}));
})();
