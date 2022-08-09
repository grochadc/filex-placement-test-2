import { createApolloMock } from 'apollo-typed-documents';

const operations = {};

export default createApolloMock(operations);

operations.PostResults = {};
operations.PostResults.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ codigo = undefined, nombre = undefined, apellido_paterno = undefined, apellido_materno = undefined, genero = undefined, ciclo = undefined, carrera = undefined, telefono = undefined, email = undefined, institucionalEmail = undefined, externo = undefined, reubicacion = undefined, nivel_escrito = undefined, curso = undefined }) => ({ codigo, nombre, apellido_paterno, apellido_materno, genero, ciclo, carrera, telefono, email, institucionalEmail, externo, reubicacion, nivel_escrito, curso }))(values);
  values.__typename = __typename;
  return {
    codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
    nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
    apellido_paterno: (values.apellido_paterno === null || values.apellido_paterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_paterno', __typename, scalarValues: options.scalarValues }) : values.apellido_paterno,
    apellido_materno: (values.apellido_materno === null || values.apellido_materno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellido_materno', __typename, scalarValues: options.scalarValues }) : values.apellido_materno,
    genero: (values.genero === null || values.genero === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'genero', __typename, scalarValues: options.scalarValues }) : values.genero,
    ciclo: (values.ciclo === null || values.ciclo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'ciclo', __typename, scalarValues: options.scalarValues }) : values.ciclo,
    carrera: (values.carrera === null || values.carrera === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'carrera', __typename, scalarValues: options.scalarValues }) : values.carrera,
    telefono: (values.telefono === null || values.telefono === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'telefono', __typename, scalarValues: options.scalarValues }) : values.telefono,
    email: (values.email === null || values.email === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'email', __typename, scalarValues: options.scalarValues }) : values.email,
    institucionalEmail: values.institucionalEmail,
    externo: (values.externo === null || values.externo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'externo', __typename, scalarValues: options.scalarValues }) : values.externo,
    reubicacion: (values.reubicacion === null || values.reubicacion === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'reubicacion', __typename, scalarValues: options.scalarValues }) : values.reubicacion,
    nivel_escrito: (values.nivel_escrito === null || values.nivel_escrito === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'nivel_escrito', __typename, scalarValues: options.scalarValues }) : values.nivel_escrito,
    curso: (values.curso === null || values.curso === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'curso', __typename, scalarValues: options.scalarValues }) : values.curso
  };
};
operations.PostResults.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ saveWrittenResults = null }) => ({ saveWrittenResults }))(values);
  values.__typename = __typename;
  return {
    saveWrittenResults: ((values = {}, options = {}) => {
      const __typename = 'MutationResponse';
      values = (({ id = null, meetLink = null }) => ({ id, meetLink }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        meetLink: values.meetLink,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.saveWrittenResults || undefined, options)
  };
};

operations.updateSingleLink = {};
operations.updateSingleLink.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ link = undefined }) => ({ link }))(values);
  values.__typename = __typename;
  return {
    link: (MeetLinkInputWithID)(values.link || undefined, options)
  };
};
operations.updateSingleLink.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ setMeetLink = null }) => ({ setMeetLink }))(values);
  values.__typename = __typename;
  return {
    setMeetLink: (values.setMeetLink === null || values.setMeetLink === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'setMeetLink', __typename, scalarValues: options.scalarValues }) : values.setMeetLink
  };
};

operations.removeSingleLink = {};
operations.removeSingleLink.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ link = undefined }) => ({ link }))(values);
  values.__typename = __typename;
  return {
    link: (MeetLinkInputWithID)(values.link || undefined, options)
  };
};
operations.removeSingleLink.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ removeMeetLink = null }) => ({ removeMeetLink }))(values);
  values.__typename = __typename;
  return {
    removeMeetLink: (values.removeMeetLink === null || values.removeMeetLink === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'removeMeetLink', __typename, scalarValues: options.scalarValues }) : values.removeMeetLink
  };
};

