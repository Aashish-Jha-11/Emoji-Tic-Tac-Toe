import { useState, useCallback, useEffect } from 'react';
import { Howl } from 'howler';

export const useSoundEffects = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [sounds, setSounds] = useState({});

  useEffect(() => {
    const soundEffects = {
      place: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/933/933-preview.mp3'],
        volume: 0.5,
        html5: true
      }),
      vanish: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/650/650-preview.mp3'],
        volume: 0.4,
        html5: true
      }),
      win: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/888/888-preview.mp3'],
        volume: 0.6,
        html5: true
      }),
      select: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/270/270-preview.mp3'],
        volume: 0.5,
        html5: true
      }),
      reset: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/1111/1111-preview.mp3'],
        volume: 0.5,
        html5: true
      }),
      draw: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/958/958-preview.mp3'],
        volume: 0.5,
        html5: true
      }),
      timeout: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/1529/1529-preview.mp3'],
        volume: 0.5,
        html5: true
      }),
      powerup: new Howl({
        src: ['https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3'],
        volume: 0.5,
        html5: true
      })
    };
    
    setSounds(soundEffects);
    
    return () => {
      Object.values(soundEffects).forEach(sound => sound.unload());
    };
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const playSound = useCallback((soundName) => {
    if (!isMuted && sounds[soundName]) {
      sounds[soundName].play();
    }
  }, [isMuted, sounds]);

  return { isMuted, toggleMute, playSound };
};