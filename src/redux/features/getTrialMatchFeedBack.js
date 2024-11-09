import { baseApi } from "../api/baseApi";

const getTrialMatchFeedBackApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        trialMatchFeedBack:builder.query({
            query:()=>`/trail-match-feedback`,
            providesTags:["Users"],
        })
    })
})

export const {useTrialMatchFeedBackQuery} = getTrialMatchFeedBackApi;