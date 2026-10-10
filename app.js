const $ = (id) => document.getElementById(id);
$("year").textContent = new Date().getFullYear();

$("menuBtn").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a => a.addEventListener("click", () => $("nav").classList.remove("open")));

async function loadProfile() {
  try {
    const response = await fetch("profile.json", { cache: "no-store" });
    if (!response.ok) throw new Error("profile.json not found");
    const p = await response.json();
    $("profileName").textContent = p.name || "Rayy";
    $("profileHandle").textContent = p.handle || "@rayy · Creative designer & web explorer";
    $("profileBio").textContent = p.bio || "";
    $("avatarImg").src = p.avatar || "assets/avatar.svg";
    const tags = Array.isArray(p.tags) ? p.tags : [];
    $("profileTags").replaceChildren(...tags.map(tag => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }));
    if (p.title) document.title = p.title + " — LYRS SPACE";
  } catch (e) {
    console.warn("Could not load profile.json. Using default profile.", e);
  }
}
loadProfile();

const fileInput = $("audioFile"), player = $("audioPlayer");
let currentAudioUrl = null;
fileInput.addEventListener("change", () => {
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  if (currentAudioUrl) URL.revokeObjectURL(currentAudioUrl);
  currentAudioUrl = URL.createObjectURL(file);
  player.src = currentAudioUrl;
  player.hidden = false;
  $("audioName").textContent = file.name;
  player.play().catch(() => {});
});