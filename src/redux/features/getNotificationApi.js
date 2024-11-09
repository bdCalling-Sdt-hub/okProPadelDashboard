import { baseApi } from "../api/baseApi";

const getNotificationsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getNotifications:builder.query({
            query:()=>`/notifications`,
            providesTags:["Users"],
        })
    })
})

export const {useGetNotificationsQuery} = getNotificationsApi;