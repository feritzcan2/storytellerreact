import keyBy from 'lodash/keyBy';
import { mutate } from 'swr';
// utils
import axios, { endpoints } from 'src/utils/axios';
import CustomerService from './CustomerService';

// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export async function useGetContacts() {
  const URL = [endpoints.chat, { params: { endpoint: 'contacts' } }];
  const { getCustomerNames } = CustomerService();
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

// ----------------------------------------------------------------------

function getConversations() {
  let data = {
    conversations: [
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
            role: 'Data Analyst',
            email: 'ashlynn_ohara62@gmail.com',
            name: 'Lucian Obrien',
            lastActivity: '2023-10-06T22:52:32.830Z',
            address: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
            phoneNumber: '904-966-2836',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: 'f3ae5864-2627-44b9-a20f-236ed11ce059',
            body: 'She eagerly opened the gift, her eyes sparkling with excitement.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                name: 'cover-2.jpg',
                path: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                preview: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                size: 48000000,
                createdAt: '2023-10-07T23:52:32.829Z',
                modifiedAt: '2023-10-07T23:52:32.829Z',
                type: 'jpg',
              },
            ],
            createdAt: '2023-10-07T13:52:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          },
          {
            id: '2eb0341a-fcd9-4a4d-b202-9ea74836fde1',
            body: 'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                name: 'design-suriname-2015.mp3',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                size: 24000000,
                createdAt: '2023-10-06T22:52:32.829Z',
                modifiedAt: '2023-10-06T22:52:32.829Z',
                type: 'mp3',
              },
            ],
            createdAt: '2023-10-07T21:52:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'b4069dec-0a2b-4f49-8a31-8aee67b1dbe0',
            body: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
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
            ],
            createdAt: '2023-10-07T23:44:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          },
          {
            id: '2cf61041-11ce-440d-8711-31991c0ac548',
            body: 'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            contentType: 'text',
            attachments: [
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
            createdAt: '2023-10-07T23:46:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '1ff49748-d817-4710-bcd0-526ca7bd87d8',
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
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
            createdAt: '2023-10-07T23:48:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          },
          {
            id: '656a826d-d32b-47d4-9a61-71ff133562c9',
            attachments: [],
            contentType: 'image',
            body: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg',
            createdAt: '2023-10-07T23:50:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          },
          {
            id: '0bcd9f07-098c-42b7-ac0c-345bbfbf1b2a',
            contentType: 'text',
            attachments: [],
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            createdAt: '2023-10-07T23:50:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '6c0701a7-0953-483c-ab06-7cc92e0c24f8',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:50:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
            role: 'Legal Counsel',
            email: 'milo.farrell@hotmail.com',
            name: 'Deja Brady',
            lastActivity: '2023-10-05T21:52:32.830Z',
            address: '18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
            phoneNumber: '399-757-9909',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: '535b84a2-9fc0-4563-8773-fd359e2e741f',
            body: 'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T15:52:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          },
          {
            id: 'b080dd79-87c1-4ec3-9610-97cd3c080c3b',
            body: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T17:52:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'f9a8f78e-ede4-4af7-9c06-715326e5ed29',
            body: 'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T19:22:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          },
          {
            id: 'b7193975-823f-43cf-aa41-85faabdd5f3d',
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T21:37:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'b86d47e9-fbd4-492a-b13a-a3fdc8ba98a0',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T22:37:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          },
          {
            id: 'd584f8b2-b4ca-41cd-b9f9-7229bf96d239',
            body: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg',
            attachments: [],
            contentType: 'image',
            createdAt: '2023-10-07T22:52:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          },
          {
            id: 'ddae8ce7-17c9-482d-946d-1e92be538d40',
            body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:07:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
            role: 'UX/UI Designer',
            email: 'violet.ratke86@yahoo.com',
            name: 'Harrison Stein',
            lastActivity: '2023-10-04T20:52:32.830Z',
            address: '110 Lamar Station Apt. 730 - Hagerstown, OK / 49808',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
            phoneNumber: '692-767-2903',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: 'a1dfd441-9295-48f7-9716-ce1eae692a62',
            body: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                name: 'cover-2.jpg',
                path: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                preview: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                size: 48000000,
                createdAt: '2023-10-07T23:52:32.829Z',
                modifiedAt: '2023-10-07T23:52:32.829Z',
                type: 'jpg',
              },
            ],
            createdAt: '2023-10-07T15:52:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
          {
            id: '79b2e9c3-57a2-4ca2-a5ba-8feea85b83de',
            body: 'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                name: 'design-suriname-2015.mp3',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                size: 24000000,
                createdAt: '2023-10-06T22:52:32.829Z',
                modifiedAt: '2023-10-06T22:52:32.829Z',
                type: 'mp3',
              },
            ],
            createdAt: '2023-10-07T17:52:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '804aa36d-c4ed-4c1e-9ae4-fa1efb7800f7',
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T19:22:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
          {
            id: 'ef0e5dcb-56e4-40ad-b78c-503938862fb3',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
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
            createdAt: '2023-10-07T21:37:32.830Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '7fbad870-4370-4265-b7f3-f80b34f409aa',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T22:37:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
          {
            id: '862d32de-4774-4ca5-b9ad-834c32496d6a',
            body: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg',
            contentType: 'image',
            attachments: [],
            createdAt: '2023-10-07T22:52:32.830Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
          {
            id: '513a93b5-94e0-46fd-8ee5-29b26e81dbae',
            body: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_10.jpg',
            contentType: 'image',
            attachments: [],
            createdAt: '2023-10-07T22:52:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
            role: 'Project Manager',
            email: 'letha_lubowitz24@yahoo.com',
            name: 'Reece Chung',
            lastActivity: '2023-10-03T19:52:32.830Z',
            address: '36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
            phoneNumber: '990-588-5716',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 8,
        messages: [
          {
            id: '565b8c6d-96ee-46a6-8221-30ff3199d25c',
            body: 'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
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
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
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
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:47:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
          {
            id: '4a4bcea5-b88b-4f2a-a321-4632aabf8da4',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:49:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '8bd65dd0-ad04-4169-8b9e-4afbb4ce6fcb',
            body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
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
            body: 'She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
            role: 'Account Manager',
            email: 'aditya_greenfelder31@gmail.com',
            name: 'Lainey Davidson',
            lastActivity: '2023-10-02T18:52:32.830Z',
            address: '2089 Runolfsson Harbors Suite 886 - Chapel Hill, TX / 32827',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_6.jpg',
            phoneNumber: '955-439-2578',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: 'b637eaba-6d50-49b3-84b9-87baed437b6b',
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'dba50ba3-ebb9-4a76-8761-a466f2295f0f',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'alway',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
            role: 'Registered Nurse',
            email: 'lenna_bergnaum27@hotmail.com',
            name: 'Cristopher Cardenas',
            lastActivity: '2023-10-01T17:52:32.830Z',
            address: '279 Karolann Ports Apt. 774 - Prescott Valley, WV / 53905',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
            phoneNumber: '226-924-4058',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: '789f8947-1ebf-465a-8112-358c1f03d789',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'fcc170ca-d47e-47f8-9556-507d98df2cff',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2gr',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'alway',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
            role: 'Registered Nurse',
            email: 'lenna_bergnaum27@hotmail.com',
            name: 'Cristopher Cardenas',
            lastActivity: '2023-10-01T17:52:32.830Z',
            address: '279 Karolann Ports Apt. 774 - Prescott Valley, WV / 53905',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_7.jpg',
            phoneNumber: '226-924-4058',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
            role: 'Business Analyst',
            email: 'luella.ryan33@gmail.com',
            name: 'Melanie Noble',
            lastActivity: '2023-09-30T16:52:32.830Z',
            address: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
            phoneNumber: '552-917-1454',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
            role: 'Creative Director',
            email: 'joana.simonis84@gmail.com',
            name: 'Chase Day',
            lastActivity: '2023-09-29T15:52:32.830Z',
            address: '9388 Auer Station Suite 573 - Honolulu, AK / 98024',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg',
            phoneNumber: '285-840-9338',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
            role: 'Financial Planner',
            email: 'marjolaine_white94@gmail.com',
            name: 'Shawn Manning',
            lastActivity: '2023-09-28T14:52:32.830Z',
            address: '47665 Adaline Squares Suite 510 - Blacksburg, NE / 53515',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg',
            phoneNumber: '306-269-2446',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
            role: 'Event Coordinator',
            email: 'vergie_block82@hotmail.com',
            name: 'Soren Durham',
            lastActivity: '2023-09-27T13:52:32.830Z',
            address: '989 Vernice Flats Apt. 183 - Billings, NV / 04147',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg',
            phoneNumber: '883-373-6253',
          },
        ],
        type: 'GROUP',
        unreadCount: 2,
        messages: [
          {
            id: 'bf3a4837-4a4e-4c67-8a64-a24af4950da0',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T21:22:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '89acd0e2-49b3-4fc2-b1da-3f4fdd0db631',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T21:23:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
          },
          {
            id: 'bd3060e1-9641-4828-afe3-0f5c80208856',
            body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T21:24:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
          },
          {
            id: '39c3e6eb-abb3-4fd9-af9a-951605a6572a',
            body: 'She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T21:25:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
          },
          {
            id: '5f11d751-3518-4817-89cb-588d7d10d06f',
            attachments: [],
            body: 'The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.',
            contentType: 'text',
            createdAt: '2023-10-04T21:26:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '5546a159-9461-4446-abf9-b94f8044304e',
            body: 'The hiker trekked through the dense forest, guided by the soft glow of sunlight filtering through the trees.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T23:52:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7',
          },
          {
            id: '53645ad2-30c7-4d4d-be37-00185fcb7370',
            body: 'The delicate butterfly gracefully fluttered from flower to flower, sipping nectar with its slender proboscis.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-04T23:52:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
            role: 'Business Analyst',
            email: 'luella.ryan33@gmail.com',
            name: 'Melanie Noble',
            lastActivity: '2023-09-30T16:52:32.830Z',
            address: '96607 Claire Square Suite 591 - St. Louis Park, HI / 40802',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_8.jpg',
            phoneNumber: '552-917-1454',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: '0435e64f-fc16-4c72-983f-cd3bde0c15f4',
            body: 'The waves crashed against the shore, creating a soothing symphony of sound.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'a3eb502d-be87-4900-90ef-4821b3e7e3a0',
            body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
            role: 'Creative Director',
            email: 'joana.simonis84@gmail.com',
            name: 'Chase Day',
            lastActivity: '2023-09-29T15:52:32.830Z',
            address: '9388 Auer Station Suite 573 - Honolulu, AK / 98024',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_9.jpg',
            phoneNumber: '285-840-9338',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: '24385207-55c6-4f60-ad35-bce632114463',
            body: 'The scent of blooming flowers wafted through the garden, creating a fragrant paradise.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'ddee148e-653f-4397-b9b8-e1fd438e6903',
            body: 'She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
            role: 'Financial Planner',
            email: 'marjolaine_white94@gmail.com',
            name: 'Shawn Manning',
            lastActivity: '2023-09-28T14:52:32.830Z',
            address: '47665 Adaline Squares Suite 510 - Blacksburg, NE / 53515',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_10.jpg',
            phoneNumber: '306-269-2446',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: 'bcd1cf32-c706-439e-895a-46b7b3ee60aa',
            body: 'She gazed up at the night sky, marveling at the twinkling stars that dotted the darkness.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'b8d24d1b-3a4c-4720-92d5-eea8175f19cc',
            body: 'The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3gr',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
            role: 'Data Analyst',
            email: 'ashlynn_ohara62@gmail.com',
            name: 'Lucian Obrien',
            lastActivity: '2023-10-06T22:52:32.830Z',
            address: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
            phoneNumber: '904-966-2836',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
            role: 'Legal Counsel',
            email: 'milo.farrell@hotmail.com',
            name: 'Deja Brady',
            lastActivity: '2023-10-05T21:52:32.830Z',
            address: '18605 Thompson Circle Apt. 086 - Idaho Falls, WV / 50337',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
            phoneNumber: '399-757-9909',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
            role: 'Project Manager',
            email: 'letha_lubowitz24@yahoo.com',
            name: 'Reece Chung',
            lastActivity: '2023-10-03T19:52:32.830Z',
            address: '36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
            phoneNumber: '990-588-5716',
          },
          {
            status: 'online',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
            role: 'UX/UI Designer',
            email: 'violet.ratke86@yahoo.com',
            name: 'Harrison Stein',
            lastActivity: '2023-10-04T20:52:32.830Z',
            address: '110 Lamar Station Apt. 730 - Hagerstown, OK / 49808',
            avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
            phoneNumber: '692-767-2903',
          },
        ],
        type: 'GROUP',
        unreadCount: 0,
        messages: [
          {
            id: 'cb9ca8a1-db05-4ffd-9bd8-969cb737a881',
            body: 'She eagerly opened the gift, her eyes sparkling with excitement.',
            contentType: 'text',
            attachments: [
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
                name: 'cover-2.jpg',
                path: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                preview: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
                size: 48000000,
                createdAt: '2023-10-07T23:52:32.829Z',
                modifiedAt: '2023-10-07T23:52:32.829Z',
                type: 'jpg',
              },
              {
                id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
                name: 'design-suriname-2015.mp3',
                path: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                preview: 'https://www.cloud.com/s/c218bo6kjuqyv66/design_suriname_2015.mp3',
                size: 24000000,
                createdAt: '2023-10-06T22:52:32.829Z',
                modifiedAt: '2023-10-06T22:52:32.829Z',
                type: 'mp3',
              },
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
            ],
            createdAt: '2023-10-04T21:22:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '0970c765-1818-4d35-b720-c049807ed49f',
            body: 'The old oak tree stood tall and majestic, its branches swaying gently in the breeze.',
            contentType: 'text',
            attachments: [
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
            createdAt: '2023-10-04T21:23:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          },
          {
            id: 'c192ab8f-6bec-4dcc-b622-c3246a59c737',
            body: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
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
            ],
            createdAt: '2023-10-04T21:24:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          },
          {
            id: '75f74212-ac29-4a94-b002-42d14b2c20cd',
            body: 'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
            contentType: 'text',
            attachments: [
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
            ],
            createdAt: '2023-10-04T21:25:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          },
          {
            id: 'b71cb4d1-5cd8-4215-9510-761bf0b4deb5',
            body: 'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
            contentType: 'text',
            attachments: [
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
            ],
            createdAt: '2023-10-04T21:26:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: '3cd98cde-7a23-4dd9-b8b8-1464380af821',
            body: 'The concert was a mesmerizing experience, with the music filling the venue and the crowd cheering in delight.',
            contentType: 'text',
            attachments: [
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
            createdAt: '2023-10-04T23:52:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          },
        ],
      },
      {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
        participants: [
          {
            status: 'online',
            id: '8864c717-587d-472a-929a-8e5f298024da-0',
            role: 'admin',
            email: 'demo@minimals.cc',
            name: 'Jaydon Frankie',
            lastActivity: '2023-10-07T23:52:32.830Z',
            address: '90210 Broadway Blvd',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg',
            phoneNumber: '+40 777666555',
          },
          {
            status: 'offline',
            id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
            role: 'Event Coordinator',
            email: 'vergie_block82@hotmail.com',
            name: 'Soren Durham',
            lastActivity: '2023-09-27T13:52:32.830Z',
            address: '989 Vernice Flats Apt. 183 - Billings, NV / 04147',
            avatarUrl:
              'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_11.jpg',
            phoneNumber: '883-373-6253',
          },
        ],
        type: 'ONE_TO_ONE',
        unreadCount: 0,
        messages: [
          {
            id: '3bc0b731-4dc5-444f-9ea9-9ebe77d0c809',
            body: 'The professor delivered a captivating lecture, engaging the students with thought-provoking ideas.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
          },
          {
            id: 'cfd10ebd-e635-4d60-bc07-a0abb0b12c86',
            body: 'The hiker trekked through the dense forest, guided by the soft glow of sunlight filtering through the trees.',
            contentType: 'text',
            attachments: [],
            createdAt: '2023-10-07T23:51:32.831Z',
            senderId: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11',
          },
        ],
      },
    ],
  };
  return data;
}

export function useGetConversations() {
  let data = getConversations();
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
  let data = getConversations().conversations.filter((x) => x.id == conversationId)[0];
  debugger;
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

export async function clickConversation(conversationId) {
  const URL = endpoints.chat;
  let data = getConversations().conversations.filter((x) => x.id == conversationId)[0];

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
