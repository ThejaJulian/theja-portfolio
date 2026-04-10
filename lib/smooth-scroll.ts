/** Scroll offset for fixed navbar (px). Keep in sync with Navbar height. */
export const NAV_SCROLL_OFFSET = 72

export function scrollToSection(selector: string) {
  const el =
    selector.startsWith('#') ? document.getElementById(selector.slice(1)) : document.querySelector(selector)
  if (!el) return

  const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
}

export function scrollToSectionById(id: string) {
  scrollToSection(`#${id}`)
}
