import { IHeadingProps, Text } from 'native-base';

interface HeaderTitleProps extends IHeadingProps {
  title: string;
}

const HeaderTitle: React.FC<HeaderTitleProps> = (props) => {
  const { title } = props;
  return (
    <Text textAlign="center" fontWeight="bold" fontSize="lg" {...props}>
      {title}
    </Text>
  );
};

export default HeaderTitle;
