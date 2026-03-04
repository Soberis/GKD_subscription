@echo off
cd /d c:\Dev\Projects\GKD_subscription
git add .
git commit -m "fix(ci): fix build_release race and npm duplicate publish"
git push
