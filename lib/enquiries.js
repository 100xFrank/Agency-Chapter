export const enquiryEmail='inventure.contact@gmail.com';
export function enquiryLink(values,{template='Custom website'}={}){
 const clean=value=>String(value||'').replace(/[\r\n]+/g,' ').trim();
 const body=['Hello Inventure,','',`Starting point: ${clean(template)}`,`Name: ${clean(values.name)}`,`Email: ${clean(values.email)}`,`Business: ${clean(values.business)}`,`Current website: ${clean(values.website)||'Not provided'}`,'','My brief:',String(values.message||'').trim(),'','Please confirm the scope, price, payment schedule, revisions, hosting and handover in a written quote. This is an enquiry, not an order or payment.'].join('\r\n');
 return `mailto:${enquiryEmail}?subject=${encodeURIComponent(`Website enquiry — ${clean(template)}`)}&body=${encodeURIComponent(body)}`;
}
