const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const toast = document.getElementById("toast");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2600);
}

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = { title: document.title, text: "How to Make Money Online in Kenya in 2026", url: window.location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch (error) { /* User cancelled sharing. */ }
  } else if (navigator.clipboard && window.isSecureContext) {
    try { await navigator.clipboard.writeText(window.location.href); showToast("Article link copied."); }
    catch (error) { showToast("Copy the website address from your browser to share it."); }
  } else {
    showToast("Copy the website address from your browser to share it.");
  }
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const article = document.getElementById("article");
  article.querySelectorAll(".search-highlight").forEach(node => node.replaceWith(document.createTextNode(node.textContent)));
  if (!query) { showToast("Type a word to search this article."); return; }
  const paragraphs = Array.from(article.querySelectorAll("p, h2, li"));
  const match = paragraphs.find(element => element.textContent.toLowerCase().includes(query));
  if (match) {
    match.scrollIntoView({ behavior: "smooth", block: "center" });
    match.style.outline = "1px solid white";
    window.setTimeout(() => match.style.outline = "", 1800);
    showToast("Found a match in the article.");
  } else {
    showToast("No match found. Try another keyword.");
  }
});
