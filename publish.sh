#first stop boonehousing pm2 process
pm2 stop boonehousinghelp
DO_PULL=y
DO_BUILD=y
DO_LOG=n
#handle any arguements passed
args_index=0
args_array=( "$@" )
for arg in "${args_array[@]}";
do
  #handle the no build arguement option
  if [ $arg = "--no-build" ]
  then
    DO_BUILD=n
  #handle the no pull arguement option
  elif [ $arg = "--no-pull" ]  
  then
    DO_PULL=n
  #elif [ $arg = "--port" ]
  #then
  #  BHH_PORT=${args_array[$((args_index + 1))]}
  elif [ $arg = "--log" ]
  then
    DO_LOG=y
  fi
args_index=$((args_index + 1))
done
#pull fresh code from git repo
if [ $DO_PULL = "y" ]
then
  git checkout production
  #make sure that the pull was successfull
  if [ $? -gt 0 ]
  then
    code=$?
    echo "***************************************************"
    echo "-----------------GIT--PULL--FAILED-----------------"
    echo "***************************************************"
    exit $code
  fi
  git pull
  #make sure that the pull was successfull
  if [ $? -gt 0 ]
  then
    code=$?
    echo "***************************************************"
    echo "-----------------GIT--PULL--FAILED-----------------"
    echo "***************************************************"
    exit $code
  fi
else
  echo "**************************************************"
  echo "------------------SKIPPING--PULL------------------"
  echo "**************************************************"
fi
#build the current source code
if [ $DO_BUILD = "y" ]
then
  cd client
  npm run build
  if [ $? -gt 0 ]
  then
    code=$?
    echo "***************************************************"
    echo "-------------------BUILD--FAILED-------------------"
    echo "***************************************************"
    exit $code
  fi
else
  echo "**************************************************"
  echo "------------------SKIPPING--BUILD-----------------"
  echo "**************************************************"
fi
#start up the pm2 process
pm2 start server/index.js -i 1 --name boonehousinghelp
#check that the pm2 process started successfully
if [ $? -eq 0 ]
then
  echo "PORT : $BHH_PORT"
  echo "DOMAIN : $BHH_DOMAIN_NAME"
  if [ $DO_LOG = "y" ]
  then
    pm2 log
  fi
else
  echo "***************************************************"
  echo "--------------------PM2--FAILED--------------------"
  echo "***************************************************"
fi