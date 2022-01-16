import React from "react";
import {motion} from "framer-motion";

interface props {
    mouthState: string
}

export default function Mouth(props: props) {

    const mouthVariants = {
        oh: {borderRadius: ["20%", "999px", "999px", "0%"], width: ["40%", "8%", "8%", "15%"], height: ["7px", "25px", "25px", "1px"], transition: {duration: 0.5, times: [0, 0.2, 0.8, 1]} },
        listen: {borderRadius: ["20%", "999px"], width: ["40%", "8%"], height: ["7px", "25px"], transition: {duration: 0.1} },
        chill: {borderRadius: ["0%", "20%"], width: ["20%", "20%"], height: ["5px", "3px"], transition: {duration: 0.1} },
        talking: {borderRadius: ["20%", "50%", "0%", "40%", "20%"], width: ["30%", "10%", "35%", "18%", "30%"], height: ["7px", "23px", "6px", "17px", "7px"], transition: { repeat: Infinity } }
    }

    console.log(props.mouthState)

    return(
        <motion.div
            className="mouth"
            variants={mouthVariants}
            animate={props.mouthState}
        />
    )
}