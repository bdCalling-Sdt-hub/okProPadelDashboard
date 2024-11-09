import { baseApi } from "../api/baseApi";

const postTermsAndConditionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postTermsAndCondition: builder.mutation({
        query: (data) => ({
          url: `/terms-and-conditions/1`,
          method: 'POST',
          body: data,
         
        }),
        invalidatesTags: ["Settings"]
      }),
    }),
  });
  
  export const { usePostTermsAndConditionMutation} = postTermsAndConditionApi;
  