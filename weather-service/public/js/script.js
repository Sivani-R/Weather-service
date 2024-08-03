document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const input = document.querySelector('input[name="city"]');
    const error = document.querySelector('.error');
  
    form.addEventListener('submit', (e) => {
      if (input.value.trim() === '') {
        e.preventDefault();
        error.textContent = 'Please enter a city name.';
        error.style.display = 'block';
      } else {
        error.style.display = 'none';
      }
    });
  });
  