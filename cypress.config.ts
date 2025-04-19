import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080", // ⚠️ Укажи адрес, на котором работает твой проект
    setupNodeEvents(on, config) {
      // Здесь можно подключать плагины или хуки
    },
  },
});
