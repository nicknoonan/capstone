$proj_dir = "C:\github\capstone"
cd $proj_dir
code
start powershell { cd server; npm start }
start powershell { cd client; npm start }