export const ENV =
  window.location.origin.includes("192.168") ||
  window.location.origin.includes("localhost") ||
  window.location.origin.includes("html.5corners")
    ? "Local"
    : "Remote";
