## Fully functional Integrated Development Environment(IDE)

The IDE build on the top of Monaco Editor and Judge0 compilier

Run the command to install : `npm i react-ide`

create an acccount on judge0 [https://judge0.com/]
and get a free apiKey from here :[https://rapidapi.com/judge0-official/api/judge0-ce]
as it's a free version , only 100 code can be compiled per day .

```
import {ReactIDE} from 'react-ide'

......

const apiKey =`THE_Key_From_Judge0`

<ReactIDE apiKey={apiKey}></ReactIDE>

```
