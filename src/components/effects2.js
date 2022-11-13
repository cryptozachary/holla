import { FeedbackDelay, Reverb, StereoWidener, Distortion, BitCrusher, Phaser, Chorus } from 'tone'

export const effectParams = {
    verbDecay: 2,
    delayTime: 0.5,
    delayFeedback: 0.1,
    stereoWidth: 1,
    distort: 1,
    phaserFreq: 15,
    phaserOctaves: 5,
    phaserBaseFreq: 1000,
    chorusFreq: 4,
    chorusDelayTime: 2.5,
    chorusDepth: 0.5,
    crusherBits: 9

}

export const reverb = new Reverb(effectParams.verbDecay)
export const delay = new FeedbackDelay(effectParams.delayTime, effectParams.delayFeedback)
export const stereo = new StereoWidener(effectParams.stereoWidth)
export const distortion = new Distortion(effectParams.distort)
export const phaser = new Phaser({
    frequency: effectParams.phaserFreq,
    octaves: effectParams.phaserOctaves,
    baseFrequency: effectParams.phaserBaseFreq
})
export const chorus = new Chorus(effectParams.chorusFreq, effectParams.chorusDelayTime, effectParams.chorusDepth)
export const crusher = new BitCrusher(effectParams.crusherBits)

export const effArr = [reverb, delay, stereo, distortion, phaser, chorus, crusher]