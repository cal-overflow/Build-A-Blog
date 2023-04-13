#!/bin/bash

echo "This script will overwrite the files within the build-a-blog directory. Please backup any saved work."

# START ENV FILE INITIALIZATION

if [ -e .env ]; then
  echo ".env file already exists. Please remove that file in order to run the setup again. Script terminated."
  exit 1
fi

# Prompt user for NUXT_ENV_SITE_URL value
read -p "Enter your site's URL. ex: \"cal-overflow.dev\": " site_url

# Prompt user for NUXT_ENV_FULL_NAME value
read -p "Enter your full name that will be used on the site. ex: \"John Doe\": " full_name

# Prompt user for NUXT_ENV_SITE_NAME value
read -p "Enter your sites full name. ex: \"John Doe Website Portfolio\": " site_name

# Insert values into .env file
echo "NUXT_ENV_SITE_URL=\'$site_url\'" >> .env
echo "NUXT_ENV_FULL_NAME=\'$full_name\'" >> .env
echo "NUXT_ENV_SITE_NAME=\'$site_name\'" >> .env

echo "Values successfully added to .env file"

# START DESCRIPTION

# Prompt the user for a new site description
read -p "Enter a new site description: " NEW_DESCRIPTION

# Find the line number containing the content variable in nuxt.config.js
LINE_NUM=$(grep -n "        content: \"Enter your site description here.\"" nuxt.config.js | cut -d: -f1)

# Check if the content variable was found
if [ -z "$LINE_NUM" ]; then
  echo "Content variable missing or file was modified. Script terminated."
  exit 1
fi

# Replace the entire line containing the content variable with the new description variable
sed -i "${LINE_NUM}s/.*/        content: '$NEW_DESCRIPTION'/" nuxt.config.js

echo "Site description updated to \"$NEW_DESCRIPTION\""

#START IMPORT TEMPLATE

read -p "Do you want to import a sample template? (Y/N): " ANSWER

if [[ "$ANSWER" =~ ^[Yy]$ ]]; then
    # Download the Markdown file from the website
    git clone https://github.com/carterbrimeyer/Build-A-Blog-Sample-Template.git

    mv -f Build-A-Blog-Sample-Template/* src/content/

    # Delete the source directory
    rm -r -f Build-A-Blog-Sample-Template

    echo "Template imported successfully"
else
    echo "Skipping template import"
fi

echo "Finished Build-A-Blog setup script. Be sure to follow the instructions on the github to getting started from this point."
