import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'


//reverb decay state
// const [verbDecay, setVerbDecay] = useState(9000)

export const reverb = new Reverb(9000).toDestination()
export const delay = new FeedbackDelay(0.5, 0.9).toDestination()
export const stereo = new StereoWidener(1).toDestination()
export const distortion = new Distortion(0.5).toDestination()
export const phaser = new Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000
}).toDestination()
export const chorus = new Chorus(4, 2.5, 0.5).toDestination()
export const crusher = new BitCrusher(9).toDestination()

export const effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]