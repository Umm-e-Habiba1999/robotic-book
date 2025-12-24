// Floating chatbot widget for the Physical AI textbook
(function() {
    'use strict';

    // Create chat icon
    const chatIcon = document.createElement('div');
    chatIcon.id = 'chat-icon';
    chatIcon.innerHTML = '💬';
    chatIcon.style.position = 'fixed';
    chatIcon.style.bottom = '20px';
    chatIcon.style.right = '20px';
    chatIcon.style.width = '50px';
    chatIcon.style.height = '50px';
    chatIcon.style.borderRadius = '50%';
    chatIcon.style.backgroundColor = '#4c56afff';
    chatIcon.style.color = 'white';
    chatIcon.style.display = 'flex';
    chatIcon.style.alignItems = 'center';
    chatIcon.style.justifyContent = 'center';
    chatIcon.style.cursor = 'pointer';
    chatIcon.style.fontSize = '20px';
    chatIcon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatIcon.style.zIndex = '1000';
    chatIcon.style.fontFamily = 'Arial, sans-serif';
    chatIcon.title = 'Open AI Assistant';

    // Create chat widget
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chat-widget';
    chatWidget.style.position = 'fixed';
    chatWidget.style.bottom = '80px';
    chatWidget.style.right = '20px';
    chatWidget.style.width = '380px';
    chatWidget.style.height = '550px';
    chatWidget.style.backgroundColor = 'white';
    chatWidget.style.borderRadius = '16px';
    chatWidget.style.display = 'none'; // Hidden by default
    chatWidget.style.flexDirection = 'column';
    chatWidget.style.zIndex = '1000';
    chatWidget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
    chatWidget.style.fontFamily = 'Arial, sans-serif';
    chatWidget.style.overflow = 'hidden';

    // Create chat header
    const chatHeader = document.createElement('div');
    chatHeader.className = 'chat-header';
    chatHeader.style.backgroundColor = '#4c56afff';
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '16px';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.style.fontWeight = 'bold';

    const headerTitle = document.createElement('span');
    headerTitle.textContent = '🤖 AI Assistant';
    chatHeader.appendChild(headerTitle);

    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = 'white';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.width = '30px';
    closeBtn.style.height = '30px';
    closeBtn.style.display = 'flex';
    closeBtn.style.alignItems = 'center';
    closeBtn.style.justifyContent = 'center';
    closeBtn.style.borderRadius = '50%';
    closeBtn.style.transition = 'background-color 0.2s';
    closeBtn.onclick = function() {
        chatWidget.style.display = 'none';
        chatIcon.style.display = 'flex';
    };
    chatHeader.appendChild(closeBtn);

    // Create messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'chat-messages';
    messagesContainer.style.flex = '1';
    messagesContainer.style.padding = '16px';
    messagesContainer.style.overflowY = 'auto';
    messagesContainer.style.backgroundColor = '#f5f5f5';

    // Add welcome message
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'message bot-message';
    welcomeMsg.style.marginBottom = '10px';
    welcomeMsg.style.padding = '10px 14px';
    welcomeMsg.style.borderRadius = '18px';
    welcomeMsg.style.maxWidth = '85%';
    welcomeMsg.style.backgroundColor = '#ffffff';
    welcomeMsg.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    welcomeMsg.innerHTML = '<strong>Welcome!</strong> I can help you understand the Physical AI & Humanoid Robotics textbook. Ask me anything!';
    messagesContainer.appendChild(welcomeMsg);

    // Create input container
    const inputContainer = document.createElement('div');
    inputContainer.style.display = 'flex';
    inputContainer.style.padding = '12px';
    inputContainer.style.backgroundColor = 'white';
    inputContainer.style.borderTop = '1px solid #eee';

    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.id = 'chat-input';
    inputField.placeholder = 'Ask about the book...';
    inputField.style.flex = '1';
    inputField.style.padding = '12px';
    inputField.style.border = '1px solid #ddd';
    inputField.style.borderRadius = '24px';
    inputField.style.outline = 'none';
    inputField.style.fontSize = '14px';

    const sendBtn = document.createElement('button');
    sendBtn.id = 'chat-send-btn';
    sendBtn.textContent = 'Send';
    sendBtn.style.marginLeft = '8px';
    sendBtn.style.padding = '10px 16px';
    sendBtn.style.backgroundColor = '#4c56afff';
    sendBtn.style.color = 'white';
    sendBtn.style.border = 'none';
    sendBtn.style.borderRadius = '24px';
    sendBtn.style.cursor = 'pointer';
    sendBtn.style.fontSize = '14px';
    sendBtn.style.fontWeight = 'bold';

    // Append elements
    inputContainer.appendChild(inputField);
    inputContainer.appendChild(sendBtn);

    chatWidget.appendChild(chatHeader);
    chatWidget.appendChild(messagesContainer);
    chatWidget.appendChild(inputContainer);

    // Add to document
    document.body.appendChild(chatIcon);
    document.body.appendChild(chatWidget);

    // Toggle chat visibility
    chatIcon.addEventListener('click', function() {
        chatWidget.style.display = 'flex';
        chatIcon.style.display = 'none';
        inputField.focus();
    });

    // Send message function
    function sendMessage() {
        const message = inputField.value.trim();
        if (!message) return;

        // Add user message to chat
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.style.marginBottom = '10px';
        userMsg.style.padding = '10px 14px';
        userMsg.style.borderRadius = '18px';
        userMsg.style.maxWidth = '85%';
        userMsg.style.backgroundColor = '#4c56afff';
        userMsg.style.color = 'white';
        userMsg.style.alignSelf = 'flex-end';
        userMsg.style.alignItems = 'flex-end';
        userMsg.textContent = message;
        messagesContainer.appendChild(userMsg);

        // Clear input
        inputField.value = '';

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Show loading indicator
        const loadingMsg = document.createElement('div');
        loadingMsg.className = 'message bot-message loading';
        loadingMsg.style.marginBottom = '10px';
        loadingMsg.style.padding = '10px 14px';
        loadingMsg.style.borderRadius = '18px';
        loadingMsg.style.maxWidth = '85%';
        loadingMsg.style.backgroundColor = '#ffffff';
        loadingMsg.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        loadingMsg.innerHTML = '<em>Thinking...</em>';
        messagesContainer.appendChild(loadingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Prepare request data
        let requestData = {
            message: message
        };

        // Add selected text if available
        if (window.selectedBookText && window.selectedBookText.trim().length > 0) {
            requestData.selected_text = window.selectedBookText;
        }

        // Send to backend
        fetch('http://localhost:8000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            // Remove loading indicator
            messagesContainer.removeChild(loadingMsg);

            // Add bot response
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.style.marginBottom = '10px';
            botMsg.style.padding = '10px 14px';
            botMsg.style.borderRadius = '18px';
            botMsg.style.maxWidth = '85%';
            botMsg.style.backgroundColor = '#ffffff';
            botMsg.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            botMsg.style.color = '#000000';
            botMsg.innerHTML = data.response || "No response from server";
            messagesContainer.appendChild(botMsg);

            // Clear selected text after sending
            window.selectedBookText = null;

            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            // Remove loading indicator
            messagesContainer.removeChild(loadingMsg);

            // Show error message
            const errorMsg = document.createElement('div');
            errorMsg.className = 'message bot-message error';
            errorMsg.style.marginBottom = '10px';
            errorMsg.style.padding = '10px 14px';
            errorMsg.style.borderRadius = '18px';
            errorMsg.style.maxWidth = '85%';
            errorMsg.style.backgroundColor = '#ffebee';
            errorMsg.style.color = '#c62828';
            errorMsg.textContent = 'Sorry, there was an error processing your request. Please try again.';
            messagesContainer.appendChild(errorMsg);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    // Event listeners for sending messages
    sendBtn.addEventListener('click', sendMessage);
    inputField.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Text selection functionality
    let selectionTimeout;

    document.addEventListener('mouseup', function() {
        // Clear any existing timeout
        if (selectionTimeout) {
            clearTimeout(selectionTimeout);
        }

        // Use a small delay to ensure selection is complete
        selectionTimeout = setTimeout(function() {
            const selectedText = window.getSelection().toString().trim();

            if (selectedText && selectedText.length > 10) { // Only show if more than 10 characters
                // Save the selected text globally
                window.selectedBookText = selectedText;

                // Create selection popup
                const popup = document.createElement('div');
                popup.id = 'selection-popup';
                popup.textContent = '❓ Ask about this';
                popup.style.position = 'fixed';
                popup.style.top = (window.pageYOffset + window.getSelection().getRangeAt(0).getBoundingClientRect().top - 40) + 'px';
                popup.style.left = (window.pageXOffset + window.getSelection().getRangeAt(0).getBoundingClientRect().left) + 'px';
                popup.style.backgroundColor = '#000000ff';
                popup.style.color = 'white';
                popup.style.padding = '8px 12px';
                popup.style.borderRadius = '16px';
                popup.style.fontSize = '12px';
                popup.style.zIndex = '1001';
                popup.style.cursor = 'pointer';
                popup.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                popup.style.fontFamily = 'Arial, sans-serif';

                popup.addEventListener('click', function() {
                    // Open chat widget if not already open
                    if (chatWidget.style.display !== 'flex') {
                        chatWidget.style.display = 'flex';
                        chatIcon.style.display = 'none';
                    }

                    // Focus input and set placeholder
                    inputField.focus();
                    inputField.placeholder = 'Ask about selected text...';

                    // Remove popup
                    document.body.removeChild(popup);
                });

                document.body.appendChild(popup);

                // Remove popup after 5 seconds
                setTimeout(function() {
                    if (popup.parentNode) {
                        popup.parentNode.removeChild(popup);
                    }
                }, 5000);
            }
        }, 100); // Small delay to ensure selection is complete
    });

})();