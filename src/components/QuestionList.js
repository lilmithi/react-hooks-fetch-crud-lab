import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, handleDelete }) {
  // console.log("These are the questions: ", questions);
  const renderQuestions = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        handleDelete={handleDelete}
      />
    );
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{renderQuestions}</ul>
    </section>
  );
}

export default QuestionList;
