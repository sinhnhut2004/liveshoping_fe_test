import { useState } from 'react';
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
import './index.css';
import Container from 'Components/Common/Container';

export default function Chat() {
  const [messageInputValue, setMessageInputValue] = useState('');

  return (
    <Container className="h-[calc(100vh-155px)]">
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Lilly"
              lastSenderName="Lilly"
              info="Yes i can do it for you"
              style={{ justifyContent: 'start' }}
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Lilly"
                status="available"
              />
            </Conversation>

            <Conversation
              name="Joe"
              lastSenderName="Joe"
              info="Yes i can do it for you"
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Joe"
                status="dnd"
              />
            </Conversation>

            <Conversation
              name="Emily"
              lastSenderName="Emily"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Emily"
                status="available"
              />
            </Conversation>

            <Conversation
              name="Kai"
              lastSenderName="Kai"
              info="Yes i can do it for you"
              unreadDot
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Kai"
                status="unavailable"
              />
            </Conversation>

            <Conversation
              name="Akane"
              lastSenderName="Akane"
              info="Yes i can do it for you"
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Akane"
                status="eager"
              />
            </Conversation>

            <Conversation
              name="Eliot"
              lastSenderName="Eliot"
              info="Yes i can do it for you"
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Eliot"
                status="away"
              />
            </Conversation>

            <Conversation
              name="Zoe"
              lastSenderName="Zoe"
              info="Yes i can do it for you"
              active
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Zoe"
                status="dnd"
              />
            </Conversation>

            <Conversation
              name="Patrik"
              lastSenderName="Patrik"
              info="Yes i can do it for you"
            >
              <Avatar
                src={'https://picsum.photos/25/25'}
                name="Patrik"
                status="invisible"
              />
            </Conversation>
          </ConversationList>
        </Sidebar>

        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <Avatar src={'https://picsum.photos/25/25'} name="Zoe" />
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
            typingIndicator={<TypingIndicator content="Zoe is typing" />}
          >
            <MessageSeparator content="Saturday, 30 November 2019" />

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Zoe',
                direction: 'incoming',
                position: 'single',
              }}
            >
              <Avatar src={'https://picsum.photos/25/25'} name="Zoe" />
            </Message>

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'single',
              }}
              avatarSpacer
            />
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
              }}
            >
              <Avatar src={'https://picsum.photos/25/25'} name="Zoe" />
            </Message>

            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'first',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'normal',
              }}
            />
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: '15 mins ago',
                sender: 'Patrik',
                direction: 'outgoing',
                position: 'last',
              }}
            />

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
              }}
            >
              <Avatar src={'https://picsum.photos/25/25'} name="Zoe" />
            </Message>
          </MessageList>

          <MessageInput
            placeholder="Type message here"
            value={messageInputValue}
            onChange={(val) => setMessageInputValue(val)}
            onSend={() => setMessageInputValue('')}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </Container>
  );
}
