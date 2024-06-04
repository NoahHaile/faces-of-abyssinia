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
        imageSrc: "https://i.ibb.co/Cwrn3Q3/Lemma-Megersa-in-2019.jpg",
        options: ["Ekeke Mebtu", "Hailemariam Desalegn", "Lemma Megersa", "Mengistu Haile Mariam"],
        answer: 2,
        description: "Lemma Megersa (ለማ መገርሳ) is an Ethiopian politician who served as the Minister of Defense 2019 to 2020. He was also the president of the Oromia Region and deputy chairman of the ruling party in the region, the Oromo Democratic Party. Since the formation of the Prosperity Party, Lemma has been independent.",
        link: "https://en.wikipedia.org/wiki/Lemma_Megersa"
    },
    {
        imageSrc: "https://i.ibb.co/6Z29Zq0/Birhanu-Nega.png",
        options: ["Girma Wolde-Giorgis", "Dr. Berhanu Nega", "Hailemariam Desalegn", "Abadula Gemeda"],
        answer: 1,
        description: "Berhanu Nega (ብርሃኑ ነጋ) is an Ethiopian politician who is serving as the current Minister of Education of Ethiopia. He previously was the mayor elect of Addis Ababa, Ethiopia, in the 2005 Ethiopian general elections.",
        link: "https://en.wikipedia.org/wiki/Berhanu_Nega"
    },
    {
        imageSrc: "https://i.ibb.co/YPRgq9v/330px-Merera-Gudina.png",
        options: ["Dawud Ibsa", "Debretsion Gebremichael", "Dr. Merara Gudina", "Abebe Bikila"],
        answer: 2,
        description: "Merera Gudina (born 5 July 1956) is an Ethiopian professor and politician. He is the leader of the Oromo People's Congress (OPC), a political party representing the Oromo people. The organization is opposed to the previous ruling Ethiopian People's Revolutionary Democratic Front and the current authoritarian ruling Abiy Ahmed's Prosperity Party. He has been described as Ethiopian \"leading opposition politician\".",
        link: "https://en.wikipedia.org/wiki/Merera_Gudina"
    },
    {
        imageSrc: "https://i.ibb.co/ZMx59mN/Jawar-Mohammed-cropped.jpg",
        options: ["Ekeke Mebtu", "Hailemariam Desalegn", "Hailu Shawul", "Jawar Mohammed"],
        answer: 3,
        description: "Jawar Mohammed (ጃዋር መሐመድ) is an Ethiopian political analyst and activist. One of the founders of the Oromia Media Network (OMN), Jawar was a leading organizer of the 2014–2016 Oromo protests. He has been credited with toppling the incumbent government in February 2018 and bringing Abiy Ahmed to power.",
        link: "https://en.wikipedia.org/wiki/Jawar_Mohammed"
    },

    {
        imageSrc: "https://i.ibb.co/fnfcydW/Debretsion-Gebremichael-in-2014.jpg",
        options: ["Dr. Debretsion Gebremichael", "Muferiat Kamil", "Gedu Andargachew", "Tamrat Layne"],
        answer: 0,
        description: "Debretsion Gebremichael (ደብረጽዮን ገብረሚካኤል) is an Ethiopian politician serving as the chairman of Tigray People's Liberation Front (TPLF). He was previously the president of the Tigray Region. His position as titular head of the Tigray Region was disputed by the federal government of Ethiopia who in November 2020 appointed Mulu Nega as the chief executive of the Transitional Government of Tigray, succeeded by Abraham Belay.",
        link: "https://en.wikipedia.org/wiki/Debretsion_Gebremichael"
    },
    {
        imageSrc: "https://i.ibb.co/ggHF8bq/Portrait-of-Addis-Aemero-and-Ethiopian-first-female-President-Sahle-Work-Zewde-cropped.jpg",
        options: ["Victoria Mefte", "Bethelem Desta", "Sahle Work Zewde", "Bati Dil Wenbera Mahfuz"],
        answer: 2,
        description: "Sahle-Work Zewde (ሣህለ ወርቅ ዘውዴ) is an Ethiopian politician and diplomat who has served as president of Ethiopia since 2018, the first woman to hold the office. She was elected as president unanimously by members of the Federal Parliamentary Assembly on 25 October 2018.",
        link: "https://en.wikipedia.org/wiki/Sahle-Work_Zewde"
    },
    {
        imageSrc: "https://i.ibb.co/KyCGgGk/Demeke-Mekonnen-Hassen-2020-cropped.jpg",
        options: ["Demeke Mekonnen", "Hailemariam Desalegn", "Tamrat Layne", "Tedros Adhanom"],
        answer: 0,
        description: "Demeke Mekonnen Hassen (ደመቀ መኮንን ሐሰን) is an Ethiopian politician, former deputy prime minister of Ethiopia, former Minister of Foreign Affairs, and former vice-president of the Prosperity Party. He previously served as chairman of the Amhara Democratic Party (ADP) and deputy chair of the Ethiopian People's Revolutionary Democratic Front (EPRDF) until the dissolution of the two in December 2019.",
        link: "https://en.wikipedia.org/wiki/Demeke_Mekonnen"
    },
    {
        imageSrc: "https://i.ibb.co/BjKFBMT/Shimelis-Abdissa-2.jpg",
        options: ["Mulu Nega", "Shimelis Abdisa", "Gedu Andargachew", "Abadula Gemeda"],
        answer: 1,
        description: "Shimelis Abdisa (ሽመልስ አብዲሳ) is an Ethiopian politician serving as the president of the Oromia Region since 18 April 2019. He is also Chief Staff of the Prime Minister since 2018.",
        link: "https://en.wikipedia.org/wiki/Shimelis_Abdisa"
    },
    {
        imageSrc: "https://i.ibb.co/x7K5xMQ/Getachew-Reda-VOA-Tigrigna-September-2023-1.png",
        options: ["Arega Kebede", "Getachew Reda", "Tamrat Layne", "Muferiat Kamil"],
        answer: 1,
        description: "Getachew Reda Kahsay (ጌታቸው ረዳ ካሕሳይ) is an Ethiopian politician who is the Chief Administrator of the Interim Regional Administration of Tigray since the Office of the Prime Minister of Ethiopia announced his appointment on 23 March 2023. Before assuming power as chief administrator, he was a longtime advisor to the former president of the Tigray Region, Debretsion Gebremichael.",
        link: "https://en.wikipedia.org/wiki/Getachew_Reda"
    },
    {
        imageSrc: "https://i.ibb.co/0mzYy02/arega-kebede.jpg",
        options: ["Abadula Gemeda", "Tamrat Layne", "Dr. Berhanu Nega", "Arega Kebede"],
        answer: 3,
        description: "Arega Kebede (አረጋ ከበደ) is an Ethiopian politician who is serving as President of Amhara Region since 2023. On 25 August 2023, he succeeded Yilkal Kefale amidst security crisis in Amhara Region following clashes between Fano militia and ENDF in early August and six-month state of emergency. He was appointed by Amhara Regional Council in Bahir Dar.",
        link: "https://en.wikipedia.org/wiki/Arega_Kebede"
    },
    {
        imageSrc: "https://i.ibb.co/K9TKBkv/Adanech-Abebe.jpg",
        options: ["Hailemariam Desalegn", "Hailu Shawul", "Adanech Abebe", "Jawar Mohammed"],
        answer: 2,
        description: "Adanech Abebe is an Ethiopian politician and attorney who is serving as the thirty-second mayor of Addis Ababa since 2021. She has been serving as a deputy mayor from 2020 until 2021. She previously was the Minister of Revenue and Customs Authority from 2018 to 2020, when she became the first female to assume the role of the Federal Attorney General of Ethiopia. She is the first woman to hold the mayorship since it was created in 1910.",
        link: "https://en.wikipedia.org/wiki/Adanech_Abebe"
    },
];

const grading = (percentage) => {
    if (percentage >= 90) {
        return "የገባው";
    } else if (percentage >= 75) {
        return "የአራዳ ልጅ";
    } else if (percentage >= 65) {
        return "አማካይ";
    } else if (percentage >= 45) {
        return "🐑🐑🐑🐑🐑" +
            "🐑🐑🐑🐑🐑";
    } else {
        return "Bad Citizen";
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
            }, 6000); // Adjust the time as needed
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
                                <Button variant='text' sx={{fontSize: 18, pt: 2}} onClick={() => (redirect(result.link))}>READ MORE</Button>

                            </Paper>
                        ))}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Quiz;
