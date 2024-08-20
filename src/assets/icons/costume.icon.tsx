import { Path, Svg, type SvgProps } from 'react-native-svg';

const CostumeIcon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M325.41 32.18L222.562 237.879h13.711l13.364-13.363l6.363-6.364l19.727 19.727H346l74.947-179.873c-8.11-4.986-23.97-11.715-41.314-16.445c-19.05-5.196-39.628-8.654-54.223-9.381m-139.205.021c-14.576.771-34.953 4.21-53.838 9.36c-17.344 4.73-33.204 11.46-41.314 16.445L166 237.879h36.44l38.722-77.445zm29.25 22.563l36.25 84.584l41.984-83.971c-26.948 5.752-51.079 5.561-78.234-.613M88.416 98.478l-43.691 65.54l65.88 39.529l15.24-15.24zm335.168 0l-37.43 89.829l15.24 15.24l65.881-39.53zM256 243.605l-20.42 20.42l20.42 30.63l20.42-30.63zM153 255.88v30h75.518l-16.098-24.147l5.853-5.853zm140.727 0l5.853 5.853l-16.098 24.147H359v-30zm-129.125 48l-26.045 165.24c114.22 14.268 120.666 14.268 234.886 0l-26.045-165.24h-75.916L256 327.102l-15.482-23.223z'
        fill='currentColor'
      />
    </Svg>
  );
};

export default CostumeIcon;
