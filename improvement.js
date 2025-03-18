document.addEventListener('DOMContentLoaded', function() {
  const projectItems = document.querySelectorAll('.grid-item');

  projectItems.forEach(item => {
      item.addEventListener('mouseover', () => {
          item.style.transform = 'scale(1.1)';
          item.style.transition = 'transform 0.3s ease-in-out';
      });

      item.addEventListener('mouseout', () => {
          item.style.transform = 'scale(1)';
      });
  });
});