import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    getQuestions("http://localhost:4000/questions").then((resp) =>
      setQuestions(resp)
    );
    async function getQuestions(url) {
      const promise = await fetch(url);
      const response = await promise.json();
      return response;
    }
  }, []);
  function handleAdd(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedQuestions = questions.filter(
        (question) => question.id !== id
      );
      setQuestions(updatedQuestions);
    });
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm handleAdd={handleAdd} />
      ) : (
        <QuestionList questions={questions} handleDelete={handleDelete}/>
      )}
    </main>
  );
}

export default App;
