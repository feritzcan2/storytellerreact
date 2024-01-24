// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/anasayfa',
  CUSTOMER: '/musteri',
  TRACKING: '/randevuTakip',
  SETTINGS: '/ayarlar',
  CLIENT: '/client',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    calendar: `${ROOTS.DASHBOARD}/takvim`,
    serviceHealth: `${ROOTS.DASHBOARD}/serviceHealth`,
  },
  customer: {
    newCustomer: `${ROOTS.CUSTOMER}/yeni`,
    customerList: `${ROOTS.CUSTOMER}/liste`,
    details: `${ROOTS.CUSTOMER}/detay`,
    messages: `${ROOTS.CUSTOMER}/mesajlar`,
    customer: `${ROOTS.CUSTOMER}/detay/5`,
  },
  countryTracking: {
    notifications: `${ROOTS.SETTINGS}/bildirim`,
    countries: {
      root: `${ROOTS.TRACKING}`,
      spain: `${ROOTS.TRACKING}/ispanya`,
      hollanda: `${ROOTS.TRACKING}/hollanda`,
      almanya: `${ROOTS.TRACKING}/almanya`,
      yunanistan: `${ROOTS.TRACKING}/yunanistan`,
      italya: `${ROOTS.TRACKING}/italya`,
    },
  },
  client: {
    clientPage: `${ROOTS.CLIENT}/3`,
  },
};
