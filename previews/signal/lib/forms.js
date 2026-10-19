export const limits={name:100,email:254,business:150,website:2048,service:80,message:2000};
export function validate(values){
 const errors={};
 for(const [key,max] of Object.entries(limits))if(typeof values[key]!=='string'||values[key].length>max)errors[key]=`Use at most ${max} characters.`;
 for(const key of ['name','email','business','service','message'])if(!String(values[key]||'').trim())errors[key]='Please complete this field.';
 if(values.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))errors.email='Enter an email address such as name@example.com.';
 if(values.website){try{const u=new URL(values.website);if(!['https:','http:'].includes(u.protocol)||u.username||u.password||!u.hostname.includes('.'))throw Error();}catch{errors.website='Enter a full website address starting with https://, or leave it blank.';}}
 if(values.service&&!['new','refresh','discuss'].includes(values.service))errors.service='Choose a service from the list.';
 return errors;
}
// Intentionally no fetch, storage or form destination. Live mode is not implemented.
export async function simulate(values,{mode='demo',failure=false,delay=850,wait=ms=>new Promise(resolve=>setTimeout(resolve,ms))}={}){
 if(mode!=='demo')throw Error('Live enquiries are not configured. Nothing was sent.');
 if(Object.keys(validate(values)).length)throw Error('Please correct the highlighted fields.');
 await wait(delay);
 if(failure)throw Error('Demo failure: the enquiry could not be simulated. Your details are still here. Turn off the failure test and try again.');
 return {sent:false,stored:false,message:'Demo complete. No enquiry was sent or stored, and no meeting was booked.'};
}
