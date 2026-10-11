const API_BASE = "https://api.jaky.dev";
const endpointData = [
 {category:"Lyrics",path:"/v1/lyrics/search",desc:"Cari lirik berdasarkan kata kunci atau judul lagu."},
 {category:"Lyrics",path:"/v1/lyrics/get",desc:"Ambil lirik untuk lagu yang dipilih. Lihat dokumentasi untuk parameter ID atau judul."},
 {category:"Lyrics",path:"/v1/lyrics/charts",desc:"Jelajahi daftar lagu populer atau chart."},
 {category:"Lyrics",path:"/v1/lyrics/artist",desc:"Cari atau lihat informasi artis terkait lirik."},
 {category:"Lyrics",path:"/v1/lyrics/album",desc:"Cari atau lihat informasi album."},
 {category:"Islamic",path:"/v1/islami/sholat",desc:"Endpoint jadwal salat terbaru; menggantikan route tools/jadwal-sholat."},
 {category:"Islamic",path:"/v1/islami/quran",desc:"Akses fitur Al-Qur'an. Parameter mengikuti dokumentasi resmi."},
 {category:"Islamic",path:"/v1/islami/doa",desc:"Akses koleksi doa."},
 {category:"Islamic",path:"/v1/islami/asmaul-husna",desc:"Akses Asmaul Husna."},
 {category:"Islamic",path:"/v1/islami/kisah-nabi",desc:"Akses kisah para nabi."},
 {category:"Islamic",path:"/v1/islami/kalender",desc:"Akses kalender Islam."},
 {category:"Anime",path:"/v1/anime/season",desc:"Lihat daftar anime berdasarkan musim."},
 {category:"Anime",path:"/v1/anime/search",desc:"Cari anime."},
 {category:"Anime",path:"/v1/anime/schedule",desc:"Lihat jadwal tayang anime."},
 {category:"Anime",path:"/v1/anime/manga",desc:"Cari atau akses informasi manga."},
 {category:"Anime",path:"/v1/anime/random",desc:"Ambil anime acak."},
 {category:"Downloader",path:"/v1/download/soundcloud",desc:"Endpoint downloader SoundCloud. Gunakan hanya untuk konten yang boleh diunduh."},
 {category:"Downloader",path:"/v1/download/twitter",desc:"Endpoint downloader Twitter/X. Gunakan hanya untuk konten yang boleh diunduh."},
 {category:"Search",path:"/v1/search/soundcloud",desc:"Cari track atau konten di SoundCloud."},
 {category:"DeepFake Maker",path:"/v1/deepfakemaker",desc:"Endpoint DeepFake Maker yang disebut telah diperbaiki pada update API."},
 {category:"Legacy",path:"/v1/tools/jadwal-sholat",desc:"Route lama. Gunakan /v1/islami/sholat sebagai pengganti.",legacy:true}
];
const $ = id => document.getElementById(id);
let selected = endpointData[0], activeCategory = "All", lastResponse = "";
$("endpointCount").textContent = `${endpointData.length} ROUTES`;
function categories(){return ["All",...new Set(endpointData.map(x=>x.category))]}
function renderFilters(){
 $("categoryFilters").replaceChildren(...categories().map(c=>{
  const b=document.createElement("button");b.type="button";b.className="filter-btn"+(activeCategory===c?" active":"");b.textContent=c;
  b.addEventListener("click",()=>{activeCategory=c;renderFilters();renderEndpoints()});return b;
 }));
}
function renderEndpoints(){
 const term=$("endpointSearch").value.trim().toLowerCase();
 const list=endpointData.filter(e=>(activeCategory==="All"||e.category===activeCategory)&&(`${e.path} ${e.category} ${e.desc}`).toLowerCase().includes(term));
 $("endpointList").replaceChildren(...list.map(e=>{
  const b=document.createElement("button");b.type="button";b.className="endpoint-item"+(selected.path===e.path?" active":"");
  const cat=document.createElement("span");cat.className="endpoint-category";cat.textContent=e.category.toUpperCase()+(e.legacy?" · LEGACY":"");
  const code=document.createElement("code");code.textContent=e.path;
  const sm=document.createElement("small");sm.textContent=e.desc;
  b.append(cat,code,sm);b.addEventListener("click",()=>chooseEndpoint(e));return b;
 }));
 if(!list.length){const p=document.createElement("p");p.className="field-help";p.textContent="Tidak ada endpoint yang cocok."; $("endpointList").append(p)}
}
function chooseEndpoint(e){
 selected=e;$("selectedTitle").textContent=e.path.split("/").filter(Boolean).slice(-1)[0].replace(/-/g," ");
 $("selectedDescription").textContent=e.desc;$("queryParams").value="";$("bodyParams").value="";
 $("method").value="GET";updateUrl();renderEndpoints();
}
function parseObject(value,label){
 if(!value.trim())return {};
 let parsed;try{parsed=JSON.parse(value)}catch{throw new Error(`${label} harus berupa JSON yang valid.`)}
 if(!parsed||Array.isArray(parsed)||typeof parsed!=="object")throw new Error(`${label} harus berupa JSON object, contoh {"q":"kata kunci"}.`);
 return parsed;
}
function buildUrl(){
 const params=parseObject($("queryParams").value,"Query parameters");
 const url=new URL(selected.path,API_BASE);
 Object.entries(params).forEach(([k,v])=>{if(v!==null&&v!==undefined)url.searchParams.set(k,typeof v==="object"?JSON.stringify(v):String(v))});
 return url.toString();
}
function updateUrl(){
 try{$("requestUrl").textContent=buildUrl()}catch{$("requestUrl").textContent=API_BASE+selected.path+"?…"}
}
function showOutput(value){lastResponse=typeof value==="string"?value:JSON.stringify(value,null,2);$("responseOutput").textContent=lastResponse}
$("endpointSearch").addEventListener("input",renderEndpoints);
$("queryParams").addEventListener("input",updateUrl);
$("method").addEventListener("change",()=>{$("requestUrl").textContent=buildUrl();});
$("copyUrl").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(buildUrl());$("requestStatus").textContent="URL copied"}catch{$("requestStatus").textContent="Copy tidak tersedia"}});
$("copyResponse").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(lastResponse);$("requestStatus").textContent="Response copied"}catch{$("requestStatus").textContent="Copy tidak tersedia"}});
$("clearRequest").addEventListener("click",()=>{$("queryParams").value="";$("bodyParams").value="";$("headerName").value="";$("headerValue").value="";$("method").value="GET";$("requestStatus").textContent="Reset";$("responseCode").textContent="NO RESPONSE";$("responseTime").textContent="—";showOutput({message:"Pilih endpoint lalu tekan Send request."});updateUrl()});
$("sendRequest").addEventListener("click",async()=>{
 let url, body;
 try{url=buildUrl();body=parseObject($("bodyParams").value,"Request body")}catch(e){$("requestStatus").textContent=e.message;return}
 const method=$("method").value, headers={Accept:"application/json"};
 if(method==="POST")headers["Content-Type"]=$("contentType").value;
 const hn=$("headerName").value.trim(),hv=$("headerValue").value;
 if((hn&&!hv)||(!hn&&hv)){$("requestStatus").textContent="Isi nama dan nilai header, atau kosongkan keduanya.";return}
 if(hn&&hv)headers[hn]=hv;
 const options={method,headers,mode:"cors"};
 if(method==="POST")options.body=JSON.stringify(body);
 $("sendRequest").disabled=true;$("sendRequest").style.opacity=".6";$("requestStatus").textContent="Requesting…";$("responseCode").textContent="WAITING";$("responseTime").textContent="—";showOutput({message:"Request sedang diproses…"});
 const start=performance.now();
 try{
  const response=await fetch(url,options);const raw=await response.text();let data;
  try{data=JSON.parse(raw)}catch{data=raw}
  $("responseCode").textContent=`HTTP ${response.status} ${response.ok?"OK":"ERROR"}`;$("responseTime").textContent=`${Math.round(performance.now()-start)} MS`;$("requestStatus").textContent=response.ok?"Selesai":"Request selesai dengan error";
  showOutput(data);
 }catch(err){
  $("responseCode").textContent="REQUEST FAILED";$("responseTime").textContent=`${Math.round(performance.now()-start)} MS`;
  showOutput({error:err.message,possible_causes:["Server API menolak CORS dari browser.","Endpoint mungkin memerlukan autentikasi.","Periksa URL, parameter, dan dokumentasi resmi."],note:"Detail jaringan browser bisa dilihat melalui DevTools. Coba endpoint dari API Playground untuk membandingkan."});
  $("requestStatus").textContent="Gagal — cek CORS / network";
 }finally{$("sendRequest").disabled=false;$("sendRequest").style.opacity="1"}
});
renderFilters();renderEndpoints();chooseEndpoint(endpointData[0]);
