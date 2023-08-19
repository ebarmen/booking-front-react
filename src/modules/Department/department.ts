import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  ObjectsList,
  PaginationParams,
  DepartmentModel,
} from '../../types'
import baseQuery from '../../utils/baseQuery'

export const departmentApi = createApi({
  reducerPath: 'departmentApi',
  baseQuery,
  tagTypes: ['Department'],
  endpoints: (builder) => ({
    getAllDepartments: builder.query<
      ObjectsList<DepartmentModel>,
      PaginationParams
    >({
      query: ({ page }) => `department/get?pageNumber=${page}`,
      providesTags: ['Department'],
    }),
    createDepartment: builder.mutation<null, DepartmentModel>({
      query: (department) => ({
        url: `department/create/${JSON.parse(`${department.hospital}`).id}`,
        method: 'post',
        body: {
          ...department,
          hospital: JSON.parse(`${department.hospital}`),
        },
      }),
      invalidatesTags: ['Department'],
    }),
    removeDepartment: builder.mutation<
      null,
      Partial<DepartmentModel> & Pick<DepartmentModel, 'id'>
    >({
      query: (department) => ({
        url: `department/delete/${department.id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Department'],
    }),
    updateDepartment: builder.mutation<null, DepartmentModel>({
      query: (department) => {
        return {
          url: `department/update/${department.id}/${department.hospital.id}`,
          method: 'put',
          body: {
            ...department,
          },
        }
      },
      invalidatesTags: ['Department'],
    }),
  }),
})

export const {
  useGetAllDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useRemoveDepartmentMutation,
} = departmentApi
