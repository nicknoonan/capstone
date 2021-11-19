BHH_DOMAIN_NAME=boonehousinghelp.com
BHH_PORT=80
DO_PULL=y
DO_BUILD=y

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
  elif [ $arg = "--port" ]
  then
    BHH_PORT=${args_array[$((args_index + 1))]}
  fi
args_index=$((args_index + 1))
done


export BHH_DOMAIN_NAME
export BHH_PORT

#pull fresh code from git repo
if [ $DO_PULL = "y" ]
then
  git pull
else
  echo "**************************************************"
  echo "------------------SKIPPING--PULL------------------"
  echo "**************************************************"
fi

#make sure that the pull was successfull
if [ $? -eq 0 ]
  then
    #build the current source code
    if [ $DO_BUILD = "y" ]
    then
      cd client
      npm run build
    else
      echo "***************************************************"
      echo "------------------SKIPPING--BUILD------------------"
      echo "***************************************************"
    fi
    #check that build ran successfully
    if [ $? -eq 0 ]
      then
        #start up the pm2 process
        pm2 start boonehousinghelp
        #check that the pm2 process started successfully
        if [ $? -eq 0 ]
          then
            echo "***************************************************"
            echo "--------------------BHH--ONLINE--------------------"
            echo "***************************************************"
            echo "PORT : $BHH_PORT"
            echo "DOMAIN : $BHH_DOMAIN_NAME"
          else
            echo "***************************************************"
            echo "--------------------PM2--FAILED--------------------"
            echo "***************************************************"
        fi
      else
        echo "***************************************************"
        echo "-------------------BUILD--FAILED-------------------"
        echo "***************************************************"
    fi
  else
    echo "***************************************************"
    echo "-----------------GIT--PULL--FAILED-----------------"
    echo "***************************************************"
fi