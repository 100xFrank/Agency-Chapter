import {mkdir,copyFile,cp} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
for(const f of ['index.html','app.js','content.js','site.config.js','style.css','storefront.js','storefront.css','favicon.svg','.nojekyll'])await copyFile(f,'dist/'+f);
for(const d of ['assets','lib','previews'])await cp(d,'dist/'+d,{recursive:true});
console.log('Built standalone Chapter preview.');
