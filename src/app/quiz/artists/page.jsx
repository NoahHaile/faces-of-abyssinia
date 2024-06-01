// pages/quiz.js
"use client";
import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Paper, LinearProgress, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import 'chart.js/auto'; // Import chart.js

const quizData = [
  {
    imageSrc: "https://i.ibb.co/64rCqd6/aster-aweke.jpg",
    options: ["Gigi", "Melat Kassahun", "Ali Birra", "Aster Aweke"],
    answer: 3,
    description: "Aster Aweke (አስቴር አወቀ) is an Ethiopian singer-songwriter. Aster's voice has attracted broader public popularity, especially tracing back in 1990s singles and her single 'Abebayehosh' in Ethiopian New Year. She is best known for her 1999 album Hagere and her 2006 album Fikir.",
    link: "https://en.wikipedia.org/wiki/Aster_Aweke"
  },
  {
    imageSrc: "https://i.ibb.co/C6CPK7H/mahmoud-ahmed.jpg",
    options: ["Mahmoud Ahmed", "Tewodros Kassahun", "Mulatu Astatke", "Ali Birra"],
    answer: 0,
    description: "Mahmoud Ahmed (ማሕሙድ አሕመድ) is an Ethiopian singer. He gained great popularity in Ethiopia in the 1970s and among the Ethiopian diaspora in the 1980s, before rising to international fame with African music fans in Europe and the Americas.",
    link: "https://en.wikipedia.org/wiki/Mahmoud_Ahmed"
  },
  {
    imageSrc: "https://i.ibb.co/KLh9y3L/teddy-afro.jpg",
    options: [ "Mahmoud Ahmed", "Teddy Afro","Tilahun Gessesse", "Mamo Bekele"],
    answer: 1,
    description: "Tewodros Kassahun Germamo (ቴዎድሮስ ካሳሁን ገርማሞ), known professionally as Teddy Afro, is an Ethiopian singer-songwriter. Known by his revolutionary songs and political dissent sentiment, Teddy is considered one of the most significant Ethiopian artists of all time. Teddy has had a huge cultural impact on the Ethiopian music industry and has been a big influence on many young artists.",
    link: "https://en.wikipedia.org/wiki/Teddy_Afro"
  },
  {
    imageSrc: "https://i.ibb.co/hswXpFD/Tilahun-Gessesse.jpg",
    options: [ "Tewodros Kassahun", "Ali Birra", "Tilahun Gessesse", "Muluqen Melesse"],
    answer: 2,
    description: "Tilahun Gessesse (ጥላሁን ገሠሠ) was an Ethiopian singer regarded as one of the most popular Ethiopian artist of the 20th century. Noted by his tenor voice, he was nicknamed 'The Voice' during his country's 'Golden Age' in the 1960s.",
    link: "https://en.wikipedia.org/wiki/Tilahun_Gessesse"
  },
  {
    imageSrc: "https://i.ibb.co/znM5SXp/Eyob-Mekonnen.jpg",
    options: ["Eyob Mekonnen", "Teddy Afro", "Mahmoud Ahmed", "Tewodros Kassahun"],
    answer: 0,
    description: "Eyob Mekonnen Yalem (እዮብ መኮንን ያለም) was an Ethiopian reggae singer widely considered as progenitor of reggae music in Ethiopia. His songs were well known for their themes of 'love, understanding, and respect'.",
    link: "https://en.wikipedia.org/wiki/Eyob_Mekonnen"
  },
  {
    imageSrc: "https://i.ibb.co/BBDJrJ6/Alemayehu-Eshete.jpg",
    options: [ "Mahmoud Ahmed", "Mulatu Astatke", "Girma Beyene","Alemayehu Eshete",],
    answer: 3,
    description: "Alemayehu Eshete Andarge (ዓለማየሁ እሸቴ አንዳርጌ) was an Ethiopian singer. He had performed since the 1960s and primarily in Amharic. He had been nicknamed 'the Ethiopian Elvis'.",
    link: "https://en.wikipedia.org/wiki/Alemayehu_Eshete"
  },
  {
    imageSrc: "https://i.ibb.co/TWKzstd/rophnan.jpg",
    options: [ "Eyob Mekonnen", "Teddy Afro", "Kassmasse", "Rophnan"],
    answer: 3,
    description: "Rophnan Nuri Muzeyin (ሮፍናን ኑሪ ሙዘይን), known mononymously as Rophnan (stylized as all caps), is an Ethiopian musician. Rophnan entered into the mainstream recognition after his debut album Reflection, which pioneered electronic music in Ethiopia.",
    link: "https://en.wikipedia.org/wiki/Rophnan"
  },
  {
    imageSrc: "https://i.ibb.co/m4tYZrZ/mulate-astatke.jpg",
    options: ["Alemayehu Eshete", "Mahmoud Ahmed", "Ali Birra", "Mulatu Astatke"],
    answer: 3,
    description: "Mulatu Astatke (ሙላቱ አስታጥቄ) is an Ethiopian musician and arranger considered as the father of 'Ethio-jazz'.",
    link: "https://en.wikipedia.org/wiki/Mulatu_Astatke"
  },
];


