from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from tempfile import NamedTemporaryFile
from pathlib import Path
from greenwashing_agent import GreenwashingAnalyzer
import json

app = FastAPI()

@app.get("/")
async def welcome():
    return {"message": "Welcome to the Greenwashing Detection API 👋"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    tmp_path = None
    try:
        suffix = Path(file.filename).suffix
        with NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            contents = await file.read()
            tmp.write(contents)
            tmp_path = tmp.name

        if file.content_type == "application/pdf":
            text = "\n".join(page.extract_text() or "" for page in PdfReader(tmp_path).pages)
        elif file.content_type == "text/plain":
            text = contents.decode("utf-8")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        analyzer = GreenwashingAnalyzer()
        print("Starting analysis...")
        raw_response = analyzer.analyze(text)
        print("Raw Text:", text)
        print("OpenAI Raw Response:", raw_response)
        print("Analysis complete.")

        if isinstance(raw_response, str):
            try:
                parsed = json.loads(raw_response)
            except json.JSONDecodeError:
                raise HTTPException(status_code=500, detail="Invalid JSON from analyzer")
        else:
            parsed = raw_response

        if isinstance(parsed, dict) and parsed.get("status") == "success":
            highlights = parsed.get("data", [])
        elif isinstance(parsed, list):
            highlights = parsed
        else:
            raise HTTPException(status_code=500, detail="Unexpected structure in OpenAI response")

        return {
            "fileName": file.filename,
            "documentText": text,
            "highlights": highlights,
            "stats": {
                "redCount": sum(1 for h in highlights if h.get("risk") == "red"),
                "yellowCount": sum(1 for h in highlights if h.get("risk") == "yellow"),
            }
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )
    finally:
        if tmp_path:
            Path(tmp_path).unlink(missing_ok=True)