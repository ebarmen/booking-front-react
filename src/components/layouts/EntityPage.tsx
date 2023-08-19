import * as React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import EntityFormModal from './EntityFormModal'

interface Props {
  title: string
  createBtnTitle: string
  form: any
  mutation: any
  container: any
  header?: any
}

const EntityPage: React.FC<Props> = ({
  title,
  createBtnTitle,
  form,
  mutation,
  container,
  header,
}) => {
  const [open, setOpen] = React.useState(false)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" mr={3}>
            {title}
          </Typography>
          <Button variant="text" startIcon={<AddIcon />} onClick={handleToggle}>
            {createBtnTitle}
          </Button>
          <EntityFormModal
            onClose={handleToggle}
            open={open}
            form={form}
            mutation={mutation}
            title={createBtnTitle}
          />
          {header}
        </Box>
      </Grid>
      <Grid item xs={12}>
        {container}
      </Grid>
    </Grid>
  )
}

export default EntityPage
