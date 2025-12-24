// Physical AI & Humanoid Robotics Textbook Chatbot Widget
class TextbookChatbot {
    constructor(options = {}) {
        // Get backend URL from data attribute or use default
        this.backendUrl = options.backendUrl ||
                         document.querySelector('[data-chatbot-backend]')?.dataset.chatbotBackend ||
                         'http://localhost:8000';
        this.containerId = options.containerId || 'textbook-chatbot';
        this.sessionId = options.sessionId || this.generateSessionId();
        this.selectedText = null;
        this.isInitialized = false;

        // Create the chatbot UI
        this.createWidget();

        // Initialize event listeners
        this.initEventListeners();

        // Start monitoring text selection
        this.initTextSelection();

        this.isInitialized = true;
    }
    
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    createWidget() {
        // Create the chatbot container if it doesn't exist
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 10000;
                width: 400px;
                height: 600px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                border-radius: 12px;
                display: flex;
                flex-direction: column;
                background: white;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                overflow: hidden;
            `;
            document.body.appendChild(container);
        }
        
        // Add the chatbot HTML structure
        container.innerHTML = `
            <div id="chatbot-header" style="
                background: #2563eb;
                color: white;
                padding: 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                cursor: move;
            ">
                <div>
                    <h3 style="margin: 0; font-size: 16px;">Physical AI Assistant</h3>
                    <small style="opacity: 0.8; font-size: 12px;">Ask about the textbook</small>
                </div>
                <button id="chatbot-toggle" style="
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    padding: 0;
                    width: 24px;
                    height: 24px;
                ">−</button>
            </div>
            <div id="chatbot-messages" style="
                flex: 1;
                padding: 16px;
                overflow-y: auto;
                background: #f9fafb;
            ">
                <div class="message bot-message" style="margin-bottom: 16px;">
                    <div style="
                        background: #e5e7eb;
                        padding: 12px;
                        border-radius: 8px;
                        font-size: 14px;
                    ">Hello! I'm your Physical AI & Humanoid Robotics textbook assistant. Ask me anything about the content, or select text on the page to ask questions specifically about that text.</div>
                </div>
            </div>
            <div id="chatbot-input-area" style="
                padding: 12px;
                border-top: 1px solid #e5e7eb;
                background: white;
            ">
                <div id="selected-text-indicator" style="
                    background: #dbeafe;
                    padding: 8px;
                    border-radius: 4px;
                    margin-bottom: 8px;
                    font-size: 12px;
                    display: none;
                ">
                    <strong>Selected text mode:</strong> <span id="selected-text-preview"></span>
                </div>
                <div style="display: flex; gap: 8px;">
                    <input 
                        type="text" 
                        id="chatbot-input" 
                        placeholder="Ask about the textbook..." 
                        style="
                            flex: 1;
                            padding: 10px;
                            border: 1px solid #d1d5db;
                            border-radius: 6px;
                            font-size: 14px;
                        "
                    >
                    <button id="chatbot-send" style="
                        background: #2563eb;
                        color: white;
                        border: none;
                        border-radius: 6px;
                        padding: 0 16px;
                        cursor: pointer;
                    ">Send</button>
                </div>
            </div>
        `;
    }
    
    initEventListeners() {
        // Toggle chatbot visibility
        const toggleBtn = document.getElementById('chatbot-toggle');
        const container = document.getElementById(this.containerId);
        let isMinimized = false;
        
        toggleBtn.addEventListener('click', () => {
            if (isMinimized) {
                document.getElementById('chatbot-messages').style.display = 'block';
                document.getElementById('chatbot-input-area').style.display = 'block';
                toggleBtn.textContent = '−';
                isMinimized = false;
            } else {
                document.getElementById('chatbot-messages').style.display = 'none';
                document.getElementById('chatbot-input-area').style.display = 'none';
                toggleBtn.textContent = '+';
                isMinimized = true;
            }
        });
        
        // Send message on button click
        document.getElementById('chatbot-send').addEventListener('click', () => {
            this.sendMessage();
        });
        
        // Send message on Enter key (but allow Shift+Enter for new lines)
        document.getElementById('chatbot-input').addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    }
    
    initTextSelection() {
        document.addEventListener('mouseup', () => {
            const selection = window.getSelection();
            if (selection.toString().trim() !== '') {
                this.selectedText = selection.toString().trim();
                
                // Show selected text indicator
                const indicator = document.getElementById('selected-text-indicator');
                const preview = document.getElementById('selected-text-preview');
                
                // Truncate preview if too long
                const previewText = this.selectedText.length > 50 
                    ? this.selectedText.substring(0, 50) + '...' 
                    : this.selectedText;
                
                preview.textContent = `"${previewText}"`;
                indicator.style.display = 'block';
            } else {
                this.selectedText = null;
                document.getElementById('selected-text-indicator').style.display = 'none';
            }
        });
    }
    
    async sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message to UI
        this.addMessage(message, 'user');
        input.value = '';
        
        try {
            // Show typing indicator
            const typingIndicator = this.addMessage('...', 'bot');
            
            // Prepare the request
            const requestBody = {
                query: message,
                session_id: this.sessionId,
                max_tokens: 1024,
                temperature: 0.7
            };
            
            // Include selected text if available
            if (this.selectedText) {
                requestBody.selected_text = this.selectedText;
            }
            
            // Send request to backend
            const response = await fetch(`${this.backendUrl}/api/v1/chat/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Remove typing indicator and add bot response
            this.removeMessage(typingIndicator);
            this.addMessage(data.response, 'bot');
            
            // Clear selected text after sending if in selected text mode
            if (this.selectedText) {
                this.selectedText = null;
                document.getElementById('selected-text-indicator').style.display = 'none';
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.removeMessage(document.querySelector('.typing-indicator'));
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }
    
    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.style.cssText = `
            margin-bottom: 16px;
            display: flex;
            ${sender === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
        `;
        
        const contentDiv = document.createElement('div');
        contentDiv.style.cssText = `
            padding: 12px;
            border-radius: 8px;
            max-width: 80%;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        if (sender === 'user') {
            contentDiv.style.cssText += `
                background: #2563eb;
                color: white;
            `;
        } else {
            contentDiv.style.cssText += `
                background: #e5e7eb;
                color: #374151;
            `;
        }
        
        // Format text with basic markdown support
        contentDiv.innerHTML = this.formatText(text);
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }
    
    removeMessage(messageElement) {
        if (messageElement && messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement);
        }
    }
    
    formatText(text) {
        // Basic text formatting - convert newlines to <br>
        return text.replace(/\n/g, '<br>');
    }
    
    // Method to programmatically send a message
    async askQuestion(question, selectedText = null) {
        this.selectedText = selectedText;
        
        if (selectedText) {
            const indicator = document.getElementById('selected-text-indicator');
            const preview = document.getElementById('selected-text-preview');
            
            const previewText = selectedText.length > 50 
                ? selectedText.substring(0, 50) + '...' 
                : selectedText;
            
            preview.textContent = `"${previewText}"`;
            indicator.style.display = 'block';
        }
        
        document.getElementById('chatbot-input').value = question;
        await this.sendMessage();
    }
}

// Auto-initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the page to fully load
    setTimeout(() => {
        window.textbookChatbot = new TextbookChatbot({
            backendUrl: 'http://localhost:8000'  // This should be updated based on your deployment
        });
    }, 1000);
});

window.TextbookChatbot = TextbookChatbot;

// Export for use in other modules if needed
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = TextbookChatbot;
// }