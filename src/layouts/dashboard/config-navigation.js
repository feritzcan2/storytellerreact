import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: 'Genel',
        items: [{ title: 'Anasayfa', path: paths.dashboard.root, icon: ICONS.dashboard }],
      },
      {
        subheader: 'Müşteri Yönetimi',
        items: [
          { title: 'Yeni Müşteri', path: paths.customer.newCustomer, icon: ICONS.dashboard },
          { title: 'Müşteri Listesi', path: paths.customer.customerList, icon: ICONS.ecommerce },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: 'Randevu Takibi',
        items: [
          {
            title: 'Ülkeler',
            path: paths.countryTracking.countries.root,
            icon: ICONS.user,
            children: [
              { title: 'İspanya', path: paths.countryTracking.countries.spain },
              { title: 'Almanya', path: paths.countryTracking.countries.almanya },
              { title: 'Hollanda', path: paths.countryTracking.countries.hollanda },
              { title: 'Yunanistan', path: paths.countryTracking.countries.yunanistan },
              { title: 'İtalya', path: paths.countryTracking.countries.italya },
            ],
          },
          {
            title: 'Bildirim Ayarları',
            path: paths.countryTracking.notifications,
            icon: ICONS.ecommerce,
          },
        ],
      },
    ],
    []
  );

  return data;
}
