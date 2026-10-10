#!/usr/bin/env python3
"""Ghép src/ thành một file index.html tự đủ (chạy: python3 src/build.py)."""
import os,sys
D=os.path.dirname(os.path.abspath(__file__));OUT=os.path.normpath(os.path.join(D,".."))
CSS=["base","layout","anim","world","life","life2","fit"]
JS=["bank","bank-types","bank-gen","data","art","app","game","adventure","care-art","scenes","care","sfx","world","weather","life","life2","fit","quiz","parent","main"]
def rd(p):return open(os.path.join(D,p),encoding="utf8").read()
def build():
    t=rd("index.template.html")
    return t.replace("{{ICON}}",rd("icon.b64").strip()).replace("{{CSS}}","".join(rd("css/%s.css"%n) for n in CSS)).replace("{{JS}}","".join(rd("js/%s.js"%n) for n in JS))
if __name__=="__main__":
    s=build()
    for name in ("index.html","be-hoc-toan.html"):
        open(os.path.join(OUT,name),"w",encoding="utf8").write(s)
    print("built",len(s),"bytes -> index.html, be-hoc-toan.html")
