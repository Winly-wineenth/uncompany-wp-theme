
function handleAccordionExpanders() {
  document.querySelectorAll('div.expander').forEach(function(expander) {
    expander.addEventListener('click', function() {
      expander.parentNode.parentNode.classList.toggle('expander-open');
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  handleAccordionExpanders();
});