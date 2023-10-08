import { useCallback, useEffect, useState } from 'react';
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
import { useGetConversation, useGetConversations } from 'src/api/chat';
// components
import { useSettingsContext } from 'src/components/settings';
//
import CustomerService from 'src/api/CustomerService';
import { LoadingScreen } from 'src/components/loading-screen';
import ChatHeaderCompose from '../chat-header-compose';
import ChatHeaderDetail from '../chat-header-detail';
import ChatMessageInput from '../chat-message-input';
import ChatMessageList from '../chat-message-list';
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';

// ----------------------------------------------------------------------

export default function ChatView() {
  const router = useRouter();

  const { user } = useMockedUser();

  const settings = useSettingsContext();

  const searchParams = useSearchParams();
  const { getCustomerNames } = CustomerService();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);
  const [contacts, setContacts] = useState(null);

  const { conversations, conversationsLoading } = useGetConversations();

  const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  const participants = conversation
    ? conversation.participants.filter((participant) => participant.id !== `${user.id}`)
    : [];

  async function getContacts() {
    var customers = await getCustomerNames();

    let contacts = [];
    customers.forEach((x) => {
      contacts.push({
        status: 'online',
        id: '' + x.id,
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        email: x.email,
        lastActivity: '2023-10-07T23:52:32.830Z',
        name: x.fullName,
        phoneNumber: x.phone,
        role: 'Müşteri',
      });
    });

    return {
      contacts: contacts || [],
    };
  }
  useEffect(() => {
    getContacts().then((x) => {
      setContacts(x);
    });
  }, []);
  useEffect(() => {
    getContacts().then((x) => {
      setContacts(x);
    });

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
  debugger;
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

  if (contacts === null) return <LoadingScreen></LoadingScreen>;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        Chat
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
        {renderNav}

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
