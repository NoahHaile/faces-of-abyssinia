"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { usePathname } from "next/navigation";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import { SUBDOMAIN } from '../constants';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 4px 6px -1px ${theme.palette.grey[600]}, 0 2px 4px -1px ${theme.palette.grey[600]}`,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}));

export default function MenuAppBar() {
  const pathname = usePathname();
  const homePage = () => {
    // Define what homePage function should do, if needed
  }
  const splits = pathname.split('/');
  const titleSegment = splits[splits.length - 1];
  
  const capitalizeFirstChar = (str:string) => {
    if (str == "facesofabyssinia") return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const formattedTitleSegment = capitalizeFirstChar(titleSegment);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position="static">
        <Toolbar>
          <TitleTypography variant="h6">
            Abyssinia {formattedTitleSegment ? `| ${formattedTitleSegment}` : ""}
          </TitleTypography>
          {formattedTitleSegment && (
            <Link href={`${SUBDOMAIN}/`} passHref>
              <Button
                color="secondary"
                variant="contained"
                sx={{ marginLeft: 2 }}
                onClick={homePage}
                startIcon={<HomeIcon />}
              >
                Home
              </Button>
            </Link>
          )}
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}