operations.getTestResults = {};
operations.getTestResults.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ filter = undefined }) => ({ filter }))(values);
  values.__typename = __typename;
  return {
    filter: values.filter
  };
};
operations.getTestResults.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ testResults = null }) => ({ testResults }))(values);
  values.__typename = __typename;
  return {
    testResults: (values.testResults || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'TestResults';
      values = (({ codigo = null, nombre = null, apellidoPaterno = null, apellidoMaterno = null, genero = null, ciclo = null, carrera = null, telefono = null, email = null, institutionalEmail = null, curso = null, externo = null, reubicacion = null, generated_id = null, meetLink = null, nivelEscrito = null, nivelOral = null, nivelFinal = null }) => ({ codigo, nombre, apellidoPaterno, apellidoMaterno, genero, ciclo, carrera, telefono, email, institutionalEmail, curso, externo, reubicacion, generated_id, meetLink, nivelEscrito, nivelOral, nivelFinal }))(values);
      values.__typename = __typename;
      return {
        codigo: (values.codigo === null || values.codigo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'codigo', __typename, scalarValues: options.scalarValues }) : values.codigo,
        nombre: (values.nombre === null || values.nombre === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'nombre', __typename, scalarValues: options.scalarValues }) : values.nombre,
        apellidoPaterno: (values.apellidoPaterno === null || values.apellidoPaterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellidoPaterno', __typename, scalarValues: options.scalarValues }) : values.apellidoPaterno,
        apellidoMaterno: (values.apellidoMaterno === null || values.apellidoMaterno === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'apellidoMaterno', __typename, scalarValues: options.scalarValues }) : values.apellidoMaterno,
        genero: (values.genero === null || values.genero === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'genero', __typename, scalarValues: options.scalarValues }) : values.genero,
        ciclo: (values.ciclo === null || values.ciclo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'ciclo', __typename, scalarValues: options.scalarValues }) : values.ciclo,
        carrera: (values.carrera === null || values.carrera === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'carrera', __typename, scalarValues: options.scalarValues }) : values.carrera,
        telefono: (values.telefono === null || values.telefono === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'telefono', __typename, scalarValues: options.scalarValues }) : values.telefono,
        email: (values.email === null || values.email === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'email', __typename, scalarValues: options.scalarValues }) : values.email,
        institutionalEmail: values.institutionalEmail,
        curso: (values.curso === null || values.curso === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'curso', __typename, scalarValues: options.scalarValues }) : values.curso,
        externo: (values.externo === null || values.externo === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'externo', __typename, scalarValues: options.scalarValues }) : values.externo,
        reubicacion: (values.reubicacion === null || values.reubicacion === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'reubicacion', __typename, scalarValues: options.scalarValues }) : values.reubicacion,
        generated_id: (values.generated_id === null || values.generated_id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'generated_id', __typename, scalarValues: options.scalarValues }) : values.generated_id,
        meetLink: (values.meetLink === null || values.meetLink === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'meetLink', __typename, scalarValues: options.scalarValues }) : values.meetLink,
        nivelEscrito: (values.nivelEscrito === null || values.nivelEscrito === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'nivelEscrito', __typename, scalarValues: options.scalarValues }) : values.nivelEscrito,
        nivelOral: values.nivelOral,
        nivelFinal: values.nivelFinal,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.GET_DEFAULT_SETTINGS = {};
