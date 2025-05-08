import Quiz from "../../client/src/components/Quiz"
import { mount } from 'cypress/react'
import { mockState } from "../support/utils/helpers";


describe('<Quiz /> ', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: [mockState.questions[0]]
            });
        }).as('getRandomQuestions');
    });

    it('should prompt the user to start the quiz', () => {
        mount(<Quiz />);

        cy.get('[data-cy=start]').should('be.visible');
    });

    it('should display a loading page while fetching questions but before populating them', () => {
        mount(<Quiz />);

        cy.intercept('GET', '/api/questions/random', (req) => {
            req.reply({
                statusCode: 200,
                body: []
            })
        }).as('getEmptyQuestions');

        cy.get('[data-cy=start]').click();

        cy.get('[data-cy=loading]').should('be.visible').and('contain', 'Loading...');
    });

    it('should render the quiz when the start quiz button is pressed', () => {
        mount(<Quiz />);

        cy.get('[data-cy="start"]').click();
        cy.wait('@getRandomQuestions');

        cy.get('[data-cy=quiz]').should('be.visible');
        cy.get('[data-cy=quiz] h2').should('contain', mockState.questions[0].question,);
        cy.get('[data-cy=answers]').should('be.visible');
        cy.get('[data-cy=answer0]').children().should('have.length', 2);
        cy.get('[data-cy=answerButton0]').should('be.visible').and('contain', 1);
        cy.get('[data-cy=answerText0]').should('be.visible').and('contain', '//');
        cy.get('[data-cy=answer1]').children().should('have.length', 2);
        cy.get('[data-cy=answerButton1]').should('be.visible').and('contain', 2);
        cy.get('[data-cy=answerText1]').should('be.visible').and('contain', '/*');
        cy.get('[data-cy=answer2]').children().should('have.length', 2);
        cy.get('[data-cy=answerButton2]').should('be.visible').and('contain', 3);
        cy.get('[data-cy=answerText2]').should('be.visible').and('contain', '#');
        cy.get('[data-cy=answer3]').children().should('have.length', 2);
        cy.get('[data-cy=answerButton3]').should('be.visible').and('contain', 4);
        cy.get('[data-cy=answerText3]').should('be.visible').and('contain', '<!--');
    });


    it('should show the user score and prompt them to start a new game when the quiz is complete', () =>{
        mount(<Quiz />)

        cy.get('[data-cy=start]').click();
        cy.wait('@getRandomQuestions');

        cy.get('[data-cy=answerButton0]').click();

        cy.get('[data-cy=complete]').should('be.visible');
        cy.get('[data-cy=score]').should('be.visible').and('contain', 'Your score: 1/1');
        cy.get('[data-cy=newQuiz]').should('be.visible').and('contain', 'Take New Quiz');
    });

    it('should start a new game when Test New Quiz is clicked', () => {
        mount(<Quiz />);

        cy.get('[data-cy=start]').click();
        cy.wait('@getRandomQuestions');

        cy.get('[data-cy=answerButton0]').click();

        cy.get('[data-cy=newQuiz]').should('be.visible').click();
        cy.wait('@getRandomQuestions');

        cy.get('[data-cy=quiz]').should('be.visible');
    });
});