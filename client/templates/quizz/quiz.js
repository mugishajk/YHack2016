/*
*answering will trigger theresult div to display
and the question div to hide.

Sessions needed:
-userAnswer : true(right) false(wrong);
-questionsCount : when it reaches 10 router.go results and
wallet display and resets questionCount to 0

Helpers:
Return the question

Server Method :
getRandomQuestion(){
changes asked to true
returns a question object that has an asked false

}
*/
Template.quiz.helpers({
    questions: function() {
        var quiz = [];
        var idxArray = ["0", "3", "4", "1", "8"];
        for (var x = 0; x < idxArray.length; x++) {
            var question = Questions.find({
                index: idxArray[x]
            });
            quiz.push(question);
        }

        return quiz;
    }
});
