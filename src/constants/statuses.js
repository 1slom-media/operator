export const paymentStatus = ["accepted", "waiting", "fulfilled", "rejected"];
export const orderStatuses = [
  "new",
  "ready",
  "onway",
  "delivered",
  "canceled",
  "pending",
  "hold",
  "archived",
];

export const statusesByLabels = [
  {
    id: 1,
    status: "new",
    label: "Yangi",
    color: "#00bbf0",
  },
  {
    id: 2,
    status: "ready",
    label: "Tayyor",
    color: "#42b883",
  },
  {
    id: 3,
    status: "onway",
    label: "Yo'lda",
    color: "#6643b5",
  },
  {
    id: 4,
    status: "delivered",
    label: "Yetkazildi",
    color: "#a2c11c",
  },
  {
    id: 5,
    status: "canceled",
    label: "Bekor qilingan",
    color: "#f70776",
  },
  {
    id: 6,
    status: "pending",
    label: "Kutilmoqda",
    color: "#d59bf6",
  },
  {
    id: 7,
    status: "hold",
    label: "Omborda qolmagan",
    color: "#6643b5",
  },
  {
    id: 8,
    status: "archived",
    label: "Arxivlangan",
    archived: "#e8630a",
  },
];
