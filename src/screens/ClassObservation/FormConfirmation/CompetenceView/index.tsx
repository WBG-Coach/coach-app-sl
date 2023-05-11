import {HStack, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {getTags} from '../../../../components/StarsTag/common';
import StarView from '../../../../components/StarView';
import {Props} from './types';

const CompetenceView: React.FC<Props> = ({competences}) => {
  const {t} = useTranslation();
  const tags = getTags(t);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
        Class observation summary
      </Text>
      <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
        Review how you rated the class
      </Text>

      <VStack space={6} mt={6}>
        {competences.map((competency, i) => (
          <VStack
            key={i}
            borderRadius={'16px'}
            borderWidth={'1px'}
            borderColor={'gray.200'}>
            <HStack
              borderTopLeftRadius={'16px'}
              borderTopRightRadius={'16px'}
              background={'gray.200'}
              alignItems={'center'}
              py={3}
              px={4}>
              <Text
                fontSize={'TSM'}
                flex={1}
                fontWeight={400}
                color={'gray.700'}>
                Overall rating
              </Text>
              <VStack alignItems={'flex-end'} space={1}>
                <StarView maxLength={5} value={competency.overall_rating + 1} />
                <Text
                  fontSize={'LSM'}
                  flex={1}
                  fontWeight={400}
                  color={'gray.600'}>
                  {tags[competency.overall_rating]?.label}
                </Text>
              </VStack>
            </HStack>

            <VStack p={4}>
              <Text fontSize={'TMD'} fontWeight={700} color={'gray.700'}>
                {competency.title}
              </Text>

              <VStack mt={4} space={4}>
                {competency.questions.map(question => (
                  <HStack key={question.id} alignItems={'center'}>
                    <VStack flex={1} space={1} mr={2}>
                      <Text
                        fontSize={'TSM'}
                        fontWeight={400}
                        color={'gray.700'}>
                        {question.title}
                      </Text>
                      {question.description && (
                        <Text
                          fontSize={'TSM'}
                          fontWeight={400}
                          color={'gray.600'}>
                          {question.description}
                        </Text>
                      )}
                    </VStack>

                    <StarView maxLength={5} value={(question as any).value} />
                  </HStack>
                ))}
              </VStack>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </ScrollView>
  );
};

export default CompetenceView;