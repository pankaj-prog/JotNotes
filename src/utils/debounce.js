let debouncerTime;
export const debounce = (callback, time = 300) => {
  window.clearTimeout(debouncerTime);
  debouncerTime = setTimeout(callback, time) ?? 0;
};
