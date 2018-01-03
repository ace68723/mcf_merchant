
import {
  Dimensions
} from 'react-native';
const {height, width} = Dimensions.get('window');
const design = {
  width:540,
  height:960
}
const getY = (px) => {
  return px / design.height * height
}
const getX = (px) => {
  return px / design.width * width
}
export const Settings = {
  getY: getY,
  getX: getX
};

export default Settings;
