import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import s from "./profile.module.scss";

export const Profile: React.FC = () => {
  return (
    <div className="d-flex mr-auto mt-30">
      <div>
        <nav>
          <ul className={s.profile__nav}>
            <li className={s.profile__li}>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `${s.profile__link} ${isActive ? s.profile__active : ""}`
                }
                end
              >
                Профиль
              </NavLink>
            </li>
            <li className={s.profile__li}>
              <NavLink
                to="/profile/orders"
                className={({ isActive }) =>
                  `${s.profile__link} ${isActive ? s.profile__active : ""}`
                }
              >
                История заказов
              </NavLink>
            </li>
            <li className={s.profile__li}>
              <NavLink
                to="/profile/exit"
                className={({ isActive }) =>
                  `${s.profile__link} ${isActive ? s.profile__active : ""}`
                }
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={s.profile__info}>
            <span className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете изменить свои персональные данные
            </span>
          </p>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
