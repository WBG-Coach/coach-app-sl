import React from 'react';
import {TeacherItemType} from '../../types/teacher';
import {useNavigate} from 'react-router-native';
import HorizontalMenu from './HorizontalMenu';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../routers/paths';
import TeachersList from './TeachersList';
import {Text, VStack} from 'native-base';
import Page from '../../components/Page';
import HomeHeader from './HomeHeader';
import { useCoachContext } from '../../providers/coach.provider';

const HomeScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {selectSchool} = useCoachContext();

  const onSelectTeacher = (teacher: TeacherItemType) => {
    navigate(PathRoutes.teacher.details.replace(':id', teacher.id));
  };

  return (
    <Page setting logo back onBack={() => selectSchool(null)}>
      <HomeHeader />

      <HorizontalMenu />

      <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('home.teachers.title')}
      </Text>

      <VStack flex={1} pb={4}>
        <TeachersList onSelectTeacher={onSelectTeacher} />
      </VStack>
    </Page>
  );
};

export default HomeScreen;
