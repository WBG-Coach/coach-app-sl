const enTranslation = {
  noGeolocation: {
    title: 'Location service must be allowed',
    description:
      'We need access to your location to provide a great Coach experience',
    allowButton: 'Allow location services',
  },
  setupUserData: {
    schoolSelect: {
      title: 'Select your school',
      lineDesc: '{{count}} teachers here',
      emptyList: 'No schools found',
    },
    profileSelect: {
      title: 'Select your coach profile',
      lineDesc: 'Teachers coached: {{count}}',
      emptyList: 'No coach profiles found',
      create: {
        title: 'Create a new coach profile',
        takePhoto: 'Take/choose photo',
        name: 'First name',
        surname: 'Last name',
        emis: 'EMIS number',
        optional: 'Optional',
        button: 'Add profile',
      },
      created: {
        title: 'Profile created',
        subtitle: 'You may now select your profile and coach teachers',
        button: 'Go to coach profile selection',
      },
    },
  },
  home: {
    items: {
      newSession: 'Start a new session',
      switchSchools: 'Switch schools',
      switchProfile: 'Switch to a different coach profile',
      offlineSync: 'Offline sync',
      statics: 'Statistics',
      pendingSession: 'Feedback needed',
    },
    teachersLength_interval:
      '(0)[No teachers];(1)[1 teacher being coached];(2-inf)[{{count}} teachers being coached];',
    teachers: {
      title: 'Teachers',
      session_interval: '(1)[1 session];(2-inf)[{{count}} sessions]',
      addNew: 'Add new teacher',
    },
  },
  teacher: {
    description: '$name is a teacher at $school',
    tabs: {
      session: {
        title: 'Observation sessions',
        session: 'Observation session',
        newClassObservation: 'New class observation',
        stillNoSession: 'There are no observation sessions recorded',
        stillNoSessionDescription:
          'You may start a new class observation with this teacher',
        pendingFeedback: 'Pending observation feedback',
        haventDone:
          'You have not completed the feedback for the previous observation with this teacher',
        startFeedback: 'Start feedback now',
        selectCoach: 'Select coaching part',
        viewSummary:
          'You can view the summary of the observation or the feedback you gave to the teacher',
        feedback: {
          title: 'Feedback session summary',
          subtitle: 'Feedback provided to the teacher',
          actions:
            'These actions to improve teaching practice are agreed on between the teacher and coach',
          image: 'Image uploaded',
          imageDescription: 'Check supporting image',
        },
      },
      stats: {
        title: 'Teacher observation stats',
        editTeacher: 'Edit teacher',
        teacherAt: 'Teacher at {{school}}',
        overallRating: 'Overall rating',
        currentRating: 'The current rating is:',
        ratingAverage:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        evolution:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        comparisio: "Changes in the teacher's ratings over coaching sessions",
        lastSession: 'since last session',
        seeDetails: 'See details',
        button: 'New class observation',
        empty: {
          title: 'No data are available to show now',
          subtitle:
            'Complete class observations and feedback sessions to show statistics',
          button: 'New class observation',
        },
        scale: {
          high: 'Improved',
          low: 'Needs work',
        },
        ratingPerSession: 'Rating per session',
        teacherComparision:
          "Changes in the teacher's improvement over coaching sessions",
        sessionName: 'Session',
      },
    },
    create: {
      editTeacher: 'Edit a teacher',
      newTeacher: 'Add a new teacher',
      takePhoto: 'Take/choose photo',
      firstName: 'First name',
      lastName: 'Last name',
      emisNumber: 'EMIS number',
      principalSubject: 'Main subject',
      principalSubjectPlaceholder: 'e.g. Math',
      dateOfBirth: 'Date of birth',
      buttonSave: 'Save',
      buttonAdd: 'Add teacher',
    },
    created: {
      title: 'New teacher added',
      subtitle:
        'The teacher is now available in the list of teachers for coaching',
      startCoaching: 'Start coaching this teacher',
      selectProfile:
        'Select their profile and click on the "New class observation" button to get started',
      button: 'Finish',
    },
  },
  splash: {},
  settings: {
    settings: {
      title: 'Language',
      lastSync: 'Last sync: {{value}}',
      appVersion: 'App version',
      sync_now: 'Sync now',
      'unsynced-items': 'Unsynchronized items',
      'unsynced-teacher': 'Teachers: {{count}}',
      'unsynced-session': 'Sessions: {{count}}',
      'unsynced-feedback': 'Feedback: {{count}}',
    },
    changeLanguage: {
      title: 'Select language',
      button: 'Next',
    },
  },
  classObservation: {
    observationCompleted: {
      title: 'Class observation complete',
      subtitle: 'Thank you. The class observation section is complete!',
      whatsNext: "What's next?",
      startFeedback:
        'You can start entering your feedback to the teacher  now or you can go back to the home and do it later by selecting the teacher profile',
      button: 'Provide feedback',
      buttonBack: 'Go back to home',
    },
    formConfirmation: {
      button: 'Confirm',
      buttonEdit: 'Edit',
      competenceView: {
        title: 'Class observation summary',
        subtitle: 'Review your class observation',
        overallRating: 'Overall observation rating',
      },
    },
    create: {
      title: 'Coaching process',
      button: 'Start preparation',
      process: {
        el1: {
          title: 'Preparation',
          subtitle: '5 minutes',
          description:
            'Talk to the teacher before the class and review your notes if you already had a coach observation before.',
        },
        el2: {
          title: 'Classroom observation',
          subtitle: '30-45 minutes',
          description:
            'Sit at the back of the class to make notes and remember to put your phone in silent mode.',
        },
        el3: {
          title: 'Coaching conversation',
          subtitle: '20-30 minutes',
          description:
            'Present your observations to the teacher, pointing out the positive and areas of improvement points of their class.',
        },
        el4: {
          title: 'Next steps',
          subtitle: '5 minutes',
          description:
            'After agreeing with the teacher about priority next steps, schedule your next visit.',
        },
      },
    },
    onboarding: {
      skip: 'Skip',
      start: 'Start',
      next: 'Next',
      sections: {
        $1: {
          title: 'Inform the teacher',
          subtitle:
            'Make sure to contact the teacher and should be let them knows you are going to observe the class and have a coaching session.',
        },
        $2: {
          title: 'Note the time',
          subtitle:
            'Plan to spend 60 to 75 minutes with the teacher. Use this time to observe their class and to conduct the coaching session.',
        },
        $3: {
          title: 'Take notes',
          subtitle:
            'Notes will help you to respond to the observation questions and plan the future coaching sessions.',
        },
      },
    },
    setup: {
      title: 'About the lesson',
      subtitle: 'Ask the teacher the following questions',
      description: 'Ask the teacher the following questions',
      button: 'Next',
      questions: {
        $1: {
          title: 'How many students are in the class?',
          placeholder: 'e.g. 7',
        },
        $2: {
          title: 'What is the subject?',
          placeholder: 'Math',
        },
        $3: {
          title: 'How long will the lesson last?',
          placeholder: '30 min',
        },
        $4: {
          title: 'What are the lesson’s objectives?',
          placeholder: "Teacher's description of what is to be taught",
        },
      },
    },
    form: {
      title: 'Class Observation',
      subtitle: 'Score each teaching practice related to your observation',
      keyPoints: 'Key points to be discussed',
      pointsToDiscuss: 'What you want to discuss with the teacher?',
      spaceAdditional:
        "Use this space for additional notes of items that you'd like to discuss with the teacher",
      competenciesRated: '{{count}} of {{total}} competencies rated',
      button: 'Complete observation',
    },
  },
  feedback: {
    mentoringSection: {
      title: 'Best practices',
      subtitle:
        'Remember the good practices from your training and put them in practice.',
      bestPratices:
        'If you do not recall the best practices, refer to the Coach manual',
      continueButton: 'Continue to feedback session',
      trainingButton: 'Access Coach manual',
    },
    feedbackPreparation: {
      title: 'Choose teaching practices',
      subtitle: 'Choose 1 teaching practice to work on with the teacher',
      teachingPratice: 'Teaching practice {{count}}',
      button: 'Complete coaching session',
    },
    defineActions: {
      title: 'Agree on actions',
      subtitle:
        'Agree with the teacher which actions they will take to improve this teaching practice',
      actionsToImprove: 'Actions for improvement',
      describeActions:
        'Describe the actions you and the teacher agreed they will take to improve in regard to this teaching practice',
      textAreaPlaceholder:
        'e.g., become more aware of the way they speak with students',
      uploadImage: 'Upload an image',
      sendPicture:
        'You can also send a picture of the notes you made during the class observation and coaching session',
      uploadPhoto: 'Upload a photo',
      button: 'Complete coach session',
    },
    feedbackCompleted: {
      title: 'Coaching session complete',
      subtitle: 'Thank you! You jut completed the coaching process.',
      aboutNext: "What's next?",
      aboutNextDescription:
        "Stay prepared for Teaching Learning Circles, until then you can create new observations with a teacher by selecting them at the app's home",
      button: 'Go back to home',
    },
  },
  header: {
    settings: 'Settings',
    newsession: 'New session',
    teacher: 'Teacher',
    newTeacher: 'New teacher',
    updateTeacher: 'Update teacher',
    newClassObservation: 'New class observation',
    preparation: 'Preparation',
    classObservation: 'Class Observation',
    observationSummary: 'Observation summary',
    observationComplete: 'Observation complete',
    mentoringSession: 'Coaching session',
    feedbackPreparation: 'Prepare feedback',
    feedbackComplete: 'Coaching session complete',
    previousSession: 'Previous session',
    pendingSession: 'Pending sessions',
    teacherstats: 'Teacher stats',
  },
  components: {
    starsTag: {
      notEvaluted: 'Not evaluated',
      needsWork: 'Needs work',
      needsAttention: 'Needs attention',
      almostThere: 'Almost there',
      doingGreat: 'Doing great',
    },
  },
  quickAccess: {
    newSession: {
      title: 'Start new session',
      subtitle: 'Select a teacher and start a new observation session',
    },
    stats: {
      title: 'Check teacher stats',
      subtitle: 'Select a teacher to see their progress',
    },
  },
};

export default enTranslation;
