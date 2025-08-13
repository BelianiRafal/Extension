// Global variable to save first element click
let lastCheckbox = null;

const form = document.querySelector("form[action='news_emails.php']");
const table = form.querySelector("table");
table.addEventListener("click", (ev) => {
  const target = ev.target;
  if (target instanceof HTMLTableCellElement) {
    const parent = target.parentNode;
    const id = parent.getAttribute("id");
    const style = parent.getAttribute("style");
    if (!id && style) {
      return;
    }
    const result = id.match(/\d+/);
    if (!result) return;
    const num_id = Number(result[0]);
    // Clear selection for reason to not show user blink on the screen.
    document.getSelection().removeAllRanges();
    if (ev.shiftKey && lastCheckbox !== null && lastCheckbox !== num_id) {
      handleShiftSelect(ev, num_id);
    }
    // Save clicked item first
    // This should be accessible inside handleShiftSelect
    lastCheckbox = num_id;
  }
});

let selectedItem = 1;

const handleShiftSelect = (ev, id) => {
  // going up or down ?
  // index - after shift and mouse clicking
  // since items sorted in descending order
  // 101 id clicked with shift button if it is lower than lastCheckBoxClicked 110
  // it means that id with shift clicked button locates lower than lastCheckBoxClicked
  const direction = id < lastCheckbox ? "down" : "up";
  const range = [];
  if (direction === "down") {
    for (let index = id; index <= lastCheckbox; index++) {
      range.push(index);
    }
  } else {
    for (let index = id; index >= lastCheckbox; index--) {
      range.push(index);
    }
  }
  for (let id of range) {
    const node = document.querySelector(`input[value='${id}']`);
    if (node) {
      node.checked = !node.checked;
    }
  }
  // are we checking all or unchecking all ?
  // const check = lastChange;
};
