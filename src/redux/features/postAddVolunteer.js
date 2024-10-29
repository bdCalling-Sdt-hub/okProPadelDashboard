import { baseApi } from "../api/baseApi";

const postAddVolunteerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postAddVolunteer: builder.mutation({
        query: (data) => ({
          url: `/volunteer`,
          method: 'POST',
          body: data,
         
        }),
      }),
    }),
  });
  
  export const { usePostAddVolunteerMutation } = postAddVolunteerApi;
  