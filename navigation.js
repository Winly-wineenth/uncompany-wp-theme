
function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
}

function addNavigation() {
  // Create and add an overlay just before the header
  const navigation = document.querySelector('.navigation');
  const overlay = document.createElement('div');
  overlay.classList.add('navigation-overlay');
  navigation.parentNode.insertBefore(overlay, navigation);

  // Toggle navigation on click
  navigation.addEventListener('click', function() {
    overlay.classList.toggle('navigation-open');
    navigation.classList.toggle('navigation-open');
  });

  // Unless we remove hover effects on touch devices, the navigation will reset after click
  if (!isTouchDevice()) {
    navigation.addEventListener('mouseover', function() {
      navigation.classList.add('navigation-open');
    })
    navigation.addEventListener('mouseout', function() {
      navigation.classList.remove('navigation-open');
    })
  }

  // On tapping the overlay, we want to hide the navigation
  overlay.addEventListener('click', function() {
    overlay.classList.remove('navigation-open');
    navigation.classList.remove('navigation-open');
  });
}


document.addEventListener('DOMContentLoaded', function() {
  addNavigation();
});