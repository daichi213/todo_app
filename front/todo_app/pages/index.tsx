import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import Header from '../src/blog/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green, red, yellow } from '@mui/material/colors';
import { GetServerSideProps } from 'next';

// export const baseUrl : string = process.env.BASE_URL;

export const getServerSideProps : GetServerSideProps = async (context) => {
  const res = await fetch("http://192.168.210.1:8080" + "/");
  const data = await res.json();
  if (!data) {
    return {
      notFound: true,
    }
  }
  console.log(data);
  return { props: {data}};
}

type todoRes = {
  ID: number
  CreatedAt: string
  UpdatedAt: string
  DeletedAt: string | null
  title: string
  content: string
  status: number
  user_id: number
}

const headerLinks = [
  {title: 'About', url: "/about"},
  {title: "Create", url: "#"},
  {title: "Create", url: "#"},
  {title: "Create", url: "#"},
  {title: "Create", url: "#"},
  {title: "Create", url: "#"},
]

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[900],
    },
    // secondary: {
    //   main: '#bbdefb',
    // },
  },
})

export default function Index({data}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Header sections={headerLinks} title="TodoIndex"/>
          <Typography variant="h4" component="h1" gutterBottom>
            <ol>
              {data.todos.map(todo => 
                (<li>{todo.title}</li>)
              )}
            </ol>
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
