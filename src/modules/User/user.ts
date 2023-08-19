import { createApi } from '@reduxjs/toolkit/query/react'
import type { UserModel } from '../../types'
import type { ObjectsList, PaginationParams } from '../../types'
import baseQuery from '../../utils/baseQuery'
import { getURLSearchParams } from '../../utils'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<ObjectsList<UserModel>, PaginationParams>({
      query: (params) => `users/all?${getURLSearchParams(params)}`,
      providesTags: ['User'],
    }),
    getUser: builder.query<UserModel, string>({
      query: (id) => `users/${id}`,
    }),
    getUserByUsername: builder.query<UserModel, string>({
      query: (username) => `users/byName?username=${username}`,
    }),
    createUser: builder.mutation<null, UserModel>({
      query: (user) => ({
        url: `users/create/${
          JSON.parse(String(user.department)).id
        }/${user.roles
          .map((r) => JSON.parse(`${r}`))
          .map((r: any) => r.id)
          .join('/')}`,
        method: 'post',
        body: {
          ...user,
          department: JSON.parse(String(user.department)),
          roles: user.roles.map((r) => JSON.parse(`${r}`)),
        },
      }),
      invalidatesTags: ['User'],
    }),
    removeUser: builder.mutation<
      null,
      Partial<UserModel> & Pick<UserModel, 'id'>
    >({
      query: (user) => ({
        url: `users/delete/${user.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation<null, UserModel>({
      query: (user) => ({
        url: `users/update/${user.id}/${
          JSON.parse(String(user.department)).id
        }/${user.roles
          .map((r) => JSON.parse(`${r}`))
          .map((r: any) => r.id)
          .join('/')}`,
        method: 'put',
        body: {
          ...user,
          department: JSON.parse(String(user.department)),
          roles: user.roles.map((r) => JSON.parse(`${r}`)),
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useGetUserByUsernameQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
  useUpdateUserMutation,
} = userApi
