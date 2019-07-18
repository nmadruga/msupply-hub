#!/bin/bash
CONTAINER_NAME=mSupplyHub
PG_VERSION=latest
ON_PORT=5433
DATABASE=mSupplyHub
PASSWORD=pass
HOST_DB_DIR=$HOME/Documents/mSupply/mSupplyHub_POSTGRES

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/initsqldb"

USAGE="\nUSAGE: use -r 'full path directory' to reload db from current path $SCRIPT_DIR/<sqlscripts>.sql \n\n"

case $1 in
	-r)      # This help message
    printf "\nThis will run the sql @ \
    $SCRIPT_DIR/<sqlscripts>.sql\n continue [y] ?? :"
    read option
    if [ $option = "y" ]
    then
      printf "WILL RELOAD DB\n\n"
      rm -rf $HOST_DB_DIR
      INIT_DB_OPT="-v $SCRIPT_DIR:/docker-entrypoint-initdb.d"
    else
      echo "CANCELED"
      printf "$USAGE"
      exit 1
    fi
    ;;
	   -h)
    printf "$USAGE"
    exit 1
    ;;
	*)
  ;;
esac;

echo "Docker stopping and removing $CONTAINER_NAME"

docker stop $CONTAINER_NAME
docker rm $CONTAINER_NAME

docker run --rm -d --name $CONTAINER_NAME \
            -p $ON_PORT:5432 \
            -v $HOST_DB_DIR:/var/lib/mysql \
            -e POSTGRES_DB=$DATABASE \
            -e POSTGRES_PASSWORD=$PASSWORD \
            $INIT_DB_OPT \
            postgres:$PG_VERSION

docker logs -f $CONTAINER_NAME
