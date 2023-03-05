import { IHeadingProps, Text } from 'native-base';

interface HeaderTitleProps extends IHeadingProps {
  title: string;
}

const TabTitle: React.FC<HeaderTitleProps> = (props) => {
  const { title } = props;
  return (
    <Text textAlign="center" fontSize="md" {...props}>
      {title}
    </Text>
  );
};

export default TabTitle;
