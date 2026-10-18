/**
 * Copies text to the clipboard. Returns false when every method fails.
 *
 * The async Clipboard API is missing on insecure origins (e.g. the dev server
 * opened over a LAN IP) and can be refused by permissions, so it falls back to
 * the legacy execCommand path, which still works in those cases.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the legacy path
  }

  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, text.length);
    const ok = document.execCommand("copy");
    el.remove();
    return ok;
  } catch {
    return false;
  }
}
