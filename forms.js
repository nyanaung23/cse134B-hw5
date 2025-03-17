document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const commentsInput = document.getElementById('comments');
  const errorOutput = document.getElementById('error');
  const infoOutput = document.getElementById('info');

  let form_errors = [];

  function logError(input, message) {
      const errorDetail = {
          field: input.name,
          value: input.value,
          errorMessage: message,
          timestamp: new Date().toISOString()
      };
      form_errors.push(errorDetail);
      displayError(input, message);
  }

  function displayError(input, message) {
      errorOutput.textContent = message;
      errorOutput.style.display = 'block';
      setTimeout(() => {
          errorOutput.style.display = 'none';
      }, 5000);
      input.classList.add('invalid');
      input.setCustomValidity(message);
  }

  function validateInput(input, regexPattern, errorMessage) {
      input.addEventListener('input', () => {
          if (input.value.length > 0 && !regexPattern.test(input.value)) {
              logError(input, errorMessage);
          } else {
              input.setCustomValidity('');
              input.classList.remove('invalid');
          }
      });
  }

  nameInput.addEventListener('input', () => {
      if (nameInput.value.length > 0 && nameInput.value.length < 3) {
          logError(nameInput, 'Please enter at least 3 letters for the name.');
      } else {
          nameInput.setCustomValidity('');
          nameInput.classList.remove('invalid');
      }
  });

  validateInput(emailInput, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.');

  commentsInput.addEventListener('input', () => {
      const remaining = 500 - commentsInput.value.length;
      infoOutput.textContent = `${remaining} characters remaining`;
      infoOutput.style.color = remaining <= 50 ? 'red' : 'black';
      if (commentsInput.value.length > 0 && commentsInput.value.length < 5) {
          logError(commentsInput, 'Please enter at least 5 letters for comments.');
      } else if (remaining < 0) {
          logError(commentsInput, 'Character limit exceeded!');
      } else {
          commentsInput.setCustomValidity('');
          commentsInput.classList.remove('invalid');
      }
  });

  form.addEventListener('submit', (event) => {
      setTimeout(() => {
          if (!form.checkValidity() || form_errors.length > 0) {
              event.preventDefault(); 

              const formErrorsInput = document.createElement('input');
              formErrorsInput.type = 'hidden';
              formErrorsInput.name = 'form-errors';
              formErrorsInput.value = JSON.stringify(form_errors);

              form.appendChild(formErrorsInput); 
              form.submit();
          }
      }, 100);
  });
});

