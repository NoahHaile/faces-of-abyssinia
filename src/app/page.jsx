import { Box, Typography, Button, Container, Card, CardContent, CardMedia, Paper, Grid } from '@mui/material';
import Link from 'next/link';

const quizzes = [
  { id: 1, title: 'Ethiopian Leaders', description: 'The people of the past', link: '/leaders', imgSrc: "https://i.ibb.co/N3DLGWF/Haile-Selassie-Africa-Rebirth.jpg" },
  { id: 2, title: 'Ethiopian Artists', description: 'The artists we know and love', link: '/artists', imgSrc: "https://i.ibb.co/dMTXx1x/teddy-afro.jpg" },
  { id: 3, title: 'Ethiopian Politicians', description: 'The people in charge today', link: '/politicians', imgSrc: "https://i.ibb.co/SKDmX9r/Abiy-Ahmed.jpg" },
];


const QuizCard = ({ quiz }) => (
  
  <Paper elevation={3} sx={{ width: 300, mr: 2, borderRadius: 2, overflow: 'hidden', p: 1, display: 'flex', flexDirection: 'column' }}>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Box
      component="img"
      sx={{borderRadius: 1}}
      width="100%"
      height="auto"
      src={quiz.imgSrc}
      alt={quiz.title}
    />
    </Box>
    <Box sx={{ p: 1 }}>
      <Typography variant="h5">{quiz.title}</Typography>
      <Typography variant="subtitle2" color="text.secondary" >{quiz.description}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Link href={`/quiz/${quiz.link}`} passHref>
          <Button variant="contained" color="primary" sx={{ mt: 1 }}>Start</Button>
        </Link>
      </Box>
  </Box>
  </Paper>
  
);

const Home = () => (
  <Container maxWidth="sm">
    <Typography variant="h2" sx={{ m: 2, textAlign: 'center' }}>Know Your People</Typography>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {quizzes.map(quiz => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </Box>
  </Container>
);

export default Home;