import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersReducer = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/users',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['user'],
  endpoints: builder => ({
    registerUser: builder.mutation({
      queryFn: async (contact, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: '/signup',
          method: 'POST',
          body: contact,
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 400:
                  return {
                    error: { status: 400, data: 'Wrong email or passwird' },
                  };
                case 404:
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                case 500:
                  return { error: { status: 500, data: 'Servers error' } };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['user'],
    }),
    loginUser: builder.mutation({
      queryFn: async (contact, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: `/login`,
          method: 'POST',
          body: contact,
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 400:
                  return {
                    error: { status: 400, data: 'Wrong email or passwird' },
                  };
                case 404:
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
      invalidatesTags: ['user'],
    }),
    logoutUser: builder.mutation({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        const res = await baseQuery({
          url: '/logout',
          method: 'POST',
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 401:
                  return {
                    error: { status: 401, data: 'No authorization' },
                  };
                case 404:
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                case 500:
                  return {
                    error: { status: 500, data: 'Servers error' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
    }),
    getUser: builder.query({
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        if (!queryApi.getState().auth.token) {
          return { data: { name: null, email: null } };
        }
        const res = await baseQuery({
          url: '/current',
        })
          .then(response => {
            if (response.error) {
              switch (response.error.status) {
                case 401:
                  return {
                    error: { status: 401, data: 'No authorization' },
                  };
                case 404:
                  return {
                    error: { status: 404, data: 'Not found' },
                  };
                default:
                  return response.error;
              }
            }
            return response;
          })
          .catch(error => error);
        return res;
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetUserQuery,
} = usersReducer;
