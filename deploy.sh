#!/bin/bash

# 1. Build static files
pnpm run build || exit 1

# 2. Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# 3. Temprorary switch to production branch
git worktree remove temp-prod 2>/dev/null
git worktree prune
git worktree add temp-prod production

# 4. Copy project static files from /out to the temp folder /temp-prod
rm -rf temp-prod/*
cp -r out/* temp-prod/

# 5. Commit & push
cd temp-prod
git add .
git commit -m "Deploy $(date +%F_%T)" --allow-empty
git push origin production

# 6. Cleanup
cd ..
git worktree remove temp-prod
git checkout $CURRENT_BRANCH
