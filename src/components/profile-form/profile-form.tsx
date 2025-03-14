import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "@hooks/index";
import s from './profile-form.module.scss';
import { useDispatch } from "@hooks/index";
import { updateUser } from "@services/auth/actions";

export const ProfileForm: React.FC = () => {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('accessToken');
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [login, setLogin] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState<string>("");
  setIsEditing(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setError("Токен не найден. Пожалуйста, войдите в систему.");
      return;
    }

    try {
      // Вызываем экшен для обновления данных пользователя
      await dispatch(updateUser({ email, name: login, token })).unwrap();
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message || "Не удалось обновить профиль");
    }
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
          disabled={true}
        />
        <Button extraClass={s.save_btn} htmlType="submit">Сохранить</Button>
        
        {error && (
          <div className="text text_type_main-small text_color_inactive mt-4">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};
