import { useState, useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
// import { ProgramContext } from '../context/program';
const settings = ['Login','Logout'];

export default function NavBar(props){
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { logout, isAuthenticated, loginWithRedirect } = useAuth0();
  console.log(isAuthenticated)
  // const user = useContext(ProgramContext);
	const handleLogin = () => {
		loginWithRedirect();
	};
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);

  };
  const handleProfileClick = (setting) => {
    // if(setting === 'Logout'){
    //   logout({ returnTo: window.location.origin })
    // }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={'Quick Search'} onClick={()=> handleCloseNavMenu('Quick Search')}>
                <Link to = '/QuickSearch' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Quick Search</Typography>
                </Link>
              </MenuItem>
              <MenuItem key={'About'} onClick={()=> handleCloseNavMenu('Vents')}>
                <Link to = '/Vents' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">About</Typography>
                </Link>
              </MenuItem>
              {isAuthenticated &&
              <MenuItem key={'Dashboard'} onClick={()=> handleCloseNavMenu('Dashboard')}>
                <Link to = '/Dashboard' style={{ textDecoration: 'none' }}>
                  <Typography textAlign="center">Dashboard</Typography>
                </Link>
              </MenuItem>
              }
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Link to = '/QuickSearch' style={{ textDecoration: 'none' }}>
            <Button
              key={'Quick Search'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Quick Search
            </Button>
          </Link>
          <Link to = '/About' style={{ textDecoration: 'none' }}>
            <Button
              key={'About'}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              About
            </Button>
          </Link>
            {/* {isAuthenticated && */}
            <Link to = '/Dashboard' style={{ textDecoration: 'none' }}>
              <Button
                key={'Dashboard'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button>
            </Link>
            {/* } */}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="My Account">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            {isAuthenticated ?
            <MenuItem key='Logout'>
              <Typography onClick={() => handleProfileClick()} textAlign="center">Logout</Typography>
            </MenuItem>
            :
            <MenuItem key='Login'>
              <Typography onClick={() => handleLogin()} textAlign="center">Login</Typography>
            </MenuItem>
            }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};