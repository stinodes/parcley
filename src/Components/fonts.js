// @flow
import MontserratMedium from '../../assets/fonts/Montserrat-Medium.ttf'
import MontserratSemiBold from '../../assets/fonts/Montserrat-SemiBold.ttf'
import MontserratBold from '../../assets/fonts/Montserrat-Bold.ttf'

const familyWeightMap = {
  '500': 'Montserrat Medium',
  '600': 'Montserrat SemiBold',
  '700': 'Montserrat Bold',
}

export const fontFamilyForWeight = (weight: string) => {
  return familyWeightMap[weight || '500']
}
export const fonts = {
  [familyWeightMap['500']]: MontserratMedium,
  [familyWeightMap['600']]: MontserratSemiBold,
  [familyWeightMap['700']]: MontserratBold,
}
