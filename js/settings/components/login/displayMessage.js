export default function displayMessage(messageType, message, targetElement) {
  const element = document.querySelector(targetElement);
  console.log(element, messageType, message, targetElement);

  element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
