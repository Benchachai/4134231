import React from 'react'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Link from 'next/link'

export default function NavDrawer({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List sx={{ width: 250 }} onClick={onClose}>
        <ListItem disablePadding>
          <Link href="/" legacyBehavior>
            <ListItemButton component="a">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <Link href="/alerts" legacyBehavior>
            <ListItemButton component="a">
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Alerts" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton component="a" href="http://localhost:3000/docs" target="_blank">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="API Docs" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
