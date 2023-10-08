import keyBy from 'lodash/keyBy';
import { mutate } from 'swr';
// utils
import { useContext } from 'react';
import { GlobalContext } from 'src/context/GlobalProvider';
import axios, { endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export async function useGetContacts(customerList) {
  let contacts = [];
  customerList.customers.forEach((x) => {
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

// ----------------------------------------------------------------------

function getConversations(customers) {
  let conv = [];
  customers.forEach((customer) => {
    if (conv.length < 6)
      conv.push({
        id: 'conv' + customer.id,
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'feritzcan93@gmail.com',
            name: 'Ferit Özcan',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: 'İstanbul',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+90 532 559 6676',
          },
          {
            status: 'offline',
            id: '' + customer.id,
            role: 'Project Manager',
            email: customer.email,
            name: customer.fullName,
            lastActivity: '2023-10-03T19:52:32.830Z',
            address: 'İstanbul',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_' +
              (customer.id % 25) +
              '.jpg',
            phoneNumber: customer.phone,
            customer: customer,
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 8,
        messages: [
          {
            id: '565b8c6d-96ee-46a6-8221-30ff3199d25c',
            body: 'Merhaba, amerika vizesi için sizden destek almak istiyorum.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
                name: 'expertise-2015-conakry-sao-tome-and-principe-gender.mp4',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/expertise_2015_conakry_sao-tome-and-principe_gender.mp4',
                size: 16000000,
                createdAt: '2023-10-05T21:52:32.829Z',
                modifiedAt: '2023-10-05T21:52:32.829Z',
                type: 'mp4',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
                name: 'money-popup-crack.pdf',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/money-popup-crack.pdf',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/money-popup-crack.pdf',
                size: 12000000,
                createdAt: '2023-10-04T20:52:32.829Z',
                modifiedAt: '2023-10-04T20:52:32.829Z',
                type: 'pdf',
              },
            ],
            createdAt: '2023-10-07T13:52:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
          {
            id: '82ad1e87-c8cf-45d7-9744-6a41e042f70a',
            body: 'Merhabalar, tabiki size yardımcı olalım.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
                name: 'cover-4.jpg',
                path: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg',
                preview: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_4.jpg',
                size: 9600000,
                createdAt: '2023-10-03T19:52:32.829Z',
                modifiedAt: '2023-10-03T19:52:32.829Z',
                type: 'jpg',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
                name: 'cover-6.jpg',
                path: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg',
                preview: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg',
                size: 8000000,
                createdAt: '2023-10-02T18:52:32.829Z',
                modifiedAt: '2023-10-02T18:52:32.829Z',
                type: 'jpg',
              },
            ],
            createdAt: '2023-10-07T21:52:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '315d034c-b70a-41b9-bb72-12c1d916dd92',
            body: 'Eşim ve oğlum ile birlikte,  3 ay sonra gitmeyi planlıyoruz. Size ekte gerekli belgeleri ekledim. Kontrol eder misiniz? Başka hangi belgeler gerekiyor. Kafam çok karıştı.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:47:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
          {
            id: '4a4bcea5-b88b-4f2a-a321-4632aabf8da4',
            body: 'Endişe etmenize gerek yok.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:49:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '8bd65dd0-ad04-4169-8b9e-4afbb4ce6fcb',
            body: 'Size kolay başvuru sistemimizin linkini gönderiyorum. Lütfen linke tıkladığınızda kişi oluşturmanız ve sistemin sizden istediği dosyaları yükleyin.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
                name: 'large-news.txt',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                size: 6857142.857142857,
                createdAt: '2023-10-01T17:52:32.829Z',
                modifiedAt: '2023-10-01T17:52:32.829Z',
                type: 'txt',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
                name: 'nauru-6015-small-fighter-left-gender.psd',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                size: 6000000,
                createdAt: '2023-09-30T16:52:32.829Z',
                modifiedAt: '2023-09-30T16:52:32.829Z',
                type: 'psd',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
                name: 'tv-xs.doc',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                size: 5333333.333333333,
                createdAt: '2023-09-29T15:52:32.829Z',
                modifiedAt: '2023-09-29T15:52:32.829Z',
                type: 'doc',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
                name: 'gustavia-entertainment-productivity.docx',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                size: 4800000,
                createdAt: '2023-09-28T14:52:32.829Z',
                modifiedAt: '2023-09-28T14:52:32.829Z',
                type: 'docx',
              },
            ],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '8bd65dd0-ad04-4169-8b9e-4afbse6fcb',
            body: 'Merak etmeyin, tüm dosyaların açıklamaları ve nasıl alacağınızı detaylı ve örnekli olarak açıkladık. Yüklediğiniz dosyaları ben görüntüleyip, onaylayacağım.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
                name: 'large-news.txt',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                size: 6857142.857142857,
                createdAt: '2023-10-01T17:52:32.829Z',
                modifiedAt: '2023-10-01T17:52:32.829Z',
                type: 'txt',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
                name: 'nauru-6015-small-fighter-left-gender.psd',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                size: 6000000,
                createdAt: '2023-09-30T16:52:32.829Z',
                modifiedAt: '2023-09-30T16:52:32.829Z',
                type: 'psd',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
                name: 'tv-xs.doc',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                size: 5333333.333333333,
                createdAt: '2023-09-29T15:52:32.829Z',
                modifiedAt: '2023-09-29T15:52:32.829Z',
                type: 'doc',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
                name: 'gustavia-entertainment-productivity.docx',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                size: 4800000,
                createdAt: '2023-09-28T14:52:32.829Z',
                modifiedAt: '2023-09-28T14:52:32.829Z',
                type: 'docx',
              },
            ],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '8bd65dd0-ad04-4169-8b9e-4afbse6fcb',
            body: 'www.vizedefteri.com',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
                name: 'large-news.txt',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/large_news.txt',
                size: 6857142.857142857,
                createdAt: '2023-10-01T17:52:32.829Z',
                modifiedAt: '2023-10-01T17:52:32.829Z',
                type: 'txt',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
                name: 'nauru-6015-small-fighter-left-gender.psd',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/nauru-6015-small-fighter-left-gender.psd',
                size: 6000000,
                createdAt: '2023-09-30T16:52:32.829Z',
                modifiedAt: '2023-09-30T16:52:32.829Z',
                type: 'psd',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
                name: 'tv-xs.doc',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/tv-xs.doc',
                size: 5333333.333333333,
                createdAt: '2023-09-29T15:52:32.829Z',
                modifiedAt: '2023-09-29T15:52:32.829Z',
                type: 'doc',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
                name: 'gustavia-entertainment-productivity.docx',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                preview:
                  'https://www.cloud.com/s/c218bo6kjuqyv66/gustavia-entertainment-productivity.docx',
                size: 4800000,
                createdAt: '2023-09-28T14:52:32.829Z',
                modifiedAt: '2023-09-28T14:52:32.829Z',
                type: 'docx',
              },
            ],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '0f35aa92-123d-4cc6-988c-88d6e5e142ac',
            body: 'Çok teşekkürler! Gerekli dosyaların hepsini yükledim.. Sizin onayınızı bekliyorlar.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
        ],
      });
  });
  let data = {
    conversations: conv,
  };
  return data;
}

