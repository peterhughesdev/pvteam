#!/bin/sh

#WEBSITE_DIR=/home/jw9863/website/pvteam
WEBSITE_DIR=/Users/Peter/Dev/Projects/pvteam

#LOG_DIR=/home/jw9863/website/logs
LOG_DIR=/Users/Peter/Dev/Projects/pvteam-logs

export NODE_ENV=production
export PORT=3000

#mongod Do this in production mode

forever start -a -l $LOG_DIR/log.log -o $LOG_DIR/out.log -e $LOG_DIR/err.log --workingDir $WEBSITE_DIR $WEBSITE_DIR/keystone.js
