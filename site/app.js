document.getElementById('greet').addEventListener('click', () => {
  document.getElementById('out').textContent = `Hello from your browser at ${new Date().toLocaleTimeString()}!`;
});
