import React, {useEffect, useRef, useState} from 'react';
import './css/assistant-sprite.css';
import useMightyMouse from "react-hook-mighty-mouse";
import Mouth from "./components/assistant/Mouth"
import {motion} from "framer-motion"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./App.css";


function App() {
    const [displayText, setDisplayText] = useState("This is the transcript")
    const [mouthState, setMouthState] = useState("talking");
    const [faceState, setFaceState] = useState("circle");
    const { transcript, resetTranscript } = useSpeechRecognition();
    const [isListening, setIsListening] = useState(false);
    var synth = window.speechSynthesis

    const {
        selectedElement: {
            position: { angle: angleLeftEye },
        }
    } = useMightyMouse(true, "left-eye", {x: 20, y: 20});

    const {
        selectedElement: {
            position: { angle: angleRightEye },
        }
    } = useMightyMouse(true, "right-eye", {x: 20, y: 20});

    useEffect(() => {
        setDisplayText(transcript)
    }, [transcript])

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return (
            <div className="mircophone-container">
                Browser is not Support Speech Recognition.
            </div>
        );
    }

    const handleListing = () => {
        resetTranscript()
        setIsListening(true);
        // onClickMouth()
        setMouthState("listen")
        SpeechRecognition.startListening({
            continuous: true,
        });
    };

    const stopHandle = () => {
        var utterance = new SpeechSynthesisUtterance(displayText)
        utterance.onend = () => {setMouthState("chill")}
        synth.speak(utterance)
        setIsListening(false);
        SpeechRecognition.stopListening();
        setMouthState("talking")
    };

    //TODO: replace style component with more interactive framer animations - figure out how
    const styleLeftEye = {
        transform: `rotate(${angleLeftEye && -angleLeftEye-90}deg)`,
        transition: `all 0s ease`
    };

    const styleRightEye = {
        transform: `rotate(${angleRightEye && -angleRightEye-90}deg)`,
        transition: `all 0s ease`
    };

    const onClickMouth = () => {
        if(mouthState === "oh") {
            setMouthState("talking")
        }
        else {
            setMouthState("oh")
        }

    }

    const faceVariants = {
        circle: {scale: [1, 2, 2, 1, 1],
            rotate: [0, 180, 360, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%"], transition: {duration: 2}},
        square: {scale: [1, 2, 2, 1, 1],
            rotate: [0, 180, 360, 270, 0],
            borderRadius: ["50%", "50%", "20%", "20%",], transition: {duration: 2}}
    }

    const onClickFace = () => {
        if(faceState === "circle"){
            setFaceState("square")
        }
        else {
            setFaceState("circle")
        }
    }

    return (
        <div className="container">
            <button onClick={onClickFace} >change face shape</button>
            <motion.div
                className="face"
                variants={faceVariants}
                animate={faceState}
            >
                <div className="eyes">
                    <div className="eyelid" />
                    <div id="left-eye" className="eye" style={styleLeftEye}>
                        <div className="pupil" />
                    </div>
                    <div id="right-eye" className="eye" style={styleRightEye}>
                        <div className="pupil" />
                    </div>
                </div>
                <div onClick={onClickMouth}>
                    <Mouth mouthState={mouthState}/>
                </div>
            </motion.div>
            <div>
                <div onClick={() => {
                    isListening ? stopHandle() : handleListing()
                }}>
                    {isListening ? "stop listening" : "listen to me!"}
                </div>
                {displayText}
            </div>
        </div>
    );
}

export default App;
