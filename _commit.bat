@echo off
cd /d c:\Dev\Projects\GKD_subscription
git add .
git commit -m "chore: cleanup debug scripts and add comments to blacklist entries"
git push
del "%~f0"
