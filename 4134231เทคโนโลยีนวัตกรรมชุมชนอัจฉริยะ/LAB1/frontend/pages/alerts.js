import React from 'react'
import { Container, Typography } from '@mui/material'

export default function Alerts() {
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        Alerts
      </Typography>
      <Typography variant="body1">This is a placeholder Alerts page.</Typography>
    </Container>
  )
}
