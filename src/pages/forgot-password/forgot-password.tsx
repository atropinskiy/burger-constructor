import { Link, useNavigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import s from '../login/login.module.scss';
import { useDispatch } from "@hooks/index";
import { forgotPassword } from "@services/auth/actions";


export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const dispatch = useDispatch();
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("E-mail для восстановления пароля:", email);

    const response = await dispatch(forgotPassword({ email }));

    if (response.meta.requestStatus === 'fulfilled') {
      // Если запрос успешен, перенаправляем на страницу reset-password
      navigate('/reset-password');
    } else {
      // Обработка ошибки, если запрос не удался
      console.error('Ошибка восстановления пароля:', response.payload);
    }
  };

  return (
    <div className={s.auth_div}>
      <form onSubmit={handleSubmit}>
        <div className="w-100 mb-6 text-center">
          <span className="text text_type_main-default">Восстановление пароля</span>
        </div>

        <div>
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            name="email"
            error={false}
            errorText="Ошибка"
            size="default"
            extraClass="mb-6" // Добавил отступ между инпутами
          />
        </div>

        <div className="w-100 d-flex justify-center">
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            extraClass="mb-20"
          >
            Восстановить
          </Button>
        </div>

        <div className="d-flex w-100 text-center mb-4 justify-center">
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </p>
          <Link className="ml-4 text text_type_main-default color-blue" to="/login">Войти</Link>
        </div>
      </form>
    </div>
  );
};
