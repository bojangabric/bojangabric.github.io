function deleteRow(r) {
  var i = r.parentNode.parentNode.parentNode.rowIndex;
  document.getElementById("table").deleteRow(i);
}
