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
    imageSrc: "https://i.ibb.co/1n15byZ/Meles-Zenawi.jpg",
    options: ["Mesele Zefari", "Habib Shakur", "Meles Zenawi", "Mefte Zenawi"],
    answer: 2,
    description: "Meles Zenawi Asres (መለስ ዜናዊ ኣስረስ), born Legesse Zenawi Asres was an Ethiopian soldier and politician who served as president of Ethiopia from 1991 to 1995 and as prime minister from 1995 until his death in 2012.",
    link: "https://en.wikipedia.org/wiki/Meles_Zenawi"
  },
  {
    imageSrc: "https://i.ibb.co/zXJD2xq/T-wodros-II-2.jpg",
    options: ["Tewodros I", "Tewodros II", "Yohannes IV", "Yohannes VI"],
    answer: 1,
    description: "Tewodros II (ዳግማዊ ቴዎድሮስ) was Emperor of Ethiopia from 1855 until his death in 1868. His rule is often placed as the beginning of modern Ethiopia and brought an end to the decentralized Zemene Mesafint (Era of the Princes).",
    link: "https://en.wikipedia.org/wiki/Tewodros_II"
  },
  {
    imageSrc: "https://i.ibb.co/5vWM0fv/yohannes.jpg",
    options: ["Tewodros I", "Tewodros II", "Yohannes IV", "Yohannes VI"],
    answer: 2,
    description: "Yohannes IV (ዮሓንስ) was Emperor of Ethiopia from 1871 to his death in 1889 at the Battle of Gallabat, and king of Tigray from 1869 to 1871. During his reign he successfully defended Ethiopia against a large-scale Egyptian invasion.",
    link: "https://en.wikipedia.org/wiki/Yohannes_IV"
  },
  {
    imageSrc: "https://i.ibb.co/mq1S26M/Portrait-of-Menelik-II.jpg",
    options: ["Ekeke Mebtu", "Hailemariam Desalegn", "Lij Eyasu", "Menelik II"],
    answer: 3,
    description: "Menelik II (ዳግማዊ ምኒልክ), baptised as Sahle Maryam (ሣህለ ማርያም) was king of Shewa from 1866 to 1889 and Emperor of Ethiopia from 1889 to his death in 1913. At the height of his internal power and external prestige, the process of territorial expansion and creation of the modern empire-state was completed by 1898.",
    link: "https://en.wikipedia.org/wiki/Menelik_II"
  },
  {
    imageSrc: "https://i.ibb.co/dMvSy4Y/zewditu.jpg",
    options: ["Zewditu I", "Eleni Abraham", "Eleni I", "Bati Dil Wenbera Mahfuz"],
    answer: 0,
    description: "Zewditu (ዘውዲቱ) was Empress of Ethiopia from 1916 until her death in 1930. The first female head of an internationally recognized country in Africa in the 19th and 20th centuries, and the first and only empress regnant of the Ethiopian Empire, her reign was noted for the reforms of her Regent and designated heir Ras Tafari Makonnen (who succeeded her as Emperor Haile Selassie I), about which she was at best ambivalent and often stridently opposed, due to her staunch conservatism and strong religious devotion.",
    link: "https://en.wikipedia.org/wiki/Zewditu"
  },
  {
    imageSrc: "https://i.ibb.co/sqw859j/Mengistu-Haile-Mariam-3.jpg",
    options: ["Mengistu Haile Mariam", "Hailemariam Desalegn", "Tafari Makonnen", "Bati Dil Wenbera Mahfuz"],
    answer: 0,
    description: "Mengistu Haile Mariam (መንግሥቱ ኀይለ ማርያም) is an Ethiopian former politician and former army officer who was the head of state of Ethiopia from 1977 to 1991 and General Secretary of the Workers' Party of Ethiopia from 1984 to 1991. He was the chairman of the Derg, the socialist military junta that governed Ethiopia, from 1977 to 1987, and the president of the People's Democratic Republic of Ethiopia (PDRE) from 1987 to 1991.",
    link: "https://en.wikipedia.org/wiki/Mengistu_Haile_Mariam"
  },
  {
    imageSrc: "https://i.ibb.co/0YkX2JK/Haile-Selassie-in-full-dress-cropped.jpg",
    options: ["Mengistu Haile Mariam", "Hailemariam Desalegn", "Tafari Makonnen", "Bati Dil Wenbera Mahfuz"],
    answer: 2,
    description: "Haile Selassie I (ቀዳማዊ ኀይለ ሥላሴ, born Tafari Makonnen) was Emperor of Ethiopia from 1930 to 1974. He rose to power as Regent Plenipotentiary of Ethiopia (Enderase) for Empress Zewditu from 1916 until 1930. Haile Selassie is widely considered a defining figure in modern Ethiopian history, and the major figure of Rastafari, a religious movement in Jamaica that emerged shortly after he became emperor in the 1930s. Before he rose to power he defeated Ras Gugsa Welle Bitul (nephew of Empress Taytu Betul) of Begemder at the Battle of Anchem in 1928. He was a member of the Solomonic dynasty, which claims to trace its lineage to Emperor Menelik I, a legendary figure believed by the claimants to be the son of King Solomon and the Queen of Sheba, who they name as Makeda.",
    link: "https://en.wikipedia.org/wiki/Haile_Selassie"
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
      }, 3000); // Adjust the time as needed
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
