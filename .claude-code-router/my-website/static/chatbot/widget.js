// Minimal floating chatbot widget
(function() {
  // Create button
  const btn = document.createElement('button');
  btn.id = 'chat-widget-btn';
  btn.textContent = '💬';
  btn.style.position = 'fixed';
  btn.style.bottom = '20px';
  btn.style.right = '20px';
  btn.style.width = '50px';
  btn.style.height = '50px';
  btn.style.borderRadius = '50%';
  btn.style.backgroundColor = '#4CAF50';
  btn.style.color = 'white';
  btn.style.border = 'none';
  btn.style.cursor = 'pointer';
  btn.style.zIndex = 1000;
  document.body.appendChild(btn);

  // Create chat window
  const chatWindow = document.createElement('div');
  chatWindow.id = 'chat-widget-window';
  chatWindow.style.position = 'fixed';
  chatWindow.style.bottom = '80px';
  chatWindow.style.right = '20px';
  chatWindow.style.width = '300px';
  chatWindow.style.height = '400px';
  chatWindow.style.backgroundColor = 'white';
  chatWindow.style.border = '1px solid #ccc';
  chatWindow.style.borderRadius = '10px';
  chatWindow.style.display = 'none';
  chatWindow.style.flexDirection = 'column';
  chatWindow.style.zIndex = 1000;
  document.body.appendChild(chatWindow);

  // Toggle chat window
  btn.addEventListener('click', () => {
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
  });

  // Add simple header
  const header = document.createElement('div');
  header.textContent = 'Chatbot';
  header.style.backgroundColor = '#4CAF50';
  header.style.color = 'white';
  header.style.padding = '10px';
  header.style.textAlign = 'center';
  chatWindow.appendChild(header);

  // Add messages container
  const messages = document.createElement('div');
  messages.style.flex = '1';
  messages.style.padding = '10px';
  messages.style.overflowY = 'auto';
  chatWindow.appendChild(messages);

  // Add input container
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.borderTop = '1px solid #ccc';
  chatWindow.appendChild(inputContainer);

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Type a message...';
  input.style.flex = '1';
  input.style.padding = '5px';
  inputContainer.appendChild(input);

  const sendBtn = document.createElement('button');
  sendBtn.textContent = 'Send';
  sendBtn.style.padding = '5px';
  inputContainer.appendChild(sendBtn);

  // Send message (for now just echo)
  sendBtn.addEventListener('click', () => {
    const msg = document.createElement('div');
    msg.textContent = 'You: ' + input.value;
    messages.appendChild(msg);
    input.value = '';

    // TODO: call backend API here
  });
})();
