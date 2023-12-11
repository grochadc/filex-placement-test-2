import React, { useEffect, useRef, useState } from "react";
import { gql } from "@apollo/client";
import { Loading } from "../../components/utils/components";
import { Question as QuestionType } from "../../generated/grapqhl";
import { useQuery } from "@apollo/client";
import Question from "../../components/Question";
import styled, { css } from "styled-components";
import useSection from "./useSection";

import { StyledButton } from "../../components/utils/styled";

export const SectionPageQuery = gql`
  query testSection($course: String!, $level: Int!) {
    section(course: $course, level: $level) {
      questions {
        title
        options {
          text
          correct
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const useSticky = (inputRef: any) => {
  const [stuck, setStuck] = useState(false);
  window.onscroll = () => {
    const offset = inputRef.current?.getBoundingClientRect().top;
    if (offset < 0) setStuck(true);
  };
  return stuck;
};

const Container = styled.div`
  padding: 20px;
  ${(props) =>
    //@ts-ignore
    props.stuck
      ? css`
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 1;
        `
      : null}
`;

//@ts-ignore
const Sticky: React.FC = ({ children }) => {
  const inputRef = useRef<HTMLDivElement>(null);
  const stuck = useSticky(inputRef);
  return (
    //@ts-ignore
    <Container ref={inputRef} stuck={stuck}>
      {children}
    </Container>
  );
};

const Header = styled(Sticky)``;

const ButtonsComponent = styled.div`
  display: flex;
`;

type SectionPageProps = {
  onFinishExam: () => void;
  onNextLevel: (pass: boolean) => void;
  currentLevel: number;
  course: string;
};

const SectionPage = (props: SectionPageProps) => {
  const [localState, answerQuestion, resetValues] = useSection();
  const { data, loading, error } = useQuery(SectionPageQuery, {
    variables: { course: props.course, level: props.currentLevel },
  });

  useEffect(() => {
    if (loading === false) resetValues();
  }, [data, loading]);

  if (loading) return <Loading />;
  if (error) <>{JSON.stringify(error)}</>;
  return (
    <SectionContainer>
      <Header>
        <h1>Examen FILEX - ingles/frances</h1>
        <ButtonsComponent>
          {data?.section.pageInfo.hasNextPage ? (
            <StyledButton 
            variant="secondary" onClick={props.onFinishExam}>
              Rendirse
            </StyledButton>
          ) : (
            <StyledButton
              variant={localState.answeredMin ? "primary" : "secondary"}
              onClick={props.onFinishExam}
            >
              Enviar Examen
            </StyledButton>
          )}
          {data?.section.pageInfo.hasNextPage ? (
            <>
              <StyledButton
                variant="primary"
                disabled={!localState.answeredMin}
                onClick={() => props.onNextLevel(localState.pass)}
              >
                Continuar
              </StyledButton>
              ({localState.checked.reduce((c: number, a: number) => c + a)}/6)
            </>
          ) : null}
        </ButtonsComponent>
      </Header>
      {data.section.questions.map((question: QuestionType, index: number) => {
        return (
          <Question
            key={index}
            questionObj={question}
            questionIndex={index}
            handleSelection={(correct, selectedQuestionIndex) => {
              answerQuestion(selectedQuestionIndex, correct);
            }}
          />
        );
      })}
    </SectionContainer>
  );
};

export default SectionPage;
