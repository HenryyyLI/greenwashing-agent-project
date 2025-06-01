from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from tempfile import NamedTemporaryFile
from pathlib import Path
from greenwashing_agent import GreenwashingAnalyzer
import json
from fastapi.middleware.cors import CORSMiddleware
import difflib
from docx import Document

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # ["http://localhost:3000", "http://localhost:5000"]
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
            text = "\n\n".join(page.extract_text() or "" for page in PdfReader(tmp_path).pages)
        elif file.content_type == "text/plain":
            text = contents.decode("utf-8")
        elif file.content_type in ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", ".docx"]:
            doc = Document(tmp_path)
            text = "\n\n".join(para.text for para in doc.paragraphs)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        analyzer = GreenwashingAnalyzer()
        print("Starting analysis...")
        raw_response = analyzer.analyze(text)
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

@app.post("/revise")
async def revise_text(request: Request):
    try:
        body = await request.json()
        original = body.get("original", "")
        claims = body.get("claims", [])

        if not original or not isinstance(claims, list):
            raise HTTPException(status_code=400, detail="Invalid input format")

        analyzer = GreenwashingAnalyzer()
        print("Starting revision...")
        revised_text = analyzer.revise_text(original, claims).strip('"')
        print("OpenAI Revised Text:", revised_text)
        print("Revision complete.")

        def extract_differences(original, revised):
            matcher = difflib.SequenceMatcher(None, original, revised)
            changes = []
            for opcode, a0, a1, b0, b1 in matcher.get_opcodes():
                if opcode in ("replace", "insert"):
                    changed_text = revised[b0:b1].strip()
                    if changed_text:
                        changes.append({"text": changed_text})
            return changes

        changed_parts = extract_differences(original, revised_text)

        return {
            "revised": revised_text,
            "changedParts": changed_parts
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "message": str(e)
            }
        )