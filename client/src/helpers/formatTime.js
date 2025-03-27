function formatTime(string) {
  if (!string) return "";
  return string.substring(0, 5);
}

export default formatTime;