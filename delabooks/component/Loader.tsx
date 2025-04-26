import { View, ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import COLORS from '@/constant/color';

interface LoaderProps {
  size?: ActivityIndicatorProps['size'];
}

const Loader: React.FC<LoaderProps> = ({ size = 'large' }) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.background
    }}>
      <ActivityIndicator size={size} color={COLORS.primary} />
    </View>
  );
};

export default Loader;
