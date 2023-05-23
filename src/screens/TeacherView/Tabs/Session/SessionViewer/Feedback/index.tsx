import {isTablet as Tablet} from 'react-native-device-info';
import React, {useEffect, useState} from 'react';
import Feedback from '../../../../../../database/models/Feedback';
import {getWatermelon} from '../../../../../../database';
import {Center, HStack, Spinner, Text, useTheme, VStack} from 'native-base';
import Icon from '../../../../../../components/base/Icon';
import moment from 'moment';
import Image from '../../../../../../database/models/Image';

type Props = {
  route: {
    params: {
      feedback_id: Feedback['id'];
    };
  };
};

const FeedbackViewScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const theme = useTheme();
  const [feedback, setFeedback] = useState({
    isLoading: false,
    data: {} as Omit<Feedback, 'images'> & {images: Image[]},
  });

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const feedbackInDb = await db.collections
        .get<Feedback>('feedback')
        .find(params.feedback_id);

      setFeedback({
        isLoading: false,
        data: {
          ...(feedbackInDb._raw as any),
          competence: (await feedbackInDb.competence.fetch())._raw,
          images: (await feedbackInDb.images.fetch())?.map(
            image => image?._raw,
          ),
        } as typeof feedback.data,
      });
    })();
  }, []);

  return (
    <VStack flex={1} px={isTablet ? '64px' : 4} py={4} background={'white'}>
      {feedback.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <VStack flex={1}>
          <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
            Feedback session summary
          </Text>
          <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            Check how was the conversation with the teacher
          </Text>

          <VStack mt={6}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {feedback?.data?.competence?.title}
            </Text>
            <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
              Those are the actions you and the teacher agreed they're going to
              take to improve in this teaching practice
            </Text>

            <VStack
              p={3}
              mt={2}
              w={'100%'}
              borderColor={'gray.200'}
              borderWidth={'1px'}
              borderRadius={'8px'}>
              <Text fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
                {feedback.data.value}
              </Text>
            </VStack>
          </VStack>
          <VStack mt={6} flex={1}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              Image uploaded
            </Text>
            <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
              You can check the image you've sent of you annotations
            </Text>
            <VStack flex={1} space={2} mt={6}>
              {feedback.data?.images?.map((image, index) => (
                <HStack
                  key={index}
                  py={2}
                  px={3}
                  borderRadius={'8px'}
                  borderColor={'gray.200'}
                  alignItems={'center'}
                  borderWidth={'2px'}>
                  <Center w={'64px'} h={'64px'} background={'primary.0'}>
                    <Icon name={'image'} />
                  </Center>
                  <VStack ml={2} maxW={'50%'} overflow={'hidden'} space={0.5}>
                    <Text
                      numberOfLines={1}
                      fontSize={'LMD'}
                      fontWeight={500}
                      color={'gray.700'}>
                      {image.name}
                    </Text>
                    <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
                      {moment(
                        new Date(new Date((image as any).created_at)),
                      ).format('DD MMM, YYYY - HH:mm')}
                    </Text>

                    <HStack space={1} alignItems={'center'}>
                      <Icon
                        name={'check-circle-solid'}
                        color={theme.colors.green['200']}
                        size={16}
                      />

                      <Text
                        fontSize={'TXS'}
                        fontWeight={400}
                        color={'green.300'}>
                        Image sent
                      </Text>
                    </HStack>
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
};

export default FeedbackViewScreen;
