(()=>{
'use strict';
const tools=window.TOOLBOX_TOOLS||[];
const search=document.querySelector('#toolSearch');
const clear=document.querySelector('#clearSearch');
const count=document.querySelector('#resultCount');
const tabs=[...document.querySelectorAll('[data-category-filter]')];
const cards=[...document.querySelectorAll('.tool-card')];
const empty=document.querySelector('#emptyState');
const favourites=new Set(window.otRead?.('ot-favourites',[])||[]);
let category='All';
const normalise=value=>String(value||'').toLowerCase().trim();
function render(){
  const q=normalise(search?.value);let shown=0;
  cards.forEach(card=>{
    const catMatch=category==='All'||(category==='Favourites'?favourites.has(card.dataset.slug):card.dataset.category===category);
    const searchMatch=!q||normalise(card.dataset.search).includes(q);
    const visible=catMatch&&searchMatch;card.hidden=!visible;if(visible)shown++;
  });
  if(count)count.textContent=shown;if(empty)empty.hidden=shown!==0;if(clear)clear.hidden=!q;
  const url=new URL(location.href);q?url.searchParams.set('q',q):url.searchParams.delete('q');category!=='All'?url.searchParams.set('category',category):url.searchParams.delete('category');history.replaceState(null,'',url);
}
function setCategory(next){category=next||'All';tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.categoryFilter===category));render()}
tabs.forEach(tab=>tab.addEventListener('click',()=>setCategory(tab.dataset.categoryFilter)));
search?.addEventListener('input',render);
clear?.addEventListener('click',()=>{search.value='';search.focus();render()});
document.querySelectorAll('[data-jump-category]').forEach(link=>link.addEventListener('click',()=>setCategory(link.dataset.jumpCategory)));
document.querySelector('#toolGrid')?.addEventListener('click',event=>{
  const button=event.target.closest('[data-fav]');if(!button)return;event.preventDefault();
  const slug=button.dataset.fav;favourites.has(slug)?favourites.delete(slug):favourites.add(slug);
  window.otWrite?.('ot-favourites',[...favourites]);button.classList.toggle('active',favourites.has(slug));
  button.setAttribute('aria-label',(favourites.has(slug)?'Remove ':'Add ')+slug.replaceAll('-',' ')+(favourites.has(slug)?' from favourites':' to favourites'));
  updatePersonal();if(category==='Favourites')render();
});
function miniCard(t,extra=''){return `<a class="mini-tool" href="tools/${escapeHtml(t.slug)}/"><span aria-hidden="true">${escapeHtml(t.icon)}</span><span><strong>${escapeHtml(t.title)}</strong><small>${escapeHtml(t.category)}${extra}</small></span></a>`}
function updatePersonal(){
  cards.forEach(card=>card.querySelector('[data-fav]')?.classList.toggle('active',favourites.has(card.dataset.slug)));
  const favTools=tools.filter(t=>favourites.has(t.slug));
  const history=window.otRead?.('ot-history',[])||[];
  const recent=history.slice(0,6).map(h=>tools.find(t=>t.slug===h.slug)||h).filter(Boolean);
  const favEl=document.querySelector('#favouriteTools'),recentEl=document.querySelector('#recentTools'),section=document.querySelector('#personalSections');
  if(favEl)favEl.innerHTML=favTools.slice(0,6).map(t=>miniCard(t)).join('')||'<p class="muted">Star tools to see them here.</p>';
  if(recentEl)recentEl.innerHTML=recent.map(t=>miniCard(t,t.runs?` · ${t.runs} run${t.runs===1?'':'s'}`:'')).join('')||'<p class="muted">Recently opened tools will appear here.</p>';
  if(section)section.hidden=!(favTools.length||recent.length);
  const favCount=document.querySelector('#favCount');if(favCount)favCount.textContent=favourites.size;
}
function applyCategoryPreferences(){
  const prefs=window.otRead?.('ot-category-settings',null);if(!prefs)return;
  const overview=document.querySelector('#categoryOverview');if(!overview)return;
  const map=new Map([...overview.children].map(el=>[el.dataset.categoryCard,el]));
  const order=Array.isArray(prefs.order)?prefs.order:[...map.keys()];
  order.forEach(name=>{const el=map.get(name);if(el){el.hidden=Array.isArray(prefs.hidden)&&prefs.hidden.includes(name);overview.append(el)}});
}
document.querySelector('#clearRecent')?.addEventListener('click',()=>{window.otWrite?.('ot-history',[]);updatePersonal()});
const params=new URLSearchParams(location.search);if(params.get('q'))search.value=params.get('q');if(params.get('category')&&tabs.some(t=>t.dataset.categoryFilter===params.get('category')))category=params.get('category');
applyCategoryPreferences();updatePersonal();setCategory(category);
})();
