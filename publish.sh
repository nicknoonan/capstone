DO_PULL=y
DO_BUILD=y
DO_LOG=n
#handle any arguements passed
args_index=0
args_array=( "$@" )
usage="./publish [options]\n\t--no-build : skip the react build procedure\n\t--no-pull : skip the git pull procedure\n\t--log : display logging information (pm2 log)\n\t--help : display this help message"
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
  elif [ $arg = "--log" ]
  then
    DO_LOG=y
  elif [ $arg = "--help" ]
  then
    echo -e $usage
    exit 0
  else
    echo -e $usage
    exit 1
  fi
  args_index=$((args_index + 1))
done

#navigate into capstone 
cd capstone
if [ $? -gt 0 ]
then
  code=$?
  echo "***************************************************"
  echo "--------------INVALID DIRECTORY SETUP--------------"
  echo "***************************************************"
  exit $code
fi
#set working dir
WORKING_DIR=$(pwd)
#kill the current boonehousing help process
pm2 stop boonehousinghelp

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
  cd $WORKING_DIR/client
  npm run build
  if [ $? -gt 0 ]
  then
    code=$?
    echo "***************************************************"
    echo "-------------------BUILD--FAILED-------------------"
    echo "***************************************************"
    exit $code
  fi
  cd $WORKING_DIR
else
  echo "**************************************************"
  echo "------------------SKIPPING--BUILD-----------------"
  echo "**************************************************"
fi
#start up the pm2 process
pm2 start $WORKING_DIR/server/index.js -i 1 --name boonehousinghelp
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

