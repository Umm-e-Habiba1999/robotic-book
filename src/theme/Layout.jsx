import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import TextbookChatbot from '@site/src/components/TextbookChatbot/TextbookChatbot';

export default function Layout(props) {
  return (
    <>
      <OriginalLayout {...props} />
      <TextbookChatbot />
    </>
  );
}