import React from 'react'
import { RoomModel } from '../../../types'
import { ObjectsList } from '../../../../../types'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'react-i18next'

interface RoomsTableHeaderProps {
  rooms: ObjectsList<RoomModel>
  selected: number[]
  onSelectAll(checked: boolean): void
}

const RoomsTableHeader: React.FC<RoomsTableHeaderProps> = (props) => {
  const matchesLg = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const matchesMd = useMediaQuery((theme: any) => theme.breakpoints.up('md'))

  const { t } = useTranslation()

  const { selected, rooms, onSelectAll } = props

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSelectAll(event.target.checked)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={
              selected.length > 0 && selected.length < rooms.content.length
            }
            checked={
              rooms.content.length > 0 &&
              selected.length === rooms.content.length
            }
            onChange={handleSelectAll}
          />
        </TableCell>
        <TableCell>{t('ID')}</TableCell>
        {!matchesMd && <TableCell></TableCell>}
        {matchesMd && (
          <>
            <TableCell>{t('Room')}</TableCell>
            <TableCell>{t('Capacity')}</TableCell>
            <TableCell>{t('Label')}</TableCell>
            <TableCell>{t('Department')}</TableCell>
          </>
        )}
        {matchesLg && <TableCell>{t('Places')}</TableCell>}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default RoomsTableHeader
