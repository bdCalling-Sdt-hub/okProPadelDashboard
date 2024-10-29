import { baseApi } from "../api/baseApi";


const getAllRequestApi = baseApi.injectEndpoints({
    endpoints:(builder) => ({
        getAllRequest:builder.query({
            query:() => `/request-match`,
            providesTags: ["Users"],
        })
    })
})

export const {useGetAllRequestQuery} = getAllRequestApi;