"use client"
import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { db } from '@/utils/db';
import { Interview } from '@/utils/schema';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
    const [openDailog,setOpenDailog]=useState(false)
    const [jobPosition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExperience,setJobExperience]=useState();
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const router=useRouter();
    const {user}=useUser();
    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPosition,jobDesc,jobExperience)

        const InputPrompt="Job position: "+jobPosition+", Job Description: "+jobDesc+", Years of Experience: "+jobExperience+" , Depends on Job Position, Job Description & Years of Experience give us "+process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT+" Interview questions along with Answered in Json Format, Give Question and Answered as field in JSON"

        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','');
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp)
        {
        const resp=await db.insert(Interview)
        .values({
          interviewId:uuidv4(),
          jsonResponse:MockJsonResp,
          jobPosition:jobPosition,
          jobDesc:jobDesc,
          jobExperience:jobExperience,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
        }).returning({interviewId:Interview.interviewId});

        console.log("Inserted ID:",resp)
        if(resp)
        {
          setOpenDailog(false);
          router.push('/dashboard/interview/'+resp[0]?.interviewId)
        }
      }
      else{
        console.log("ERROR");
      }
        setLoading(false);
    }
  return (
    <div>
        <div className="p-10 border rounded-lg bg-secondary
        hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={()=>setOpenDailog(true)}
        >
            <h2 className='text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className='max-w-2xl'>
            <DialogHeader>
            <DialogTitle className='text-2xl'>Tell us more about job you are interviewing</DialogTitle>
            <form onSubmit={onSubmit}>
            <DialogDescription>
                
                    Add Details about your job position/role, job description and years of experience
                <br /><br />
                <label>Job Role/Job Position</label>
                <Input placeholder='Ex. Full Stack Developer' required
                onChange={(event)=>setJobPosition(event.target.value)}
                />
                <br />
                <label>Job Description</label>
                <Textarea placeholder='Ex. React, Angular, NodeJs etc..' required
                onChange={(event)=>setJobDesc(event.target.value)}
                />
                <br />
                <label>Years of experience</label>
                <Input placeholder='Ex. 5' type='number' max='50' required
                onChange={(event)=>setJobExperience(event.target.value)}
                />
                <br />
                    <Button type='button' variant='ghost' className='my-2' onClick={()=>setOpenDailog(false)}>Cancel</Button>
                    <Button type='submit' disabled={loading} className="mx-5 my-2">
                      {loading?
                      <>
                        <LoaderCircle className='animate-spin'/>'Generating from AI'
                      </>:'Start Interview'
                    }
                      </Button>
                    
            </DialogDescription>
            </form>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview