// import React, { useEffect } from 'react';
// import BrowserOnly from '@docusaurus/BrowserOnly';
// import './chatbot-widget.css'; // CSS import

// const TextbookChatbot = () => {
//   useEffect(() => {
//     // Dynamic import JS only on client side
//     import('./chatbot-widget.js').then(module => {
//       if (!window.textbookChatbot) {
//         window.textbookChatbot = new module.default({
//           backendUrl: 'http://localhost:8000',
//         });
//       }
//     });

//     return () => {
//       // Cleanup on unmount
//       if (window.textbookChatbot) {
//         delete window.textbookChatbot;
//       }
//     };
//   }, []);

//   return <BrowserOnly>{() => null}</BrowserOnly>;
// };

// export default TextbookChatbot;





import React, { useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import './chatbot-widget.css'; // CSS import

const TextbookChatbot = () => {
  useEffect(() => {
    if (!window.textbookChatbot) {
      // Wait till JS loads
      const init = () => {
        if (window.TextbookChatbot) {
          window.textbookChatbot = new window.TextbookChatbot({
            backendUrl: 'http://localhost:8000', // Update if needed
          });
        } else {
          setTimeout(init, 100); // Retry after 100ms
        }
      };
      init();
    }
  }, []);

  return <BrowserOnly>{() => null}</BrowserOnly>;
};

export default TextbookChatbot;

