function downloadJSON({ data, name }) {
  const stringifuProducts = JSON.stringify(data);
  const blob = new Blob([stringifuProducts], { type: "application/json" });
  const urlBlob = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.download = name;
  a.href = urlBlob;
  a.click();
  a.remove();
}
