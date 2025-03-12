import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux"; // Для работы с Redux
import { loginUser } from "@services/auth/actions"; // Импортируем экшен для логина
import s from './login.module.scss';
import { RootState } from '@services/store'; // Типизация состояния Redux
import { AppDispatch } from '@services/store'; // Типизация для dispatch

export const Login: React.FC = () => {
  const [login, setLogin] = React.useState<string>(""); // Указываем тип строка
  const [password, setPassword] = React.useState<string>(""); // Указываем тип строка
  const loginRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch<AppDispatch>(); // Типизируем dispatch как AppDispatch
  const { error, loading } = useSelector((state: RootState) => state.user); // Получаем ошибку и состояние загрузки из Redux

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправляем данные для логина с типизацией
    dispatch(loginUser({ email: login, password }));
  };

  return (
    <div className={s.auth_div}>
      <form onSubmit={handleSubmit}>
        <div className="w-100 mb-6 text-center">
          <span className="text text_type_main-default">Вход</span>
        </div>
        <div>
          <Input
            type="text"
            placeholder="E-mail"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            ref={loginRef}
            name="login"
            error={error ? true : false} // Показ ошибки, если есть
            errorText={error || "Ошибка"} // Показываем текст ошибки
            size="default"
            extraClass="mb-6"
          />
        </div>

        <div>
          <Input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon="ShowIcon"
            ref={passwordRef}
            name="password"
            error={error ? true : false} // Показ ошибки, если есть
            errorText={error || "Ошибка"} // Показываем текст ошибки
            size="default"
            extraClass="mb-6"
          />
        </div>

        {/* Если есть ошибка, показываем её */}
        {error && (
          <div className="text text_type_main-default text_color_inactive mb-4">
            {error}
          </div>
        )}

        <div className="w-100 d-flex justify-center">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
            disabled={loading} // Отключаем кнопку при загрузке
          >
            Войти
          </Button>
        </div>

        <div className="d-flex w-100 text-center mb-4 justify-center">
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?
          </p>
          <Link className="ml-4 text text_type_main-default color-blue" to="/register">
            Зарегистрироваться
          </Link>
        </div>

        <div className="d-flex justify-center w-100 text-center mb-4">
          <p className="text text_type_main-small text_color_inactive">
            Забыли пароль?
          </p>
          <Link className="ml-4 text text_type_main-default color-blue" to="/forgot-password">
            Восстановить пароль
          </Link>
        </div>
      </form>
    </div>
  );
};
