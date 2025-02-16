import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CountdownRibbonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
`;

const CountdownDisplay = styled.div`
    font-size: 48px;
    color: #333;
    margin-bottom: 20px;
`;

const Ribbon = styled.div`
    width: 300px;
    height: 50px;
    background-color: #ff0000;
    position: relative;
    overflow: hidden;
    border-radius: 25px;
    text-align: center;
    line-height: 50px;
    color: white;
    font-size: 24px;
    margin-bottom: 20px;
    transition: transform 2s ease;
    transform: ${({ isCutting }) => (isCutting ? 'translateY(-50%)' : 'none')};
`;

const Scissors = styled.div`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: 5px solid #000;
    border-radius: 50%;
    transition: transform 2s ease;
    transform: ${({ isCutting }) => (isCutting ? 'translateX(100%)' : 'translateX(-50px)')};
`;

const CountdownRibbon = () => {
    const [countdownTime, setCountdownTime] = useState(10);
    const [isCutting, setIsCutting] = useState(false);

    useEffect(() => {
        if (countdownTime > 0) {
            const timer = setInterval(() => {
                setCountdownTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsCutting(true);
        }
    }, [countdownTime]);

    return (
        <CountdownRibbonContainer>
            <CountdownDisplay>{countdownTime > 0 ? countdownTime : "Time's up!"}</CountdownDisplay>
            <Ribbon isCutting={isCutting}>Grand Opening!</Ribbon>
            <Scissors isCutting={isCutting}></Scissors>
        </CountdownRibbonContainer>
    );
};

export default CountdownRibbon;