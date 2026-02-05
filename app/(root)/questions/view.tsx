"use client"
// This is another approach to increment views on question details page which i am not using in my project. It is here just for reference
import { incrementViews } from "@/lib/actions/question.action";
import { useEffect } from "react";
import { toast } from "sonner";

const View = ({ questionId } : {questionId: string}) => {

    const handleIncrement = async () => {
        const result = await incrementViews({questionId});

        if(result.success) {
            toast.success("Views incremented")
        }
        else {
            toast.error("Error Incrementing View")
        }
    };

    useEffect(() => {
        handleIncrement();
    }, [])

  return (
    <div>view</div>
  )
}

export default View