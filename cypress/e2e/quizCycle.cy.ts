import { mockState } from "../support/utils/helpers";

describe('Tech Quiz cycle', () => {
    context('Start Page', () => {
        
        it('should render the start button', () => {
            cy.visit('/');

            cy.get('[data-cy=start]').should('be.visible');
        });
    });

    context('Take Quiz', () => {
        beforeEach(() => {
            cy.intercept('get', 'api/questions/random', {
                statusCode: 200,
                fixture: 'testQuestions'
            }).as('getRandomQuestions');

            cy.visit('/');
        });
        
        it('should render a game start button and render the first question when clicked and show loding while awaiting questions', () => {
            const stateindex = 0;
            const i = 0;
            console.log(mockState)


            cy.get('[data-cy=start]').should('be.visible').click();

            cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy=quiz').should('be.visible');
            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex].question);
            cy.get('[data-cy=answers]').should('be.visible');
            cy.get('[data-cy=answer0]').children().should('have.length', 2);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1);
            cy.get('[data-cy=answerText0]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i].text);
            cy.get('[data-cy=answer1]').children().should('have.length', 2);
            cy.get('[data-cy=answerButton1]').should('be.visible').and('contain', 2);
            cy.get('[data-cy=answerText1]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i + 1].text);
            cy.get('[data-cy=answer2]').children().should('have.length', 2);
            cy.get('[data-cy=answerButton2]').should('be.visible').and('contain', 3);
            cy.get('[data-cy=answerText2]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i + 2].text);
            cy.get('[data-cy=answer3]').children().should('have.length', 2);
            cy.get('[data-cy=answerButton3]').should('be.visible').and('contain', 4);
            cy.get('[data-cy=answerText3]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i + 3].text);
        });

        it('should render the next question after the previous is answerd', () => {
            const stateindex = 0;
            const i = 0;

            cy.get('[data-cy=start]').should('be.visible').click();


            cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy=quiz').should('be.visible');
            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex].question);
            cy.get('[data-cy=answers]').should('be.visible');
            cy.get('[data-cy=answerText0]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i].text);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz').should('be.visible');
            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 1].question)
            cy.get('[data-cy=answers]').should('be.visible');
            cy.get('[data-cy=answerText0]').should('be.visible').and('contain', mockState.questions[stateindex + 1].answers[i].text);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1);
        })

        it('should render all questions then present a final score and prompt the user to start again', () => {
            const stateindex = 0;

            cy.get('[data-cy=start').should('be.visible').click();

            cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 1].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 2].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 3].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 4].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 5].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 6].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 7].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 8].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex + 9].question);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1).click();

            cy.get('[data-cy=complete]').should('be.visible');
            cy.get('[data-cy=complete], h2').should('be.visible').and('contain', 'Quiz Completed');
            cy.get('[data-cy=score').should('be.visible').and('contain', 'Your score: 10/10');
            cy.get('[data-cy=newQuiz').should('be.visible').and('contain', 'Take New Quiz');
        });

        it('should begin a new quiz upon clicing Take New Quiz', () => {
            const stateindex = 0;
            const i = 0;

            cy.get('[data-cy=start').should('be.visible').click();

            cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);
            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=answerButton0]').click();

            cy.get('[data-cy=newQuiz').should('be.visible').and('contain', 'Take New Quiz').click()

            cy.wait('@getRandomQuestions').its('response.statusCode').should('eq', 200);

            cy.get('[data-cy=quiz').should('be.visible');
            cy.get('[data-cy=quiz] h2').should('be.visible').and('contain', mockState.questions[stateindex].question);
            cy.get('[data-cy=answers]').should('be.visible');
            cy.get('[data-cy=answerText0]').should('be.visible').and('contain', mockState.questions[stateindex].answers[i].text);
            cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1);
        })
    })
});