import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "@hooks/index";
import s from './profile-form.module.scss'

export const ProfileForm: React.FC = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state) => state.user.user)
  const [isEditing, setIsEditing] = useState(false);
  const [login, setLogin] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setLogin(user.name);
      setEmail(user.email);
    }
  }, [user]);

  // Установка фокуса на инпут при загрузке
  useEffect(() => {
    loginRef.current?.focus();
  }, []);

  const onIconClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="">
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
          disabled={!isEditing}
        />
        <Input
          type="text"
          placeholder="Логин"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onIconClick={onIconClick}
          name="login"
          icon="EditIcon"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6 ml-15"
          disabled={!isEditing}
        />
        <Input
          type="text"
          placeholder="Пароль"
          value="******"
          onChange={(e) => setLogin(e.target.value)}
          onIconClick={onIconClick}
          name="login"
          icon="EditIcon"
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass="mb-6 ml-15"
          disabled={!isEditing}
        />
        <Button extraClass={s.save_btn} htmlType="submit">Сохранить</Button>
      </div>
    </form>
  );
};
