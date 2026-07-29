(()=>{
const search=document.querySelector('#toolSearch');
const clear=document.querySelector('#clearSearch');
const count=document.querySelector('#resultCount');
const tabs=[...document.querySelectorAll('[data-category-filter]')];
const cards=[...document.querySelectorAll('.tool-card')];
const empty=document.querySelector('#emptyState');
const favourites=new Set(JSON.parse(localStorage.getItem('ot-favourites')||'[]'));
let category='All';
function normalise(value){return String(value||'').toLowerCase().trim()}
function render(){
 const q=normalise(search?.value);
 let shown=0;
 cards.forEach(card=>{
   const categoryMatch=category==='All'||card.dataset.category===category;
   const searchMatch=!q||normalise(card.dataset.search).includes(q);
   const visible=categoryMatch&&searchMatch;
   card.hidden=!visible;
   if(visible)shown++;
 });
 if(count)count.textContent=shown;
 if(empty)empty.hidden=shown!==0;
 if(clear)clear.hidden=!q;
}
function setCategory(next){
 category=next||'All';
 tabs.forEach(tab=>tab.classList.toggle('active',tab.dataset.categoryFilter===category));
 render();
}
tabs.forEach(tab=>tab.addEventListener('click',()=>setCategory(tab.dataset.categoryFilter)));
search?.addEventListener('input',render);
clear?.addEventListener('click',()=>{search.value='';search.focus();render()});
document.querySelectorAll('[data-jump-category]').forEach(link=>link.addEventListener('click',()=>setCategory(link.dataset.jumpCategory)));
document.querySelector('#toolGrid')?.addEventListener('click',event=>{
 const button=event.target.closest('[data-fav]');
 if(!button)return;
 event.preventDefault();
 const slug=button.dataset.fav;
 favourites.has(slug)?favourites.delete(slug):favourites.add(slug);
 localStorage.setItem('ot-favourites',JSON.stringify([...favourites]));
 button.classList.toggle('active',favourites.has(slug));
 button.setAttribute('aria-label',(favourites.has(slug)?'Remove ':'Add ')+slug.replaceAll('-',' ')+(favourites.has(slug)?' from favourites':' to favourites'));
});
cards.forEach(card=>card.querySelector('[data-fav]')?.classList.toggle('active',favourites.has(card.querySelector('[data-fav]')?.dataset.fav)));
const params=new URLSearchParams(location.search);if(params.get('q'))search.value=params.get('q');
render();
})();
