import { baseApi } from "../api/baseApi";

const getNormalMatchFeedBackApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        normalMatchFeedBack:builder.query({
            query:()=>`/normal-match-feedback`,
            providesTags:["Users"],
        })
    })
})

export const {useNormalMatchFeedBackQuery} = getNormalMatchFeedBackApi;