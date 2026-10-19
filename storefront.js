import {templates} from './content.js';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function gallery(){return `<section class="section template-section" id="work"><div class="wrap"><div class="section-heading"><div><p class="eyebrow">THE TEMPLATE COLLECTION / 01—02</p><h2>Your next chapter.<br><em>Already taking shape.</em></h2></div><p>Explore two complete starting points. Scroll inside each window, open the full experience, then make it yours.</p></div><div class="collection-toolbar"><div class="template-filters" role="group" aria-label="Filter templates">${['All templates',...new Set(templates.map(t=>t.category))].map((c,i)=>`<button type="button" data-category="${escape(c)}" aria-pressed="${i===0}">${escape(c)}</button>`).join('')}</div><span id="template-count" role="status">2 considered starting points</span></div><div class="template-grid">${templates.map((t,i)=>`<article class="template-card" data-template="${t.id}" data-category="${escape(t.category)}"><div class="preview-chrome"><span><i></i><i></i><i></i></span><span>0${i+1} / ${escape(t.name)}</span><span>LIVE DEMO ↘</span></div><div class="preview-viewport" id="viewport-${t.id}"><iframe src="./previews/${t.id}/index.html" title="${escape(t.name)} interactive website preview" loading="lazy" sandbox="allow-scripts allow-same-origin" tabindex="-1"></iframe><div class="preview-shield" aria-hidden="true"></div><p class="preview-fallback" hidden>We couldn’t load this preview. <a href="./previews/${t.id}/index.html" target="_blank" rel="noopener">Open the full preview ↗</a></p></div><div class="preview-tools"><button type="button" class="interact-toggle" aria-pressed="false" aria-controls="viewport-${t.id}">Interact with preview</button><span class="desktop-hint">Hover & scroll to explore</span><a href="./previews/${t.id}/index.html" target="_blank" rel="noopener">Open full preview ↗</a></div><div class="template-details"><p class="eyebrow">0${i+1} / ${escape(t.category)}</p><div class="template-title"><h3>${escape(t.name)}</h3><span class="template-price">${escape(t.price)}</span></div><p>${escape(t.description)}</p><ul class="template-features"><li>Responsive layout</li><li>Editable source</li><li>No framework lock-in</li></ul><div class="template-actions"><button class="button" type="button" data-buy="${t.id}">Buy template <span aria-hidden="true">↗</span></button><button class="button secondary" type="button" data-customize="${t.id}">Request customization <span aria-hidden="true">↗</span></button></div><p class="commerce-note">Preview collection · pricing and checkout not yet configured</p></div></article>`).join('')}</div><p class="empty-templates" hidden>No templates in this category yet.</p><aside class="bespoke-note"><span class="eyebrow">A DIFFERENT STARTING POINT?</span><h3>Made for your business.<br><em>Down to the last detail.</em></h3><p>Choose a template as your foundation, or explore a custom website. Scope, price and ongoing costs are agreed before work begins.</p><a class="button secondary" href="#contact">Explore a custom website ↗</a></aside></div></section><dialog id="template-dialog" aria-labelledby="template-dialog-title"><button class="dialog-close" type="button" aria-label="Close template details">×</button><p class="eyebrow">THE NEXT STEP</p><h2 id="template-dialog-title"></h2><p id="template-dialog-message"></p><p>No payment is taken and no request is sent from this preview.</p><a class="button" id="template-dialog-action" href="#contact">Prepare a customization brief ↗</a></dialog>`;}

export function initGallery(){
 const cards=[...document.querySelectorAll('.template-card')];
 document.querySelectorAll('[data-category][aria-pressed]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-category][aria-pressed]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  let count=0;cards.forEach(card=>{card.hidden=button.dataset.category!=='All templates'&&card.dataset.category!==button.dataset.category;if(!card.hidden)count++;else card.querySelector('.interact-toggle').dispatchEvent(new CustomEvent('deactivate'));});
  document.querySelector('#template-count').textContent=`${count} ${count===1?'template':'templates'} to explore`;
 }));
 const touch=matchMedia('(hover: none), (pointer: coarse), (max-width: 740px)');
 cards.forEach(card=>{
  const frame=card.querySelector('iframe'),toggle=card.querySelector('.interact-toggle'),fallback=card.querySelector('.preview-fallback');
  let ready=false;
  const activate=active=>{card.classList.toggle('preview-active',active);toggle.setAttribute('aria-pressed',String(active));toggle.textContent=active?'Done interacting':'Interact with preview';frame.tabIndex=active||!touch.matches?0:-1;};
  toggle.addEventListener('click',()=>activate(toggle.getAttribute('aria-pressed')!=='true'));
  toggle.addEventListener('deactivate',()=>activate(false));
  touch.addEventListener('change',()=>activate(false));
  card.addEventListener('keydown',event=>{if(event.key==='Escape'){activate(false);toggle.focus();}});
  const fail=()=>{if(!ready){fallback.hidden=false;card.classList.add('preview-unavailable');}};
  frame.addEventListener('error',fail);
  frame.addEventListener('load',()=>{
   try{
    const win=frame.contentWindow,doc=frame.contentDocument;
    if(!doc?.querySelector('#app')||!doc.querySelector('main')){fail();return;}
    ready=true;fallback.hidden=true;card.classList.remove('preview-unavailable');
    // Owned same-origin demos: cancel every wheel event, including at either edge.
    // Native scrolling outside this document remains entirely untouched.
    win.addEventListener('wheel',event=>{
     if(event.ctrlKey)return; // Preserve browser pinch-to-zoom.
     event.preventDefault();
     const factor=event.deltaMode===1?16:event.deltaMode===2?win.innerHeight:1;
     win.scrollBy({top:event.deltaY*factor,left:event.deltaX*factor,behavior:'instant'});
    },{passive:false});
    doc.documentElement.style.overscrollBehavior='none';doc.body.style.overscrollBehavior='none';
    doc.addEventListener('keydown',event=>{if(event.key==='Escape'){activate(false);toggle.focus();}});
    activate(false);
   }catch{fail();}
  });
  setTimeout(fail,12000);
 });
 const dialog=document.querySelector('#template-dialog');
 const selectBrief=t=>{const form=document.querySelector('#enquiry-form');form.elements.service.value='discuss';if(!form.elements.message.value.trim())form.elements.message.value=`I’m interested in customizing the ${t.name} template. My business and changes: `;document.querySelector('#brief-template').textContent=`Selected starting point: ${t.name}. Demo only — nothing will be sent.`;};
 document.querySelectorAll('[data-buy],[data-customize]').forEach(button=>button.addEventListener('click',()=>{
  const t=templates.find(t=>t.id===(button.dataset.buy||button.dataset.customize));const buy=!!button.dataset.buy;
  document.querySelector('#template-dialog-title').textContent=buy?`${t.name} — checkout coming soon`:`Make ${t.name} yours.`;
  document.querySelector('#template-dialog-message').textContent=buy?'The template price, licence, secure payment and download delivery still need to be configured. This template is available to preview; it cannot be purchased yet.':'Customization enquiries are not connected to a recipient yet. You can try the brief form below with fictional details; it will not send a request.';
  document.querySelector('#template-dialog-action').onclick=()=>{selectBrief(t);dialog.close();};dialog.showModal();
 }));
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
}
