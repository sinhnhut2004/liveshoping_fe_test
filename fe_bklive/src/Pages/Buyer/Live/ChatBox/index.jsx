import React, { useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  Sidebar,
  Search,
  ConversationList,
  Conversation,
  Avatar,
  ChatContainer,
  ConversationHeader,
  VoiceCallButton,
  Message,
  MessageInput,
  VideoCallButton,
  InfoButton,
  MessageSeparator,
  TypingIndicator,
  MessageList,
} from '@chatscope/chat-ui-kit-react';

export default function ChatBox() {
  return (
    <div
      // style={{ position: 'relative', height: '500px' }}
      className="relative h-full">
      <MainContainer responsive>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={'https://picsum.photos/20/20'} name="Zoe" />
            <ConversationHeader.Content
              userName="Zoe"
              info="Active 10 mins ago"
            />
            {/* <ConversationHeader.Actions>
              <VoiceCallButton />
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions> */}
          </ConversationHeader>
          <MessageList
          // typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'single',
              }}>
              <Avatar src={'https://picsum.photos/21/21'} name="Zoe" />
            </Message>

            <Message
              model={{
                message: 'Hello my friend !!',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'first',
              }}
              // avatarSpacer
              avatarPosition="tr">
              <Avatar src={'https://picsum.photos/20/20'} name="Mèo" />
            </Message>
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'first',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'normal',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'normal',
              }}
              avatarSpacer
            />

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'last',
              }}>
              <Avatar src={'https://picsum.photos/20/20'} name="Zoe" />
            </Message>

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'first',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'last',
              }}>
              <Avatar src={'https://picsum.photos/21/21'} name="Mèo" />
            </Message>

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'first',
              }}
              avatarSpacer
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'last',
              }}>
              <Avatar src={'https://picsum.photos/20/20'} name="Zoe" />
            </Message>
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            value={''}
            onChange={(val) => {}}
            onSend={() => {}}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
