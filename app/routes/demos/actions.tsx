import type { ActionFunction, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from "react";


let likeCount = 0;
let dislikeCount = 0;


// Using the action reducer pattern:
  // submit POST forms to the same route and attach a value to the button to know what to do inside the action
export const action: ActionFunction = async ({ request }) => {
  let formData =  await request.formData();
  let formObject = Object.fromEntries(formData);

  switch (formData.get("action")){
    case "like": {
      likeCount++;
      break;
    }
    case "dislike": {
      dislikeCount++;
      break;
    }
    default: {
      throw new Error("Unknown action");
    }
  }
  return json({like: likeCount, dislike: dislikeCount});

};

export default function LikeForm({id, type}: {id: string; type: string;}){
  const actionData = useActionData();
  let likes = actionData?.like
  let dislikes = actionData?.dislike
  console.log(actionData)



  return(
    <>
        <Form method="post">
          <input type="hidden" name={type} value={id}/>{"  "}
          <button type="submit" name="action" value="like" aria-label="like">
            <ThumbUpIcon/>: {likes}
          </button>
        </Form>
  
        <Form method="post">
          <input type="hidden" name={type} value={id} />{"  "}
          <button type="submit" name="action" value="dislike" aria-label="dislike">
            <ThumbDownIcon/>: {dislikes}
          </button>
        </Form>
    </>
  )
}

