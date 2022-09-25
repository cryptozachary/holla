import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'

export const reverb = new Reverb(2)
export const delay = new FeedbackDelay(0.5, 0.9)
export const stereo = new StereoWidener(1)
export const distortion = new Distortion(0.5)
export const phaser = new Phaser({
    frequency: 15,
    octaves: 5,
    baseFrequency: 1000
})
export const chorus = new Chorus(4, 2.5, 0.5)
export const crusher = new BitCrusher(9)

export const effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]