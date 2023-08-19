import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Stack from '@mui/material/Stack'
import { renderTextField } from '../../../components/redux-form'
import LoadingButton from '@mui/lab/LoadingButton'
import { FormProps } from '../../../components/redux-form/types'
import useMediaQuery from '@mui/material/useMediaQuery'
import { GroupRoomsForm } from '../types'
import { validators } from '../../../utils'
import DepartmentField from '../../../fields/DepartmentField'
import LabelField from '../../../fields/LabelField'
import { useTranslation } from 'react-i18next'

const GroupRoomForm = reduxForm<GroupRoomsForm, FormProps>({
  form: 'groupRoomForm',
})((props) => {
  const {
    handleSubmit,
    pristine,
    submitting,
    invalid,
    response,
    initialValues,
  } = props
  const matches = useMediaQuery((theme: any) => theme.breakpoints.up('sm'))
  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={3}
        width={matches ? 350 : window.innerWidth - 112}
      >
        <Field
          name="firstNumber"
          label={t('First number')}
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
        />
        <Field
          name="increment"
          label={t('Increment')}
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
        />
        <Field
          name="lastNumber"
          label={t('Last number')}
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
        />
        <Field
          name="capacity"
          label={t('Capacity')}
          component={renderTextField}
          required
          validate={[validators.required, validators.number]}
          disabled={!!initialValues}
        />
        <DepartmentField />
        <LabelField />
        <LoadingButton
          variant="outlined"
          type="submit"
          disabled={invalid || pristine || submitting}
          loading={response.status === 'pending'}
          loadingPosition="center"
          sx={{ width: '120px' }}
        >
          {t('Save')}
        </LoadingButton>
      </Stack>
    </form>
  )
})

export default GroupRoomForm
