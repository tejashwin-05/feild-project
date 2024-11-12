
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const Interview=pgTable('interview',{
    id:serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    interviewId:varchar('interviewId').notNull()
});

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    interviewIdRef:varchar('interviewId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})