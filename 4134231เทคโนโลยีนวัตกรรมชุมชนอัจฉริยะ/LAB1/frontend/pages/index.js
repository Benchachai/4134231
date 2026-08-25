import React, { useState } from 'react'
import { Container, Button, Box, Typography, CircularProgress } from '@mui/material'
import { getStatus } from '../services/api'

export default function Home() {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  async function fetchStatus() {
    setLoading(true)
    try {
      const res = await getStatus()
      setStatus(res)
    } catch (e) {
      setStatus({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" gutterBottom>
        Mobile-first Frontend
      </Typography>
      <Typography variant="body1" gutterBottom>
        This frontend connects to the backend via API. Use the button below to check status.
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={fetchStatus} disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Check Backend'}
        </Button>
      </Box>

      <Box sx={{ mt: 3 }}>
        {status && <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(status, null, 2)}</pre>}
      </Box>
    </Container>
  )
}
