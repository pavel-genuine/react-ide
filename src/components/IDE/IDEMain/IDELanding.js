import React, { useEffect, useState } from "react";
import axios from "axios";
import { languageOptions } from "../constansts/languagesOptions";
import useKeyPress from "../useKeyPress/useKeyPress";
import { defineTheme } from "../lib/defineTheme";
import LanguagesDropdown from "./LanguagesDropdown";
import CodeEditorWindow from "./CodeEditorwindow";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import ThemeDropdown from "./ThemeDropdown";
import OutputDetails from "./OutputDetails";

const codeDefault = `#include<stdio.h>


int main()
{
  int n,d;

  scanf("%d %d",&n,&d);

  int num[n];

  for (int i=0;i<n;i++)
    {
      scanf("%d",&num[i]);
    }

  for(int i=0;i<d;i++)
    {
      int j,temp = num[0];
      for(j=0;j<n-1;j++)
        {
          num[j] = num[j+1];
        }

      num[j] = temp;
    }
  for (int i=0;i<n;i++)
    {
      printf("%d ",num[i]);
    }
  return 0;

}
`;

const IDELanding = () => {
  const [code, setCode] = useState(codeDefault);
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(languageOptions[4]);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };


  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);
  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = (customInput) => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };

    const options = {
      method: "POST",
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        'X-RapidAPI-Key': 'e6a80cb052mshb33f1c854a489c4p188390jsn7ad1bddf2cdc',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        // get error status
        let status = err.response.status;
        console.log("status", status);
        if (status === 429) {
          console.log("too many requests", status);

        }
        setProcessing(false);
        console.log("catch block...", error);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: 'https://judge0-ce.p.rapidapi.com/submissions' + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        'X-RapidAPI-Key': 'e6a80cb052mshb33f1c854a489c4p188390jsn7ad1bddf2cdc',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);

    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);


  return (
    <div style={{ backgroundColor: '#0f172a', height: '98vh', paddingTop: '1%', paddingBottom: '1%' }}>

      <div>
        <div style={{ display: 'flex', marginBottom: '.5%' }} className="flex md:flex-row bg-slate-800 mb-2 ">
          <div style={{ marginLeft: '2%', marginRight: '3%' }} className="px-4 py-2">
            <LanguagesDropdown onSelectChange={onSelectChange} />
          </div>
          <div style={{ marginLeft: '2%', marginRight: '3%' }} className="px-4 py-2 md:block hidden">
            <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
          </div>
          <div>
            <button style={{ fontWeight: 'bold', backgroundColor: '#22c55e', margin: '0', borderRadius: '5px', height: '48px', width: '120px' }}
              onClick={() => handleCompile(customInput)}
            >
              {processing ? <p style={{ fontWeight: 'bold', backgroundColor: '#22c55e', margin: '0' }} > Processing...</p> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', backgroundColor: '#22c55e', margin: '0' }} ><svg xmlns="http://www.w3.org/2000/svg" style={{ width: '30px' }} viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg><p >Run</p></div>}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '8fr 3fr' }} className="grid grid-cols-10">
          <div className="md:col-span-7 col-span-10">
            <CodeEditorWindow
              code={code}
              onChange={onChange}
              language={language?.value}
              theme={theme.value}
            />
          </div>

          <div className="md:col-span-3 col-span-10 z-10">


            <OutputWindow outputDetails={outputDetails} />

            <div className="">
              <CustomInput
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
              <div className="p-2">
                {outputDetails && <OutputDetails outputDetails={outputDetails} />}

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
export default IDELanding;
