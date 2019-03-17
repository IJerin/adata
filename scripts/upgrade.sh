#!/bin/sh
# A script to upgrade a single version of React Native

VALID=1       # A version is required to be valid
PWD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
APPDIR="${PWD}/../app/"
PATCHNAME="upgrade-rn.patch"
VERSION=""
FROM=""
ERROR=""

print_help()
{
  echo "Usage: ./upgrade.sh -v|--version VERSION -f|--from FROM_VERSION"
}

while [[ $# -gt 0 ]]
do
key="$1"

case $key in
  -v|--version)
    if [[ "$VERSION" = "" ]]; then
      VERSION="$2"
    else
      VALID=0
      ERROR="Only one of each argument allowed"
    fi
    shift # Skip argument
    ;;

  -f|--from)
    if [[ "$FROM" = "" ]]; then
      FROM="$2"
    else
      VALID=0
      ERROR="Only one of each argument allowed"
    fi
    shift # Skip argument
    ;;

  *)
    VALID=0
    ERROR="Unknown argument: ${key}"
    break
    ;;

esac
shift # Skip argument/value
done

if [ "$VERSION" = "" ]; then
    VALID=0
    ERROR="A version is required"
fi

if [ "$FROM" = "" ]; then
    VALID=0
    ERROR="A from version is required"
fi

if [[ VALID -ne 1 ]]; then
    echo "Invalid Format"
    echo $ERROR
    print_help
    exit 1
fi

# Download the patch
curl "https://github.com/ncuillery/rn-diff/compare/rn-${FROM}...rn-${VERSION}.diff" > $PATCHNAME

# Replace RnDiffApp occurences
appNameCamelCase=RnDiffApp
appNameLowerCase=rndiffapp
sed -i "" "s/\/${appNameCamelCase}//g" $PATCHNAME
sed -i "" "s/\/${appNameLowerCase}//g" $PATCHNAME

# # Set up the 3-way merge
# git remote set-url rn-diff https://github.com/ncuillery/rn-diff.git
# git fetch rn-diff

# Run the apply command
# git am < "${APPDIR}/${PATCHNAME}" -p 2 --3way