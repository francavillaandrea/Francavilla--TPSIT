// Add event listeners to navigation menu items
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const href = link.getAttribute('href');
      document.querySelector(`#${href}`).scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  // Add animation to main image on hover
  document.querySelector('main img').addEventListener('mouseover', event => {
    event.target.style.transform = 'scale(1.1)';
    event.target.style.transition = 'transform 0.5s ease-in-out';
  });
  
  document.querySelector('main img').addEventListener('mouseout', event => {
    event.target.style.transform = 'scale(1)';
    event.target.style.transition = 'transform 0.5s ease-in-out';
  });
  
  // Add a fun quacking sound effect on page load
  const quackSound = new Audio('quack.mp3');
  quackSound.play();
  
  // Add a fun fact of the day on page load
  const funFactElement = document.querySelector('#fun-fact');
  const funFacts = [
    'Ducks have webbed feet!',
    'Ducks can fly up to 50 mph!',
    'Ducks have a special gland that helps them waterproof their feathers!',
    // Add more fun facts here...
  ];
  const randomFunFact = funFacts[Math.floor(Math.random() * funFacts.length)];
  funFactElement.textContent = randomFunFact;