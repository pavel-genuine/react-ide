import React from "react";

const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        if (statusId === 6) {
            // compilation error
            return (
                <pre style={{color:'red'}} className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.compile_output)}
                </pre>
            );
        } else if (statusId === 3) {
            return (
                <pre style={{color:'#84cc16'}} className="px-2 py-1 font-normal text-xs text-green-500">
                    {atob(outputDetails.stdout) !== null
                        ? `${atob(outputDetails.stdout)}`
                        : null}
                </pre>
            );
        } else if (statusId === 5) {
            return (
                <pre style={{color:'red'}} className="px-2 py-1 font-normal text-xs text-red-500">
                    {`Time Limit Exceeded`}
                </pre>
            );
        } else {
            return (
                <pre style={{color:'red'}} className="px-2 py-1 font-normal text-xs text-red-500">
                    {atob(outputDetails?.stderr)}
                </pre>
            );
        }
    };
    return (
   

            <div style={{width:'100%',margin:'0', backgroundColor:"#1e293b", height:'56.25vh',overflowY:'auto', color:'#e2e8f0'}} className="w-full h-[55vh] bg-[#1e293b] rounded-t text-white font-normal text-sm overflow-y-auto">
               <div style={{display:'flex',borderBottom:'2px solid #334155 ',borderTop:'2px solid #334155 ',margin:'0'}} className="flex  border-slate-700 border-b-2">
               <button style={{ backgroundColor:"#1e293b", padding:'10px',border:'none', color:"#94a3b8"}} className="btn-tiny text-slate-400 py-1 px-2">
                    Console
                </button>
                <p style={{backgroundColor:"#0f172a",width:'90%',color:"#0f172a",margin:'0'}} className="bg-slate-900 w-96">. </p>
               </div>

                {outputDetails ? <div style={{paddingLeft:'5px'}}>{getOutput()}</div> : null}
            </div>

    );
};

export default OutputWindow;
