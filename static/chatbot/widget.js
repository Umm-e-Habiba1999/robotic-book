// Floating chatbot widget for the Physical AI textbook
(function() {
    'use strict';

    // Translation support
    const translations = {
        en: {
            title: '🤖 AI Assistant',
            welcome: '<strong>Welcome!</strong> I can help you understand the Physical AI & Humanoid Robotics textbook. Ask me anything!',
            placeholder: 'Ask about the book...',
            send: 'Send',
            thinking: 'Thinking...',
            error: 'Sorry, there was an error processing your request. Please try again.',
            tooltip: 'Open AI Assistant',
            selectedText: 'Ask about selected text...'
        },
        ur: {
            title: '🤖 AI اسسٹنٹ',
            welcome: '<strong>خوش آمدید!</strong> میں آپ کو Physical AI اور Humanoid Robotics کی کتاب سمجھنے میں مدد کر سکتا ہوں۔ مجھ سے کچھ بھی پوچھیں!',
            placeholder: 'کتاب کے بارے میں پوچھیں...',
            send: 'بھیجیں',
            thinking: 'سوچ رہا ہوں...',
            error: 'معذرت، آپ کی درخواست پر کارروائی کرتے وقت ایک خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔',
            tooltip: 'AI اسسٹنٹ کھولیں',
            selectedText: 'منتخب متن کے بارے میں پوچھیں...'
        }
    };

    // Detect current language from URL or document
    function getCurrentLanguage() {
        const pathname = window.location.pathname;
        if (pathname.startsWith('/ur/') || pathname.includes('/ur/')) {
            return 'ur';
        }
        return 'en';
    }

    let currentLang = getCurrentLanguage();
    const t = translations[currentLang];

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
    chatIcon.style.backgroundColor = '#001f3f';
    chatIcon.style.color = 'white';
    chatIcon.style.display = 'flex';
    chatIcon.style.alignItems = 'center';
    chatIcon.style.justifyContent = 'center';
    chatIcon.style.cursor = 'pointer';
    chatIcon.style.fontSize = '20px';
    chatIcon.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    chatIcon.style.zIndex = '1000';
    chatIcon.style.fontFamily = 'Arial, sans-serif';
    chatIcon.title = t.tooltip;

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
    chatHeader.style.backgroundColor = '#001f3f';
    chatHeader.style.color = 'white';
    chatHeader.style.padding = '16px';
    chatHeader.style.display = 'flex';
    chatHeader.style.justifyContent = 'space-between';
    chatHeader.style.alignItems = 'center';
    chatHeader.style.fontWeight = 'bold';

    const headerTitle = document.createElement('span');
    headerTitle.textContent = t.title;
    headerTitle.id = 'chat-header-title';
    chatHeader.appendChild(headerTitle);

    // Create close button first
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

    // Add language toggle button
    const langToggle = document.createElement('button');
    langToggle.textContent = currentLang === 'en' ? 'اردو' : 'EN';
    langToggle.style.background = 'rgba(255,255,255,0.2)';
    langToggle.style.border = 'none';
    langToggle.style.color = 'white';
    langToggle.style.padding = '4px 8px';
    langToggle.style.borderRadius = '4px';
    langToggle.style.cursor = 'pointer';
    langToggle.style.fontSize = '12px';
    langToggle.style.marginRight = '8px';
    langToggle.onclick = function() {
        currentLang = currentLang === 'en' ? 'ur' : 'en';
        updateLanguage();
    };

    chatHeader.appendChild(langToggle);
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
    welcomeMsg.style.color = '#000000';
    welcomeMsg.innerHTML = t.welcome;
    welcomeMsg.id = 'welcome-message';
    if (currentLang === 'ur') {
        welcomeMsg.style.direction = 'rtl';
        welcomeMsg.style.textAlign = 'right';
    }
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
    inputField.placeholder = t.placeholder;
    inputField.style.flex = '1';
    inputField.style.padding = '12px';
    inputField.style.border = '1px solid #ddd';
    inputField.style.borderRadius = '24px';
    inputField.style.outline = 'none';
    inputField.style.fontSize = '14px';
    if (currentLang === 'ur') {
        inputField.style.direction = 'rtl';
        inputField.style.textAlign = 'right';
    }

    const sendBtn = document.createElement('button');
    sendBtn.id = 'chat-send-btn';
    sendBtn.textContent = t.send;
    sendBtn.style.marginLeft = '8px';
    sendBtn.style.padding = '10px 16px';
    sendBtn.style.backgroundColor = '#001f3f';
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
        userMsg.style.backgroundColor = '#001f3f';
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
        loadingMsg.style.color = '#666666';
        loadingMsg.innerHTML = '<em>' + translations[currentLang].thinking + '</em>';
        if (currentLang === 'ur') {
            loadingMsg.style.direction = 'rtl';
            loadingMsg.style.textAlign = 'right';
        }
        messagesContainer.appendChild(loadingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Prepare request data
        let requestData = {
            message: message,
            language: currentLang  // Send current language (en or ur)
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
            console.log('Backend response:', data); // Debug logging

            // Remove loading indicator
            messagesContainer.removeChild(loadingMsg);

            // Add bot response - handle both 'response' and 'answer' fields
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.style.marginBottom = '10px';
            botMsg.style.padding = '10px 14px';
            botMsg.style.borderRadius = '18px';
            botMsg.style.maxWidth = '85%';
            botMsg.style.backgroundColor = '#ffffff';
            botMsg.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            botMsg.style.color = '#000000';
            if (currentLang === 'ur') {
                botMsg.style.direction = 'rtl';
                botMsg.style.textAlign = 'right';
            }

            // Handle both possible response field names
            const responseText = data.response || data.answer || 'Sorry, I could not generate a response.';
            botMsg.innerHTML = responseText;

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
            errorMsg.textContent = translations[currentLang].error;
            if (currentLang === 'ur') {
                errorMsg.style.direction = 'rtl';
                errorMsg.style.textAlign = 'right';
            }
            messagesContainer.appendChild(errorMsg);

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }

    // Language update function
    function updateLanguage() {
        const t = translations[currentLang];

        // Update UI elements
        document.getElementById('chat-header-title').textContent = t.title;
        langToggle.textContent = currentLang === 'en' ? 'اردو' : 'EN';
        inputField.placeholder = t.placeholder;
        sendBtn.textContent = t.send;
        chatIcon.title = t.tooltip;

        // Update text direction for Urdu
        if (currentLang === 'ur') {
            inputField.style.direction = 'rtl';
            inputField.style.textAlign = 'right';
        } else {
            inputField.style.direction = 'ltr';
            inputField.style.textAlign = 'left';
        }

        // Update welcome message
        const welcomeMsg = document.getElementById('welcome-message');
        if (welcomeMsg) {
            welcomeMsg.innerHTML = t.welcome;
            if (currentLang === 'ur') {
                welcomeMsg.style.direction = 'rtl';
                welcomeMsg.style.textAlign = 'right';
            } else {
                welcomeMsg.style.direction = 'ltr';
                welcomeMsg.style.textAlign = 'left';
            }
        }
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
                popup.style.backgroundColor = '#333';
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
                    inputField.placeholder = translations[currentLang].selectedText;

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