export function useGetConversations() {
  const { customerList } = useContext(GlobalContext);
  let data = getConversations(customerList.customers);
  const byId = keyBy(data?.conversations, 'id') || {};
  const allIds = Object.keys(byId) || [];
  return {
    conversations: {
      byId,
      allIds,
    },
  };
}

// ----------------------------------------------------------------------

export function useGetConversation(conversationId) {
  const { customerList } = useContext(GlobalContext);
  let data = getConversations(customerList.customers).conversations.filter(
    (x) => x.id == conversationId
  )[0];
  return {
    conversation: data,
  };
}

// ----------------------------------------------------------------------

export async function sendMessage(conversationId, messageData) {
  const CONVERSATIONS_URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  const CONVERSATION_URL = [
    endpoints.chat,
    {
      params: { conversationId, endpoint: 'conversation' },
    },
  ];

  /**
   * Work on server
   */
  // const data = { conversationId, messageData };
  // await axios.put(endpoints.chat, data);

  /**
   * Work in local
   */
  mutate(
    CONVERSATION_URL,
    (currentData) => {
      const { conversation: currentConversation } = currentData;

      const conversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, messageData],
      };

      return {
        conversation,
      };
    },
    false
  );

  /**
   * Work in local
   */
  mutate(
    CONVERSATIONS_URL,
    (currentData) => {
      const { conversations: currentConversations } = currentData;

      const conversations = currentConversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages: [...conversation.messages, messageData],
            }
          : conversation
      );

      return {
        conversations,
      };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createConversation(conversationData) {
  const URL = [endpoints.chat, { params: { endpoint: 'conversations' } }];

  /**
   * Work on server
   */
  const data = { conversationData };
  const res = await axios.post(endpoints.chat, data);

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const conversations = [...currentData.conversations, conversationData];
      return {
        ...currentData,
        conversations,
      };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------

export function clickConversation(conversationId) {
  const { customerList } = useContext(GlobalContext);
  let data = getConversations(customerList.customers).conversations.filter(
    (x) => x.id == conversationId
  )[0];

  /**
   * Work on server
   */
  // await axios.get(URL, { params: { conversationId, endpoint: 'mark-as-seen' } });

  /**
   * Work in local
   */
  return {
    data,
  };
}
