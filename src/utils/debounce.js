let debouncertime;
export const debounce = (callback, time = 300) => {
  window.clearTimeout(debouncertime);
  debouncertime = Number(setTimeout(callback, time) ?? 0);
};
