export function insertNodeAtCursor(node) {
  const sel = window.getSelection();

  if (sel.getRangeAt && sel.rangeCount) {
    const range = sel.getRangeAt(0);

    range.deleteContents();
    range.insertNode(node);
  }
}

export function saveSelection() {
  const sel = window.getSelection();

  if (sel.getRangeAt && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    return range;
  }

  return null;
}

export function restoreSelection(range) {
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function convertStringToDOMNode(string) {
  var wrapper = document.createElement('div');
  wrapper.innerHTML = string;

  return wrapper.firstChild;
}
