async function loadPartials() {
  const targets = document.querySelectorAll('[data-include]');

  await Promise.all(
    Array.from(targets).map(async (target) => {
      const file = target.dataset.include;

      try {
        const response = await fetch(file);
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`);
        }

        target.outerHTML = await response.text();
      } catch (error) {
        console.error(error);
        target.outerHTML = `<!-- ${file} could not be loaded -->`;
      }
    })
  );
}

function initRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    }
  );

  document.querySelectorAll('.reveal, .diagnose-container').forEach((element) => {
    observer.observe(element);
  });
}

function initHeroCTA() {
  const heroCTA = document.querySelector('section a.reveal[href="#apply"]');
  const signalDelay = 6000 * 0.5;

  setTimeout(() => {
    if (!heroCTA) {
      return;
    }

    heroCTA.classList.remove('bg-white', 'text-black');
    heroCTA.classList.add('bg-accent', 'text-white');
  }, signalDelay);
}

async function initPage() {
  await loadPartials();
  initRevealObserver();
  initHeroCTA();
}

document.addEventListener('DOMContentLoaded', initPage);
