import { useCallback, useContext, useEffect, useState } from 'react';
// @mui
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// routes
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// api
import { useGetContacts, useGetConversation, useGetConversations } from 'src/api/chat';
// components
import { useSettingsContext } from 'src/components/settings';
//
import { LoadingScreen } from 'src/components/loading-screen';
import { GlobalContext } from 'src/context/GlobalProvider';
import ChatHeaderCompose from '../chat-header-compose';
import ChatHeaderDetail from '../chat-header-detail';
import ChatMessageInput from '../chat-message-input';
import ChatMessageList from '../chat-message-list';
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';

// ----------------------------------------------------------------------

export default function ChatView({ customerId }) {
  const router = useRouter();
  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = customerId || parseInt(searchParams.get('id')) || null;

  const [recipients, setRecipients] = useState([]);
  const [contacts, setContacts] = useState(null);
  const { customerList } = useContext(GlobalContext);

  const { conversations, conversationsLoading } = useGetConversations();
  debugger;
  useEffect(() => {
    let contacts = useGetContacts(customerList);
    setContacts(contacts);
  }, [customerList]);

  const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  const participants = conversation
    ? conversation.participants.filter((participant) => participant.id !== `${user.id}`)
    : [];

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.chat);
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const details = !!conversation;

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );
  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      loading={conversationsLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={conversation?.messages} participants={participants} />

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  if (contacts === null || contacts === undefined) return <LoadingScreen></LoadingScreen>;
  return (
    <Container>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Mesajlaşma ( Whatsapp + Email)
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {customerId === undefined && renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
