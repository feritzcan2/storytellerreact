// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/anasayfa',
  CUSTOMER: '/musteri',
  TRACKING: '/randevuTakip',
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
  },
  customer: {
    newCustomer: `${ROOTS.CUSTOMER}/yeni`,
    customerList: `${ROOTS.CUSTOMER}/liste`,
    customerList2: `${ROOTS.CUSTOMER}/liste2`,
    detrails: `${ROOTS.CUSTOMER}/detay`,
    customer: `${ROOTS.CUSTOMER}/5`,
  },
  countryTracking: {
    notifications: `${ROOTS.TRACKING}/bildirimAyarlari`,
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
