import React from 'react';
import {HStack, Text, VStack, useTheme} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Session} from '../../../../../../types/session';
import StarsTag from '../../../../../../components/StarsTag';
import Icon from '../../../../../../components/Icon';
import moment from 'moment';

type Props = {
  index: number;
  session: Session;
  onPress: () => void;
};

const SessionItem: React.FC<Props> = ({onPress, session, index}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        py={3}
        w={'100%'}
        borderBottomWidth={'1px'}
        borderBottomColor={'gray.200'}>
        <VStack flex={1} space={2} alignItems={'flex-start'}>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {t('teacher.tabs.session.session')} {index + 1}
          </Text>
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.500'}>
            {moment(session.created_at).format('DD MMM, YYYY - HH:mm')}
          </Text>

          <StarsTag value={0} />
        </VStack>
        <HStack space={1}>
          {!session.feedback_id && (
            <Icon
              name={'exclamation-circle-solid'}
              color={theme.colors.yellow['200']}
            />
          )}

          <Icon name={'angle-right'} />
        </HStack>
      </HStack>
    </TouchableOpacity>
  );
};

export default SessionItem;