operations.GET_DEFAULT_SETTINGS.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.GET_DEFAULT_SETTINGS.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ isClosed = null, meetLinks = null }) => ({ isClosed, meetLinks }))(values);
  values.__typename = __typename;
  return {
    isClosed: (values.isClosed === null || values.isClosed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isClosed', __typename, scalarValues: options.scalarValues }) : values.isClosed,
    meetLinks: (values.meetLinks || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'meetLink';
      values = (({ id = null, teacher = null, link = null, active = null }) => ({ id, teacher, link, active }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        teacher: (values.teacher === null || values.teacher === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher', __typename, scalarValues: options.scalarValues }) : values.teacher,
        link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
        active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.CLOSE_EXAM = {};
operations.CLOSE_EXAM.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.CLOSE_EXAM.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ closeExam = null }) => ({ closeExam }))(values);
  values.__typename = __typename;
  return {
    closeExam: !values.closeExam ? values.closeExam : ((values = {}, options = {}) => {
      const __typename = 'CloseExamResponse';
      values = (({ isClosed = null }) => ({ isClosed }))(values);
      values.__typename = __typename;
      return {
        isClosed: (values.isClosed === null || values.isClosed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isClosed', __typename, scalarValues: options.scalarValues }) : values.isClosed,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.closeExam, options)
  };
};

operations.testSection = {};
operations.testSection.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ course = undefined, level = undefined }) => ({ course, level }))(values);
  values.__typename = __typename;
  return {
    course: (values.course === null || values.course === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'course', __typename, scalarValues: options.scalarValues }) : values.course,
    level: (values.level === null || values.level === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Int', mappedTypeName: 'number', fieldName: 'level', __typename, scalarValues: options.scalarValues }) : values.level
  };
};
operations.testSection.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ section = null }) => ({ section }))(values);
  values.__typename = __typename;
  return {
    section: ((values = {}, options = {}) => {
      const __typename = 'Section';
      values = (({ questions = null, pageInfo = null }) => ({ questions, pageInfo }))(values);
      values.__typename = __typename;
      return {
        questions: (values.questions || []).map(item => ((values = {}, options = {}) => {
          const __typename = 'Question';
          values = (({ title = null, options = null }) => ({ title, options }))(values);
          values.__typename = __typename;
          return {
            title: (values.title === null || values.title === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'title', __typename, scalarValues: options.scalarValues }) : values.title,
            options: (values.options || []).map(item => ((values = {}, options = {}) => {
              const __typename = 'AnswerOption';
              values = (({ text = null, correct = null }) => ({ text, correct }))(values);
              values.__typename = __typename;
              return {
                text: (values.text === null || values.text === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'text', __typename, scalarValues: options.scalarValues }) : values.text,
                correct: (values.correct === null || values.correct === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'correct', __typename, scalarValues: options.scalarValues }) : values.correct,
                ...(options.addTypename ? { __typename } : {})
              };
            })(item, options)),
            ...(options.addTypename ? { __typename } : {})
          };
        })(item, options)),
        pageInfo: !values.pageInfo ? values.pageInfo : ((values = {}, options = {}) => {
          const __typename = 'PageInfo';
          values = (({ hasNextPage = null, hasPreviousPage = null }) => ({ hasNextPage, hasPreviousPage }))(values);
          values.__typename = __typename;
          return {
            hasNextPage: (values.hasNextPage === null || values.hasNextPage === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'hasNextPage', __typename, scalarValues: options.scalarValues }) : values.hasNextPage,
            hasPreviousPage: (values.hasPreviousPage === null || values.hasPreviousPage === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'hasPreviousPage', __typename, scalarValues: options.scalarValues }) : values.hasPreviousPage,
            ...(options.addTypename ? { __typename } : {})
          };
        })(values.pageInfo, options),
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.section || undefined, options)
  };
};

