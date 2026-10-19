import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(fileURLToPath(import.meta.url));const port=Number(process.env.PORT||4194);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg'};
const publicFiles=new Set(['index.html','style.css','app.js','content.js','lib/forms.js','lib/enquiries.js','favicon.svg','site.config.js','storefront.js','storefront.css']);
http.createServer(async(req,res)=>{
 const headers={'X-Robots-Tag':'noindex, nofollow, noarchive','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'"};
 try{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,headers);res.end('This preview does not accept submissions.');return;}
  let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=pathname.replace(/^\//,'');
  if(['/'].includes(pathname))file='index.html';
  if(/^previews\/(signal|framework)\/$/.test(file))file+='index.html';
  const demo=/^previews\/(signal|framework)\/(index.html|app.js|content.js|site.config.js|style.css|favicon.svg|lib\/forms.js|assets\/[a-z0-9-]+\.(png|webp|jpg|svg))$/.test(file);
  if(!demo&&!publicFiles.has(file)&&!/^assets\/[a-z0-9-]+\.(png|webp|jpg|svg)$/.test(file)){res.writeHead(404,headers);res.end('Preview page not found.');return;}
  const target=path.join(root,file);if(!(await stat(target)).isFile())throw Error();
  const body=await readFile(target);res.writeHead(200,{...headers,'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(404,headers);res.end('Preview asset not found.');}
}).listen(port,'127.0.0.1',()=>console.log(`Agency preview studio: http://127.0.0.1:${port}`));
