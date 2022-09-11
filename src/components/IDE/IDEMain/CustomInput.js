import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput}) => {
    const submit =true
    

    return (
        <>
           <div style={{display:'flex',borderBottom:'2px solid #334155 ',borderTop:'2px solid #334155 ',margin:'0'}} className="flex  border-slate-700 border-b-2">
               <button style={{ backgroundColor:"#1e293b", padding:'10px',border:'none', color:"#94a3b8"}} className="btn-tiny text-slate-400 py-1 px-2">
                    Custom Input
                </button>
                <p style={{backgroundColor:"#0f172a",color:"#0f172a",margin:'0'}} className="bg-slate-900 w-96">. </p>
               </div>
            <textarea
            style={{width:'99%',margin:'0',border:'none',outline:'none',borderBottom:'2px solid #334155 ', backgroundColor:"#1e293b", overflowY:'auto', color:'#e2e8f0'}}
                rows="11"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                // placeholder={`Custom input`}
                className={classnames(
                    "text-slate-200 focus:outline-none w-full border-2 border-black z-10 rounded-b  px-4 py-2 hover:shadow transition duration-200 bg-[#1e293b]"
                )}
            ></textarea>
        </>
    );
};

export default CustomInput;
