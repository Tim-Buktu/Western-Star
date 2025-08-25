/**
 * Beehiiv subscription helper.
 * If you have a Beehiiv embed form action URL, paste it into BEEHIIV_FORM_ACTION.
 * You can find it in Beehiiv > Grow > Embeds.
 */
export const BEEHIIV_FORM_ACTION = import.meta.env.VITE_BEEHIIV_FORM_ACTION || '';

export async function subscribeWithBeehiiv(email) {
  if (!BEEHIIV_FORM_ACTION) {
    // Fallback: mimic success in dev so the UI works before you configure Beehiiv.
    return { ok: true, dev: true };
  }
  const form = new FormData();
  form.append('email', email);
  // Some embeds also accept 'referrer' or 'audience' fields; add as needed.
  const res = await fetch(BEEHIIV_FORM_ACTION, { method: 'POST', body: form, mode: 'no-cors' });
  // With no-cors we cannot read status; assume success if no exception.
  return { ok: true };
}