const grading = (percentage) => {
  if (percentage >= 90) {
    return "የቀለጠ ሀበሻ";
  } else if (percentage >= 80) {
    return "የአራዳ ልጅ";
  } else if (percentage >= 70) {
    return "ሀበሻ";
  } else if (percentage >= 45) {
    return "Borderline ፈረንጅ";
  } else {
    return "ፈረንጅ ቢሉህ ይሻላል";
  }
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [resultArray, setResultArray] = useState([]);
  const [displayResult, setDisplayResult] = useState(false);
  const router = useRouter();

  const handleClick = (index) => {
    const status = index === quizData[currentQuestion].answer ? 'correct' : 'incorrect';
    const resultEntry = {
      status,
      imgSrc: quizData[currentQuestion].imageSrc,
      name: quizData[currentQuestion].options[quizData[currentQuestion].answer],
      description: quizData[currentQuestion].description,
      link: quizData[currentQuestion].link
    };
    //@ts-ignore
    

    setSelectedOption(index);
    setFeedback(status);

    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
      setResultArray([...resultArray, resultEntry]);
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setDisplayResult(true);
      }
    }, 1000);
    
  };

  const redirect = (externalURL) => {
    window.open(externalURL, '_blank');
  }
  const correctAnswers = resultArray.filter(result => result.status === 'correct').length;
  const incorrectAnswers = resultArray.filter(result => result.status === 'incorrect').length;

  const data = {
    labels: ['Correct', 'Incorrect'],
    datasets: [
      {
        data: [correctAnswers, incorrectAnswers],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
      },
    ],
  };

  const progress = (currentQuestion / quizData.length) * 100;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(resultArray[0])
      setLoading(true);
  }, [resultArray]);

  useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 5000); // Adjust the time as needed
    }

    return () => clearTimeout(timer);
  }, [loading]);
  return (
    <Container maxWidth="sm">
      {!displayResult ? (
        <>
          <style jsx>{`
            @keyframes shake {
              0% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              50% { transform: translateX(5px); }
              75% { transform: translateX(-5px); }
              100% { transform: translateX(0); }
            }
          `}</style>
          <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <LinearProgress variant="determinate" value={progress} sx={{ width: '100%', mb: 2 }} />
            <Box width="100%" height="30vh" sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            {loading && (
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 

        >
          <CircularProgress />
        </Box>
      )}
              <Box 
        component="img" 
        src={quizData[currentQuestion].imageSrc} 
        width="auto" 
        maxWidth="100%" 
        height="100%" 
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        sx={{ 
          borderRadius: 1, 
          transition: 'transform 0.5s', 
          transform: feedback ? feedback === 'correct' ? 'scale(1.1)' : 'scale(1)' : 'scale(1)',
          animation: feedback === 'incorrect' ? 'shake 0.5s' : 'none',
          display: loading ? 'none' : 'block'
        }} 
      />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, width: '100%' }}>
              {quizData[currentQuestion].options.map((option, index) => (
                <Box
                  key={index}
                  onClick={() => handleClick(index)}
                  sx={{
                    border: 0,
                    bgcolor: 'transparent',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.8 },
                    transition: 'opacity 0.3s',
                  }}
                >
                  <Paper
                    elevation={5}
                    sx={{
                      p: 2,
                      backgroundColor: selectedOption === index
                        ? feedback === 'correct'
                          ? 'green'
                          : 'red'
                        : 'white',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    <Typography variant='body1' sx={{ color: selectedOption === index ? 'white' : 'black' }}>
                      {option}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      ) : (
        <Box mt={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', transition: 'transform 0.3s ease, box-shadow 0.3s ease'}}>
        <Typography variant="h6" sx={{ mb: 1 }}>Your Performance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>{Math.floor((correctAnswers*100)/(correctAnswers+incorrectAnswers)) }%</Typography>
        <Typography variant="h5" color="primary" align="center">{grading((correctAnswers*100)/(correctAnswers+incorrectAnswers))}</Typography>
        </Box>
      </Paper>

      <Box mt={4} sx={{ width: '100%' }}>
        {resultArray.map((result, index) => (
          <Paper 
            key={index} 
            elevation={3} 

            sx={{ 
              p: 3, 
              mb: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              },
            }}
          >
            {result.status == "correct" 
              ? <Typography variant="body1" color="success.main" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CheckCircleIcon sx={{ mr: 1 }} /></Typography>
              : <Typography variant="body1" color="error.main" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><CancelIcon sx={{ mr: 1 }} /></Typography>
            }
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={result.imgSrc}
                alt={result.name}
                sx={{ width: 'auto', height: 100, borderRadius: 1, mr: 2, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
              />
            </Box>
            <Typography variant="h6">{result.name}</Typography>
            <Typography variant="body1" align="justified">{result.description}</Typography>
            <Button variant='text' onClick={() => (redirect(result.link))}>READ MORE</Button>
            
          </Paper>
        ))}
      </Box>
    </Box>
      )}
    </Container>
  );
};

export default Quiz;
