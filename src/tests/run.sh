#!/bin/bash
# Chạy toàn bộ kiểm thử trên be-hoc-toan.html (cần: node, playwright). Dùng: bash src/tests/run.sh
cd "$(dirname "$0")"; export NODE_PATH=$(npm root -g)
for t in bank layout core small-screen modes shuffle retry care map-phase bubble world-life consistency; do
  echo "== $t"; timeout 200 node $t.test.js 2>&1 | grep -E "PROBLEMS|errors|FAIL|returned after|popup:|bubble|nx disabled|overlay" 
done
