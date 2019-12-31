function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Unable to copy", err);
  }
  document.body.removeChild(textArea);
}

export function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard
    .writeText(text)
    .catch(err => console.error("Async: Could not copy text: ", err));
}
