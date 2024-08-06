#!/usr/bin/env sh

# abort on errors
# set -e

#update timestamp
npx gulp

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f https://github.com/johnwdolph/sample-website.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/johnwdolph/portfolio.git main:gh-pages

cd -
