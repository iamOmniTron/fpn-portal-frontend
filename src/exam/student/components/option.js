
import {Form} from "react-bootstrap";

const OPTIONS = ["a","b","c","d"];

export default function QuestionOption({qid,opt,idx,answerQuestion,updateAnswer,responseId,option,setOption}){
    return(
    <div className="row g-2">
        <div className="col-12 col-md-6 d-flex gap-1">
            {OPTIONS[idx]}.
            <Form.Check type="radio" value="2" name="answer" onClick={(e)=>{
                console.log(responseId)
                if(option.length < 1 || responseId.length < 1){
                    answerQuestion(qid,opt.id);
                    setOption(opt.id)
                    return;
                }
                updateAnswer();
            }}/>
            {opt.text}
        </div>
    </div>
    )
}
