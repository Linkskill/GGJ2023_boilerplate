import { useState } from 'react';
import * as THREE from 'three';
import audioFile from "../../assets/sounds/music.ogg"

const BackgroundMusic = (props) => {
    let [isPlaying, setIsPlaying] = useState(false);
    const [listener] = useState(new THREE.AudioListener());
    const [audio] = useState(new THREE.Audio(listener));
    const [audioLoader] = useState(new THREE.AudioLoader());

    props.camera.add(listener);

    audioLoader.load(audioFile, function(buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.4);
    });

    const switchMusic = () => {
        if (isPlaying)
            audio.pause();
        else
            audio.play();

        setIsPlaying(!isPlaying);
    }

    return(
        <>
            <button onClick={switchMusic}>Music: {!isPlaying ? 'On' : 'Off'}</button>
        </>
    );
}

export default BackgroundMusic;
