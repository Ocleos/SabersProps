import { Slider } from 'heroui-native/slider';

type ProgressBarWrapperProps = {
  value: number;
  className?: string;
};

const ProgressBarWrapper: React.FC<ProgressBarWrapperProps> = ({ value, className }) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <Slider
      accessibilityRole='progressbar'
      accessibilityValue={{ max: 100, min: 0, now: clampedValue }}
      accessible={true}
      className={className}
      value={clampedValue}>
      <Slider.Track className='h-2'>
        <Slider.Fill />
      </Slider.Track>
    </Slider>
  );
};

export default ProgressBarWrapper;
