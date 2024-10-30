import { baseApi } from "../api/baseApi";

const postSetupTrialMatchApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      postSetupTrialMatch: builder.mutation({
        query: (data) => ({
          url: `/setup-trail-match`,
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        transformResponse: (response) => {
          if (typeof response === "string" && response.startsWith("<!doctype html>")) {
            throw new Error("Received an unexpected HTML response.");
          }
          return response;
        },
      }),
    }),
  });
  
  export const { usePostSetupTrialMatchMutation } = postSetupTrialMatchApi;
  