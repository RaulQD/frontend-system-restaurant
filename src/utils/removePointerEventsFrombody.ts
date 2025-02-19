export function removePointerEventsFromBody() {
  if (document.body.style.pointerEvents === "none") {
      document.body.style.pointerEvents = "";
  }
}