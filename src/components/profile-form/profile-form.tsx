import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";

export const ProfileForm: React.FC = () => {
  const [login, setLogin] = useState("Марк");
  const loginRef = useRef<HTMLInputElement | null>(null);

  // Установка фокуса на инпут при загрузке
  useEffect(() => {
    loginRef.current?.focus();
  }, []);

  const onIconClick = () => {
    alert("Icon Click Callback");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          placeholder="Имя"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onIconClick={onIconClick}
          name="login"
          icon="EditIcon"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6 ml-15"
          ref={loginRef}
          disabled={true}
        />
        <Input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onIconClick={onIconClick}
          name="login"
          icon="EditIcon"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6 ml-15"
          disabled={true}
        />
        <Input
          type="text"
          placeholder="Пароль"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          onIconClick={onIconClick}
          name="login"
          icon="EditIcon"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6 ml-15"
          disabled={true}
        />
      </div>
    </form>
  );
};
