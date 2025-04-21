import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/burger-constructor/", // ⚠️ Укажи адрес, на котором работает твой проект
    setupNodeEvents(on, config) {
      // Здесь можно подключать плагины или хуки
    },
  },
});
