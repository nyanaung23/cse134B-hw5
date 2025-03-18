document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.cards-container');

  function renderCards(data) {
      container.innerHTML = '';
      data.forEach(item => {
          const card = document.createElement('project-card');
          card.setAttribute('title', item.title);
          card.setAttribute('image', item.image);
          card.setAttribute('alt', item.alt);
          card.setAttribute('description', item.description);
          card.setAttribute('link', item.link);
          container.appendChild(card);
      });
  }

  document.getElementById('loadLocal').addEventListener('click', () => {
      const data = localStorage.getItem('projectData');
      if (data) {
          renderCards(JSON.parse(data));
      } else {
          console.error('No data found in localStorage.');
          container.innerHTML = '<p>No local data available. Please load from remote to populate.</p>';
      }
  });

  document.getElementById('loadRemote').addEventListener('click', () => {
      fetch('data.json')
          .then(response => response.json())
          .then(data => {
              localStorage.setItem('projectData', JSON.stringify(data));
              renderCards(data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              container.innerHTML = '<p>Error loading remote data. Please try again later.</p>';
          });
  });
});
