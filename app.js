(() => {
const $ = s => document.querySelector(s);
$('#year').textContent = new Date().getFullYear();
const nav = $('#nav'), menuBtn = $('#menuBtn');
menuBtn.addEventListener('click', () => { nav.classList.toggle('open'); menuBtn.textContent = nav.classList.contains('open') ? '×' : '☰'; });
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); menuBtn.textContent='☰'; }));
const revealItems = document.querySelectorAll('.section,.stats,.project');
if ('IntersectionObserver' in window) {
  revealItems.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target);} }), {threshold:.08});
  revealItems.forEach(el => observer.observe(el));
} else revealItems.forEach(el => el.classList.add('visible'));

const defaults = {name:'Rayy', bio:'I like turning little ideas into things people can explore. Currently building my own corner of the internet, one project at a time.'};
const read = (k,d) => { try { return localStorage.getItem(k) ?? d; } catch(e) { return d; } };
const write = (k,v) => { try { localStorage.setItem(k,v); } catch(e) {} };
const dialog=$('#profileDialog'), nameInput=$('#nameInput'), bioInput=$('#bioInput');
function render(){
  $('#name').textContent=read('lyrsSpaceName',defaults.name);
  $('#bio').textContent=read('lyrsSpaceBio',defaults.bio);
  nameInput.value=$('#name').textContent; bioInput.value=$('#bio').textContent;
  const avatar=read('lyrsSpaceAvatar','');
  $('#avatar').innerHTML=avatar ? `<img alt="Profile avatar" src="${avatar}">` : 'R';
}
render();
$('#editBtn').addEventListener('click',()=>dialog.showModal());
$('#closeDialog').addEventListener('click',()=>dialog.close());
$('#cancelEdit').addEventListener('click',()=>dialog.close());
$('#profileForm').addEventListener('submit',e=>{
  e.preventDefault();
  write('lyrsSpaceName',nameInput.value.trim().slice(0,32)||defaults.name);
  write('lyrsSpaceBio',bioInput.value.trim().slice(0,180)||defaults.bio);
  render(); dialog.close();
});
$('#avatarFile').addEventListener('change',e=>{
  const file=e.target.files?.[0]; if(!file)return;
  if(file.size>2*1024*1024){alert('Pilih gambar/GIF maksimal 2 MB untuk demo ini.');return;}
  if(!file.type.startsWith('image/')&&!/\.gif$/i.test(file.name)){alert('Pilih file gambar atau GIF.');return;}
  const reader=new FileReader(); reader.onload=()=>{write('lyrsSpaceAvatar',String(reader.result));render();};reader.readAsDataURL(file);
});
let audioURL=null;
$('#audioFile').addEventListener('change',e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(audioURL)URL.revokeObjectURL(audioURL);
  audioURL=URL.createObjectURL(file);const player=$('#audioPlayer');
  player.src=audioURL;player.hidden=false;player.load();$('#audioName').textContent=file.name;
});
})();