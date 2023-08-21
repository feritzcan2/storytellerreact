export const MainNav = [
  {
    icon: "pe-7s-rocket",
    label: "Dashboards",
    content: [
      {
        label: "Analytics",
        to: "#/dashboards/analytics",
      },
      {
        label: "Commerce",
        to: "#/dashboards/commerce",
      },
      {
        label: "Sales",
        to: "#/dashboards/sales",
      },
      {
        label: "Minimal",
        content: [
          {
            label: "Variation 1",
            to: "#/dashboards/minimal-dashboard-1",
          },
          {
            label: "Variation 2",
            to: "#/dashboards/minimal-dashboard-2",
          },
        ],
      },
      {
        label: "CRM",
        to: "#/dashboards/crm",
      },
    ],
  },
  {
    icon: "pe-7s-browser",
    label: "Pages",
    content: [
      {
        label: "Login",
        to: "#/pages/login",
      },
      {
        label: "Login Boxed",
        to: "#/pages/login-boxed",
      },
      {
        label: "Register",
        to: "#/pages/register",
      },
      {
        label: "Register Boxed",
        to: "#/pages/register-boxed",
      },
      {
        label: "Forgot Password",
        to: "#/pages/forgot-password",
      },
      {
        label: "Forgot Password Boxed",
        to: "#/pages/forgot-password-boxed",
      },
    ],
  },
  {
    icon: "pe-7s-plugin",
    label: "Applications",
    content: [
      {
        label: "Mailbox",
        to: "#/apps/mailbox",
      },
      {
        label: "Chat",
        to: "#/apps/chat",
      },
      {
        label: "FAQ Section",
        to: "#/apps/faq-section",
      },
    ],
  },
];
export const dateTrackerNav = [
  {
    icon: "pe-7s-diamond",
    label: "Ülkeler",
    content: [
      {
        label: "Almanya",
        to: "#/randevuTakibi/almanya",
      },
      {
        label: "Hollanda",
        to: "#/randevuTakibi/hollanda",
      },
      {
        label: "İspanya",
        to: "#/randevuTakibi/ispanya",
      },
      {
        label: "Yunanistan",
        to: "#/randevuTakibi/yunanistan",
      },
    ],
  },
  {
    icon: "pe-7s-display2",
    label: "Bildirim Ayarları",
    to: "#/bildirimAyarlari",
  },
];
