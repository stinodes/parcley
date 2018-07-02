// @flow
import MontserratMedium from '../../assets/fonts/Montserrat-Medium.ttf'
import MontserratSemiBold from '../../assets/fonts/Montserrat-SemiBold.ttf'
import MontserratBold from '../../assets/fonts/Montserrat-Bold.ttf'
import {Font} from 'expo'

const familyWeightMap = {
  '500': 'Montserrat Medium',
  '600': 'Montserrat SemiBold',
  '700': 'Montserrat Bold',
}

export const fontFamilyForWeight = (weight: string) => {
  return familyWeightMap[weight || '500']
}
export const loadFonts = () => Font.loadAsync({
  [familyWeightMap['500']]: require('../../assets/fonts/Montserrat-Medium.ttf'),
  [familyWeightMap['600']]: require('../../assets/fonts/Montserrat-SemiBold.ttf'),
  [familyWeightMap['700']]: require('../../assets/fonts/Montserrat-Bold.ttf'),
})
