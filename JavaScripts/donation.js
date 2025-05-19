document.querySelectorAll('.input').forEach(input => {
  input.addEventListener('focus', () => {
    input.style.backgroundColor = "#f1f8e9";
  });
  input.addEventListener('blur', () => {
    input.style.backgroundColor = "white";
  });
});