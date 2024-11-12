"use client"
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        if (!user?.primaryEmailAddress?.emailAddress) {
            console.error('User email not found!');
            return;
        }

        const result = await db.select()
            .from(Interview)
            .where(eq(Interview.createdBy, user.primaryEmailAddress.emailAddress)) // Fix the query here
            .orderBy(desc(Interview.id));

        console.log(result);
        setInterviewList(result);
    }

    return (
        <div>
            <h2 className='font-medium text-xl'>Previous Interviews</h2>
            {/* Render the interview list */}
            {/* <ul>
                {interviewList.length === 0 ? (
                    <li>No previous interviews found.</li>
                ) : (
                    interviewList.map((interview) => (
                        <li key={interview.id}>{interview.jobPosition}</li> // Display some field
                    ))
                )}
            </ul> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                {interviewList&&interviewList.map((interview,index)=>(
                    <InterviewItemCard
                    interview={interview}
                    key={index} />
                ))}
            </div>
        </div>
    );
}

export default InterviewList;
