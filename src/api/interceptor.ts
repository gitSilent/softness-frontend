import { DOMAIN, refreshToken } from "./requests";
import { addMinutes } from "../service/addMinutes";
import axios from "axios";


export const instance = axios.create({
});


// создаем перехватчик запросов
// который к каждому запросу добавляет accessToken из куки
instance.interceptors.request.use(
  (config) => {

    let accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)access\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  }
)


// создаем перехватчик ответов
// который в случае невалидного accessToken попытается его обновить
// и переотправить запрос с обновленным accessToken
instance.interceptors.response.use(
  // в случае валидного accessToken ничего не делаем:
  (config) => {
    return config;
  },
  // в случае просроченного accessToken пытаемся его обновить:
  async (error) => {
    // если при получении ошибки в куках нет refresh ключа (истек), то сразу делаем соответствующий return о том, что токен истек и
    //пользователю нужно переавторизоваться 
    let refreshTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)refresh\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (refreshTokenCookie === "") {
      return false
    }

    const originalRequest = { ...error.config };

    // предотвращаем зацикленный запрос, добавляя свойство _isRetry 
    originalRequest._isRetry = true;
    if (
      // проверим, что ошибка именно из-за невалидного accessToken
      error.response.status === 401 &&
      // проверим, что запрос не повторный
      error.config &&
      !error.config._isRetry
    ) {
      try {
        // запрос на обновление токенов

        // const resp = await instance.post(domen + refreshTokenUrl, {
        //   "refresh": refreshToken
        // });

        const resp = await refreshToken({"refresh": refreshTokenCookie})
        // сохраняем новый accessToken в куки
        let currentDate = new Date();

        let newAccessToken = `access=${resp.data.access}; expires=${addMinutes(currentDate, 5)}`
        // кладем новый полученный access токен в куки и устанавливаем его в headers для повторного запроса авторизации
        document.cookie = newAccessToken;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

        // localStorage.setItem("token", resp.data.accessToken);
        // переотправляем запрос с обновленным accessToken
        return instance.request(originalRequest);
      } catch (error) {
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку 
    throw error;
  }
);
