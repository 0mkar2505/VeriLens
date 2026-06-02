export const AUTH_LOGOUT_EVENT = "verilens:auth-logout";

export function emitAuthLogout() {
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
}
