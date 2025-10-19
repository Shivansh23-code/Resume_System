export const STORAGE_KEY = "resume_system_v1";

export function saveResumeState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadResumeState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}
