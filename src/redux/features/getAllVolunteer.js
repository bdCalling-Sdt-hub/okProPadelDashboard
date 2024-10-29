import { baseApi } from "../api/baseApi";

const getAllVolunteerApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllVolunteer:builder.query({
            query:()=>`/volunteers`,
            providesTags:["Users"],
        })
    })
})

export const {useGetAllVolunteerQuery} = getAllVolunteerApi;