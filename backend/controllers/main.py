from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from tempfile import NamedTemporaryFile
from pathlib import Path
from greenwashing_agent import GreenwashingAnalyzer
import os

app = FastAPI()

@app.get("/")
async def welcome():
    return {"message": "Welcome to the Greenwashing Detection API 👋"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        suffix = Path(file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            contents = await file.read()
            tmp.write(contents)
            tmp_path = tmp.name

        if file.content_type == "application/pdf":
            text = "\n".join(PdfReader(tmp_path).pages[i].extract_text() or "" for i in range(len(PdfReader(tmp_path).pages)))
        elif file.content_type == "text/plain":
            text = contents.decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        analyzer = GreenwashingAnalyzer()
        highlights = analyzer.analyze(text)["highlights"]

        return {
            "fileName": file.filename,
            "documentText": text,
            "highlights": highlights,
            "stats": {
                "redCount": sum(1 for h in highlights if h.get("risk") == "red"),
                "yellowCount": sum(1 for h in highlights if h.get("risk") == "yellow"),
            }
        }

    finally:
        Path(tmp_path).unlink(missing_ok=True)
