const formatData = (questionData) => {
    console.log(questionData);
  const result = questionData.map((item) => {
  const questionObject ={ question: item.question };
  const answers = [...item.incorrect_answers];
  const correctAnswerIndex = Math.floor(Math.random() * 4);
  answers.splice(correctAnswerIndex , 0 , item.correct_answer)
  questionObject.answers = answers;
  questionObject.correctAnswerIndex = correctAnswerIndex;
  //for reaching the correct answer later
  return questionObject;  
 })   
  return result;
  // at last we should get the array we made =result
}

export default formatData;