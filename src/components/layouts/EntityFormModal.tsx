import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/lab/AlertTitle'
import Stack from '@mui/material/Stack'
import { useSnackbar } from 'notistack'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string
  successAlertTitle?: string
  open: boolean
  onClose(): void
  entityData?: any
  form: any
  mutation(): any
}

const EntityFormModal: React.FC<Props> = (props) => {
  const {
    title,
    onClose,
    open,
    form,
    mutation,
    entityData,
    successAlertTitle,
  } = props
  const Form = form
  const [submit, response] = mutation()
  const { enqueueSnackbar } = useSnackbar()
  const { t } = useTranslation()
  const handleSubmit = (values: any) => {
    if (entityData) {
      submit({ ...entityData, ...values })
    } else {
      submit(values)
    }
  }
  React.useEffect(() => {
    console.log(response)
   
    if (response && response.status === 'fulfilled') {
      onClose()
      if (successAlertTitle) {
        enqueueSnackbar(successAlertTitle, {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'right' },
        })
      }
    }
    if (!open){response.status = null}
  }, [response,open])

  return (
    <Dialog onClose={onClose} maxWidth="lg" open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          overflowY: 'initial',
        }}
      >
        <Stack direction="column" spacing={3} maxWidth="min-content">
          {/* response.originalArgs.id == id && */ response.status === 'rejected' && (
            <Alert severity="error">
              <AlertTitle>{t('Error')}</AlertTitle>
              {response.error.data?.message || response.error.data?.error}
            </Alert>
          )}
          <Form
            onSubmit={handleSubmit}
            initialValues={entityData}
            response={response}
          />
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

export default EntityFormModal