operations.DefaultSettings = {};
operations.DefaultSettings.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.DefaultSettings.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ placementHomePageMessage = null, isClosed = null, meetLinks = null }) => ({ placementHomePageMessage, isClosed, meetLinks }))(values);
  values.__typename = __typename;
  return {
    placementHomePageMessage: ((values = {}, options = {}) => {
      const __typename = 'HomePageMessage';
      values = (({ active = null, message = null }) => ({ active, message }))(values);
      values.__typename = __typename;
      return {
        active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
        message: (values.message === null || values.message === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'message', __typename, scalarValues: options.scalarValues }) : values.message,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.placementHomePageMessage || undefined, options),
    isClosed: (values.isClosed === null || values.isClosed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isClosed', __typename, scalarValues: options.scalarValues }) : values.isClosed,
    meetLinks: (values.meetLinks || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'meetLink';
      values = (({ id = null, teacher = null, link = null, active = null }) => ({ id, teacher, link, active }))(values);
      values.__typename = __typename;
      return {
        id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
        teacher: (values.teacher === null || values.teacher === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher', __typename, scalarValues: options.scalarValues }) : values.teacher,
        link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
        active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options))
  };
};

operations.CloseExam = {};
operations.CloseExam.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.CloseExam.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ closeExam = null }) => ({ closeExam }))(values);
  values.__typename = __typename;
  return {
    closeExam: !values.closeExam ? values.closeExam : ((values = {}, options = {}) => {
      const __typename = 'CloseExamResponse';
      values = (({ isClosed = null }) => ({ isClosed }))(values);
      values.__typename = __typename;
      return {
        isClosed: (values.isClosed === null || values.isClosed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isClosed', __typename, scalarValues: options.scalarValues }) : values.isClosed,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.closeExam, options)
  };
};

operations.UpdateHomePageMessage = {};
operations.UpdateHomePageMessage.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ input = undefined }) => ({ input }))(values);
  values.__typename = __typename;
  return {
    input: (PlacementHomePageMessageInput)(values.input || undefined, options)
  };
};
operations.UpdateHomePageMessage.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ setPlacementHomePageMessage = null }) => ({ setPlacementHomePageMessage }))(values);
  values.__typename = __typename;
  return {
    setPlacementHomePageMessage: (values.setPlacementHomePageMessage === null || values.setPlacementHomePageMessage === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'setPlacementHomePageMessage', __typename, scalarValues: options.scalarValues }) : values.setPlacementHomePageMessage
  };
};

operations.HomePage = {};
operations.HomePage.variables = (values = {}, options = {}) => {
  const __typename = '';
  values = (({  }) => ({  }))(values);
  values.__typename = __typename;
  return {

  };
};
operations.HomePage.data = (values = {}, options = {}) => {
  const __typename = '';
  values = (({ carreras = null, placementHomePageMessage = null, isClosed = null }) => ({ carreras, placementHomePageMessage, isClosed }))(values);
  values.__typename = __typename;
  return {
    carreras: (values.carreras || []).map(item => ((values = {}, options = {}) => {
      const __typename = 'Carrera';
      values = (({ name = null }) => ({ name }))(values);
      values.__typename = __typename;
      return {
        name: (values.name === null || values.name === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'name', __typename, scalarValues: options.scalarValues }) : values.name,
        ...(options.addTypename ? { __typename } : {})
      };
    })(item, options)),
    placementHomePageMessage: ((values = {}, options = {}) => {
      const __typename = 'HomePageMessage';
      values = (({ active = null, message = null }) => ({ active, message }))(values);
      values.__typename = __typename;
      return {
        active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
        message: (values.message === null || values.message === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'message', __typename, scalarValues: options.scalarValues }) : values.message,
        ...(options.addTypename ? { __typename } : {})
      };
    })(values.placementHomePageMessage || undefined, options),
    isClosed: (values.isClosed === null || values.isClosed === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'isClosed', __typename, scalarValues: options.scalarValues }) : values.isClosed
  };
};

const MeetLinkInputWithID = (values = {}, options = {}) => {
  const __typename = 'MeetLinkInputWithID';
  values = (({ active = undefined, id = undefined, link = undefined, teacher = undefined }) => ({ active, id, link, teacher }))(values);
  values.__typename = __typename;
  return {
    active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
    id: (values.id === null || values.id === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'ID', mappedTypeName: 'string', fieldName: 'id', __typename, scalarValues: options.scalarValues }) : values.id,
    link: (values.link === null || values.link === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'link', __typename, scalarValues: options.scalarValues }) : values.link,
    teacher: (values.teacher === null || values.teacher === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'teacher', __typename, scalarValues: options.scalarValues }) : values.teacher
  };
};

const PlacementHomePageMessageInput = (values = {}, options = {}) => {
  const __typename = 'PlacementHomePageMessageInput';
  values = (({ active = undefined, message = undefined }) => ({ active, message }))(values);
  values.__typename = __typename;
  return {
    active: (values.active === null || values.active === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'Boolean', mappedTypeName: 'boolean', fieldName: 'active', __typename, scalarValues: options.scalarValues }) : values.active,
    message: (values.message === null || values.message === undefined) ? options.getDefaultScalarValue({ scalarTypeName: 'String', mappedTypeName: 'string', fieldName: 'message', __typename, scalarValues: options.scalarValues }) : values.message
  };
};