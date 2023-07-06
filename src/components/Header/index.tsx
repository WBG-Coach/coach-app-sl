import React, {useCallback, useEffect} from 'react';
import {Box, Center, HStack, Image, Text, useTheme} from 'native-base';
import {BackHandler, TouchableOpacity} from 'react-native';
import {TabletLogo} from '../../assets/images/logos';
import {isTablet} from 'react-native-device-info';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';
import Icon from '../Icon';

export type HeaderProps = {
  title?: string;
  back?: boolean;
  logo?: boolean;
  setting?: boolean;
  onBack?: () => void;
  bg?: string;
};

const Header: React.FC<HeaderProps> = ({
  bg,
  title,
  back,
  logo,
  setting,
  onBack,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
    return true;
  }, [onBack, navigate]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBack,
    );

    return () => backHandler.remove();
  }, [handleBack]);

  return (
    <HStack
      w="full"
      py="12px"
      bg={bg}
      alignItems="center"
      justifyContent="space-between"
      px={isTablet() ? '32px' : '16px'}>
      <Box w={6}>
        {back && (
          <TouchableOpacity onPress={handleBack}>
            <Center w={'48px'} h={'48px'}>
              <Icon
                size={24}
                name="angle-left"
                color={theme.colors.primary['200']}
              />
            </Center>
          </TouchableOpacity>
        )}
      </Box>
      <Box>
        {logo && <Image alt="logo" source={TabletLogo} h="40px" />}
        {title && (
          <Text
            fontSize="16px"
            fontWeight={'700'}
            fontFamily="Inter"
            color={theme.colors.primary['200']}>
            {title}
          </Text>
        )}
      </Box>
      <Box w={6}>
        {setting && (
          <TouchableOpacity onPress={() => navigate(PathRoutes.settings.main)}>
            <Icon
              size={24}
              name="setting"
              color={theme.colors.primary['200']}
            />
          </TouchableOpacity>
        )}
      </Box>
    </HStack>
  );
};

export default Header;
