import React, { useState } from "react";

function QuestionItem({ question, handleDelete }) {
  const { id, prompt, answers, correctIndex } = question;
  const [index, setIndex] = useState(question.correctIndex);

  const options = answers.map((answer, index) => {
    return (
      <option key={index} value={index}>
        {answer}
      </option>
    );
  });
  function handlePatch(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: correctIndex }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        setIndex(resp.correctIndex);
      });
  }
  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={() => handlePatch(id)}>
          {options}
        </select>
      </label>
      <button onClick={() => handleDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
