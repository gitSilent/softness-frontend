import { refreshToken, verifyToken } from "@/api/requests";
import { addMinutes } from "./addMinutes";

export async function authCheck() {

    let accessTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)access\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    let refreshTokenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)refresh\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (accessTokenCookie && refreshTokenCookie) {
        try {
            let res = await verifyToken({ token: accessTokenCookie })
            return true
        } catch (er) {
            try {
                let res = await refreshToken({ refresh: refreshTokenCookie })
                let currentDate = new Date();
                let newAccessToken = `access=${res.data.access}; expires=${addMinutes(currentDate, 5)}`
                document.cookie = newAccessToken;
                return true
            } catch (er) {
                let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
                let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

                document.cookie = cookieAccess;
                document.cookie = cookieRefresh;

                return false
            }
        }

        // return verifyToken({ token: accessTokenCookie })
        //     .then((res) => {
        //         return true
        //     }).catch((er) => {
        //         return refreshToken({ refresh: refreshTokenCookie })
        //             .then((res) => {
        //                 let currentDate = new Date();
        //                 let newAccessToken = `access=${res.data.access}; expires=${addMinutes(currentDate, 5)}`
        //                 return true
        //             }).catch((er) => {
        //                 let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
        //                 let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

        //                 document.cookie = cookieAccess;
        //                 document.cookie = cookieRefresh;

        //                 return false
        //             })
        //     })
    } else if (refreshTokenCookie) {
        try {
            let res = await refreshToken({ refresh: refreshTokenCookie })
            let currentDate = new Date();
            let newAccessToken = `access=${res.data.access}; expires=${addMinutes(currentDate, 5)}`
            document.cookie = newAccessToken;
            return true
        } catch (er) {
            let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
            let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

            document.cookie = cookieAccess;
            document.cookie = cookieRefresh;

            return false
        }



        // return refreshToken({ refresh: refreshTokenCookie })
        //     .then((res) => {
        //         let currentDate = new Date();
        //         let newAccessToken = `access=${res.data.access}; expires=${addMinutes(currentDate, 5)}`
        //         return true
        //     }).catch((er) => {
        //         let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
        //         let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

        //         document.cookie = cookieAccess;
        //         document.cookie = cookieRefresh;

        //         return false
        //     })
    } else {
        let cookieAccess = `access=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;
        let cookieRefresh = `refresh=""; expires= Thu, 01 Jan 1970 00:00:00 GMT}`;

        document.cookie = cookieAccess;
        document.cookie = cookieRefresh;

        return false
    }
}