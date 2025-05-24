import sys
import os
import json
from openai import OpenAI
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class GreenwashingAnalyzer:
    def __init__(self):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.assistant_id = os.getenv("OPENAI_ASSISTANT_ID")

    def analyze(self, text):
        strict_format_instruction = r"""
        EXACTLY OUTPUT JSON ARRAY FOLLOWING THIS STRUCTURE:
        [{
            "text": "exact claim text",
            "page": number,
            "risk": "red|yellow|blue",
            "reason": "clear rationale",
            "evidence": "required proof"
        }]
        
        GREENWASHING DETECTION GUIDELINES:
        1. RED FLAGS (High Risk):
           - Absolute claims ("100% green", "zero impact")
           - Vague sustainability language without proof
           - Nature imagery with no substantive policies
           - Misleading comparisons or cherry-picked data
           - Hidden trade-offs (highlighting one green aspect while ignoring larger impacts)
        
        2. YELLOW FLAGS (Medium Risk):
           - Ambiguous terms ("eco-friendly", "natural")
           - Unverified future commitments ("will be net-zero by 2050")
           - Minor green initiatives overshadowing core unsustainable practices
           - Lack of measurable targets
        
        3. BLUE FLAGS (Low Risk/Valid Claims):
           - Specific, verifiable data with sources
           - Certified eco-labels (FSC, Energy Star, etc.)
           - Transparent supply chain information
           - Balanced reporting including challenges
        
        ANALYSIS PRINCIPLES:
        - Verify if claims are supported by concrete evidence
        - Check for proportionality (small green effort vs major environmental impact)
        - Identify misleading visual elements if described in text
        - Assess whether claims distract from larger environmental harms
        - Cross-check for industry standards compliance
        
        RULES:
        1. NO ADDITIONAL METADATA
        2. NO STATISTICS IN OUTPUT (only in evidence evaluation)
        3. STRICT STRUCTURE ADHERENCE
        4. PAGE NUMBER MUST BE INCLUDED (use 1 if single document)
        5. RISK ASSESSMENT MUST BE CONSERVATIVE (when in doubt, flag higher)
        """

        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": strict_format_instruction},
                {"role": "user", "content": text}
            ],
            temperature=0.2
        )

        raw_response = response.choices[0].message.content
        # print("OpenAI Raw Response:", raw_response)

        try:
            result = json.loads(raw_response)
            return {"status": "success", "data": result}
        except Exception as e:
            print("Error parsing OpenAI response:", e)
            raise ValueError(f"API response was not valid JSON: {repr(raw_response)}")

    def revise_text(self, original_text, flagged_claims):
        revision_prompt = f"""
            You are a sustainability communication editor. The following content contains greenwashing issues:

            Original Text:
            \"\"\"{original_text}\"\"\"

            Flagged Issues: {json.dumps(flagged_claims, indent=2)}

            TASK:
            Revise the original text to address the greenwashing concerns:
            - Rewrite or remove problematic claims
            - Maintain the general intent and clarity of the original text
            - Ensure all claims are evidence-based or clearly qualified

            ONLY return the revised version of the full text. Do not add any explanations or annotations.
        """

        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": "You are an expert in sustainable communication and green marketing."},
                {"role": "user", "content": revision_prompt}
            ],
            temperature=0.2
        )

        raw_response = response.choices[0].message.content.strip()
        # print("OpenAI Raw Response:", raw_response)
        return raw_response

# TEST CODE
def main():
    try:
        input_text = sys.argv[1] if len(sys.argv) > 1 else ""
        if not input_text:
            raise ValueError("No input text provided")

        analyzer = GreenwashingAnalyzer()
        # sample_document = r"""
        #     Our company is 100% sustainable and has zero environmental footprint. 
        #     We use eco-friendly packaging (made with 10% recycled materials) and 
        #     will be carbon neutral by 2040. Our products are green and natural.
        # """
        # print(json.dumps(analyzer.analyze(sample_document), indent=2))
        result = analyzer.analyze(input_text)

        print(json.dumps({
            "status": "success",
            "data": result
        }))

    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": str(e)
        }))
        sys.exit(1)

if __name__ == "__main__":
    main()