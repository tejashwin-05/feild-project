"use client"
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {


  const [interviewData,setInterviewData]=useState();
  const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  useEffect(()=>{
    GetInterviewDetails();
  },[]);

  const GetInterviewDetails=async()=>{
    const result=await db.select().from(Interview)
    .where(eq(Interview.interviewId,params.interviewid))
    console.log(result)

    const jsonMockResp=JSON.parse(result[0].jsonResponse)
    console.log(jsonMockResp)
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
}

  return (
    <div>
       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'> 
        {/* Questions */}
         <QuestionSection 
         mockInterviewQuestion={mockInterviewQuestion}
         activeQuestionIndex={activeQuestionIndex}
         />
        {/* Video/ Audio Recording */}
        <RecordAnswerSection
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
       </div> 
       <div className='flex justify-end gap-6'>
        {activeQuestionIndex>0&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1
        &&<Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&&
        <Link href={'/dashboard/interview/'+interviewData?.interviewId+"/feedback"}>
        <Button>End Interview</Button>
        </Link>}
       </div>
    </div>
  )
}

export default StartInterview;