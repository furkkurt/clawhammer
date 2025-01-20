// Chat functionality
class Chat {
    constructor() {
        console.log('Chat class instantiated');
        this.messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
        this.username = localStorage.getItem('chatUsername') || '';
        this.maxMessages = 50; // Limit stored messages
        this.isOpen = false; // Add this to track chat state

        // Get DOM elements
        this.chatBtn = document.getElementById('chatBtn');
        this.chatWindow = document.getElementById('chatWindow');
        this.closeChatBtn = document.getElementById('closeChatBtn');
        this.messageInput = document.getElementById('messageInput');
        this.sendMessageBtn = document.getElementById('sendMessageBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.usernameInput = document.getElementById('username');

        if (!this.chatBtn || !this.chatWindow) {
            console.error('Chat elements not found in DOM');
            return;
        }

        console.log('Chat elements found, initializing...');
        this.initializeEventListeners();
        this.loadUsername();
    }

    initializeEventListeners() {
        console.log('Adding event listeners');
        
        // Toggle chat window
        this.chatBtn.addEventListener('click', () => {
            console.log('Chat button clicked');
            this.toggleChat();
        });
        this.closeChatBtn.addEventListener('click', () => {
            console.log('Close button clicked');
            this.closeChat();
        });

        // Send message
        this.sendMessageBtn.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Save username
        this.usernameInput.addEventListener('change', () => {
            this.username = this.usernameInput.value;
            localStorage.setItem('chatUsername', this.username);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeChat();
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        console.log('Opening chat');
        this.isOpen = true;
        this.chatWindow.classList.remove('hidden');
        // Force a reflow
        void this.chatWindow.offsetWidth;
        this.chatWindow.classList.remove('-translate-x-full');
        this.messageInput.focus();
        this.displayMessages();
    }

    closeChat() {
        console.log('Closing chat');
        this.isOpen = false;
        this.chatWindow.classList.add('-translate-x-full');
        setTimeout(() => {
            this.chatWindow.classList.add('hidden');
        }, 300);
    }

    loadUsername() {
        if (this.username) {
            this.usernameInput.value = this.username;
        }
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        let username = this.usernameInput.value.trim();

        // Use "Traveller" as default name if no name is provided
        if (!username) {
            username = "Traveller";
            this.username = username;
            this.usernameInput.value = username;
            localStorage.setItem('chatUsername', username);
        }

        if (message) {
            const newMessage = {
                username,
                text: message,
                timestamp: new Date().toISOString()
            };

            this.messages.push(newMessage);
            
            // Limit the number of stored messages
            if (this.messages.length > this.maxMessages) {
                this.messages = this.messages.slice(-this.maxMessages);
            }

            localStorage.setItem('chatMessages', JSON.stringify(this.messages));
            this.messageInput.value = '';
            this.displayMessages();
        }
    }

    displayMessages() {
        this.chatMessages.innerHTML = this.messages.map(msg => `
            <div class="message">
                <div class="text-red-300 text-sm">${msg.username}</div>
                <div class="text-red-500">${msg.text}</div>
            </div>
        `).join('');
        
        // Scroll to bottom
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// Remove the automatic initialization from chat.js 