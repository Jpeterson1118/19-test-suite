import { Schmea } from 'mongoose';

interface Answer {
    text: string;
    isCorrect: boolean
}

interface Question {
    _id: Schmea.Types.ObjectId
    question: string;
    answers: Answer[]
}

export type { Question }