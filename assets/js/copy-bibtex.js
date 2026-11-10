async function copyBibtex(element) {
  if (element.dataset.copying === "true") return;

  const template = document.getElementById(element.dataset.bibtex);
  const originalText = element.textContent;
  element.dataset.copying = "true";

  try {
    const bibtex = template?.content?.textContent.trim();
    if (!bibtex) throw new Error("BibTeXが見つかりません");

    await navigator.clipboard.writeText(bibtex);
    element.textContent = "Copied!";
  } catch (error) {
    element.textContent = "Copy failed";
    console.error(error);
  } finally {
    setTimeout(() => {
      element.textContent = originalText;
      delete element.dataset.copying;
    }, 2000);
  }
}

document.addEventListener("click", (event) => {
  const element = event.target.closest("a.copy-bibtex");
  if (!element) return;

  event.preventDefault();
  copyBibtex(element);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const element = event.target.closest("span.copy-bibtex");
  if (!element) return;

  event.preventDefault();
  copyBibtex(element);
});
