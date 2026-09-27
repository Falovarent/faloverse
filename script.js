document.addEventListener('DOMContentLoaded',()=>{
 const main=document.getElementById('main-site');const book=document.getElementById('book');const read=document.getElementById('read-more');const close=document.getElementById('close-book');const intro=document.getElementById('intro');
 // Always clear the intro, even if an image or animation fails.
 window.setTimeout(()=>{if(intro)intro.remove()},3200);
 document.querySelectorAll('[data-page]').forEach(button=>button.addEventListener('click',()=>{document.getElementById(button.dataset.page)?.scrollIntoView({behavior:'smooth',block:'start'})}));
 read?.addEventListener('click',()=>{main.hidden=true;book.hidden=false;close?.focus({preventScroll:true})});
 function closeComic(){book.hidden=true;main.hidden=false;read?.focus({preventScroll:true})}
 close?.addEventListener('click',closeComic);
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!book.hidden)closeComic()});
 const cursor=document.querySelector('.cursor');document.addEventListener('mousemove',event=>{if(cursor){cursor.style.left=event.clientX+'px';cursor.style.top=event.clientY+'px'}});
});
